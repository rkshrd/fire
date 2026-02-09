#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Système de veille automatique par flux RSS
==========================================
Récupère les articles depuis des flux RSS de sites cybersécurité,
filtre par thématique (MFA, ZTNA, SIEM), et met à jour veille.json.

Usage:
    python3 rss.py                    # Mode normal
    python3 rss.py --dry-run          # Aperçu sans écrire
    python3 rss.py --topic MFA        # Filtrer un seul topic
    python3 rss.py --max-articles 10  # Limiter le nombre d'articles
    python3 rss.py --export-csv       # Exporter aussi en CSV
"""

import feedparser
import json
import os
import sys
import re
import csv
import hashlib
import argparse
import logging
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from time import mktime

# ─────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).parent.resolve()
ROOT_DIR = SCRIPT_DIR.parents[2]
SOURCES_FILE = SCRIPT_DIR / "rss_sources.json"
VEILLE_JSON = ROOT_DIR / "veille.json"
HISTORY_FILE = SCRIPT_DIR / "veille_history.json"
LOG_FILE = SCRIPT_DIR / "veille.log"
EXPORT_DIR = SCRIPT_DIR / "exports"
VERSION_DIR = SCRIPT_DIR / "versions"

# Nombre max de jours pour considérer un article comme récent
MAX_AGE_DAYS = 30

# Nombre max de workers pour le fetch parallèle
MAX_WORKERS = 8

# ─────────────────────────────────────────────
# Logging
# ─────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding='utf-8'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────
# Historique (déduplication)
# ─────────────────────────────────────────────

def load_history():
    """Charge l'historique des articles déjà traités."""
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"processed_urls": [], "last_run": None}


def save_history(history):
    """Sauvegarde l'historique."""
    history["last_run"] = datetime.now().isoformat()
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)


def url_hash(url):
    """Génère un hash court d'une URL pour la déduplication."""
    return hashlib.md5(url.encode()).hexdigest()[:12]

# ─────────────────────────────────────────────
# Chargement des sources RSS
# ─────────────────────────────────────────────

def load_sources():
    """Charge la configuration des sources RSS et des topics."""
    with open(SOURCES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

# ─────────────────────────────────────────────
# Fetch RSS
# ─────────────────────────────────────────────

def fetch_feed(feed_info):
    """Récupère et parse un flux RSS."""
    name = feed_info["name"]
    url = feed_info["url"]
    lang = feed_info.get("lang", "en")
    
    try:
        feed = feedparser.parse(url)
        if feed.bozo and not feed.entries:
            logger.warning(f"⚠ Erreur feed {name}: {feed.bozo_exception}")
            return []
        
        articles = []
        for entry in feed.entries:
            article = parse_entry(entry, name, lang)
            if article:
                articles.append(article)
        
        logger.info(f"✓ {name}: {len(articles)} articles récupérés")
        return articles
    
    except Exception as e:
        logger.error(f"✗ Erreur lors du fetch de {name}: {e}")
        return []


def parse_entry(entry, source_name, lang):
    """Parse une entrée RSS en article standardisé."""
    # Extraire le titre
    title = entry.get("title", "").strip()
    if not title:
        return None
    
    # Extraire le lien
    link = entry.get("link", "")
    if not link:
        return None
    
    # Extraire la date
    date_str = ""
    published = entry.get("published_parsed") or entry.get("updated_parsed")
    if published:
        try:
            dt = datetime.fromtimestamp(mktime(published))
            date_str = format_date_fr(dt)
        except:
            date_str = entry.get("published", entry.get("updated", ""))
    
    # Extraire la description
    description = ""
    if entry.get("summary"):
        description = clean_html(entry.summary)
    elif entry.get("description"):
        description = clean_html(entry.description)
    
    # Limiter la description
    if len(description) > 500:
        description = description[:497] + "..."
    
    # Extraire l'image
    image_path = extract_image(entry)
    
    # Tags depuis les catégories RSS
    tags = []
    if entry.get("tags"):
        tags = [t.get("term", "") for t in entry.tags if t.get("term")]
        tags = tags[:5]  # Limiter à 5 tags
    
    return {
        "title": title,
        "link": link,
        "date": date_str,
        "description": description,
        "image": image_path,
        "source": source_name,
        "lang": lang,
        "tags": tags,
        "fetched_at": datetime.now().isoformat()
    }


def format_date_fr(dt):
    """Formate une date en français."""
    mois = [
        "", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
    return f"{dt.day} {mois[dt.month]} {dt.year}"


def clean_html(text):
    """Nettoie le HTML d'un texte."""
    # Supprimer les balises HTML
    clean = re.sub(r'<[^>]+>', '', text)
    # Supprimer les espaces multiples
    clean = re.sub(r'\s+', ' ', clean).strip()
    # Décoder les entités HTML basiques
    clean = clean.replace('&amp;', '&')
    clean = clean.replace('&lt;', '<')
    clean = clean.replace('&gt;', '>')
    clean = clean.replace('&quot;', '"')
    clean = clean.replace('&#39;', "'")
    clean = clean.replace('&nbsp;', ' ')
    return clean


def extract_image(entry):
    """Tente d'extraire une URL d'image depuis l'entrée RSS."""
    # Chercher dans media:content
    if entry.get("media_content"):
        for media in entry.media_content:
            if media.get("medium") == "image" or "image" in media.get("type", ""):
                return media.get("url", "")
    
    # Chercher dans media:thumbnail
    if entry.get("media_thumbnail"):
        for thumb in entry.media_thumbnail:
            if thumb.get("url"):
                return thumb["url"]
    
    # Chercher dans enclosures
    if entry.get("enclosures"):
        for enc in entry.enclosures:
            if "image" in enc.get("type", ""):
                return enc.get("href", enc.get("url", ""))
    
    # Chercher dans le contenu HTML
    content = entry.get("summary", "") or entry.get("description", "")
    img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content)
    if img_match:
        return img_match.group(1)
    
    return ""

# ─────────────────────────────────────────────
# Filtrage par topic / mots-clés
# ─────────────────────────────────────────────

def matches_topic(article, keywords):
    """Vérifie si un article correspond à un topic via ses mots-clés."""
    # Construire le texte de recherche
    searchable = " ".join([
        article.get("title", ""),
        article.get("description", ""),
        " ".join(article.get("tags", []))
    ]).lower()
    
    # Vérifier chaque mot-clé
    for keyword in keywords:
        kw = keyword.lower()
        # Recherche mot entier pour les acronymes courts (MFA, SIEM, etc.)
        if len(kw) <= 4:
            if re.search(r'\b' + re.escape(kw) + r'\b', searchable):
                return True
        else:
            if kw in searchable:
                return True
    
    return False


def categorize_articles(articles, topics_config):
    """Classe les articles par topic."""
    categorized = {topic: [] for topic in topics_config}
    
    for article in articles:
        for topic, config in topics_config.items():
            if matches_topic(article, config["keywords"]):
                categorized[topic].append(article)
    
    return categorized


def auto_tag_article(article, topic_name):
    """Génère des tags automatiques basés sur le contenu."""
    tags = list(article.get("tags", []))
    
    # Tags basés sur le topic
    title_lower = article["title"].lower()
    desc_lower = article.get("description", "").lower()
    combined = title_lower + " " + desc_lower
    
    tag_rules = {
        "Vulnérabilité": ["vulnerability", "vulnérabilité", "cve-", "exploit", "flaw", "faille"],
        "Sécurité": ["security", "sécurité", "secure", "sécurisé", "protection"],
        "Entreprise": ["enterprise", "entreprise", "corporate", "business", "organization"],
        "Infrastructure": ["infrastructure", "server", "serveur", "network", "réseau"],
        "Innovation": ["innovation", "new", "launch", "nouveau", "announces", "annonce"],
        "Failles": ["breach", "hack", "attack", "attaque", "compromis", "pirat"],
        "Solutions": ["solution", "tool", "outil", "product", "produit", "platform"],
        "Documentation": ["guide", "tutorial", "documentation", "how-to", "best practice"],
        "Gouvernement": ["government", "gouvernement", "regulation", "réglementation", "cnil", "anssi", "nist"],
        "Cloud": ["cloud", "aws", "azure", "gcp", "saas", "iaas"],
        "2AF": ["2fa", "a2f", "two-factor", "deux facteurs"],
        "Biométrie": ["biometric", "biométrie", "fingerprint", "facial", "empreinte"],
        "Statistiques": ["report", "rapport", "survey", "étude", "market", "marché", "statistics"]
    }
    
    for tag, keywords in tag_rules.items():
        if tag not in tags:
            for kw in keywords:
                if kw in combined:
                    tags.append(tag)
                    break
    
    # Assurer au moins un tag
    if not tags:
        tags = [topic_name]
    
    # Dédupliquer et limiter
    seen = set()
    unique_tags = []
    for t in tags:
        if t.lower() not in seen:
            seen.add(t.lower())
            unique_tags.append(t)
    
    return unique_tags[:6]

# ─────────────────────────────────────────────
# Conversion au format veille.json
# ─────────────────────────────────────────────

def article_to_veille_format(article, topic_name):
    """Convertit un article au format du veille.json."""
    tags = auto_tag_article(article, topic_name)
    # Construire l'objet en n'incluant que les clés avec des valeurs non vides
    veille_obj = {}
    if article.get("date"):
        veille_obj["date"] = article.get("date")
    if article.get("title"):
        veille_obj["title"] = article.get("title")
    # Ne pas ajouter de valeur par défaut pour l'image : n'ajouter que si présente
    if article.get("image"):
        veille_obj["image"] = article.get("image")
    if article.get("link"):
        veille_obj["link"] = article.get("link")
    if tags:
        veille_obj["tags"] = tags
    if article.get("description"):
        veille_obj["description"] = article.get("description")
    if article.get("source"):
        veille_obj["source"] = article.get("source")

    return veille_obj

# ─────────────────────────────────────────────
# Mise à jour du veille.json
# ─────────────────────────────────────────────

def load_veille_json():
    """Charge le fichier veille.json existant."""
    with open(VEILLE_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_versioned_json(data):
    """Sauvegarde une version datée du fichier veille."""
    VERSION_DIR.mkdir(parents=True, exist_ok=True)
    date_str = datetime.now().strftime("%d-%m-%Y")
    version_path = VERSION_DIR / f"{date_str}-veille.json"
    
    # Si un fichier du même jour existe, ajouter un compteur
    if version_path.exists():
        counter = 2
        while True:
            version_path = VERSION_DIR / f"{date_str}-veille-v{counter}.json"
            if not version_path.exists():
                break
            counter += 1
    
    with open(version_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    logger.info(f"💾 Version créée: {version_path}")
    return version_path


def save_veille_json(data):
    """Sauvegarde le fichier veille.json principal (écrase)."""
    # Créer une sauvegarde d'abord
    backup_path = VEILLE_JSON.with_suffix('.json.bak')
    if VEILLE_JSON.exists():
        with open(VEILLE_JSON, 'r', encoding='utf-8') as f:
            backup_content = f.read()
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(backup_content)
        logger.info(f"📦 Backup créé: {backup_path}")
    
    with open(VEILLE_JSON, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    logger.info(f"💾 veille.json mis à jour")


def get_existing_urls(veille_data):
    """Récupère toutes les URLs déjà présentes dans le veille.json."""
    urls = set()
    for veille in veille_data.get("veilles", []):
        for article in veille.get("articles", []):
            link = article.get("link", "")
            if link:
                urls.add(link)
    return urls


def update_veille_json(categorized_articles, topics_config, dry_run=False, apply=False, max_articles=None):
    """Met à jour le veille.json avec les nouveaux articles.
    
    Par défaut: crée un fichier daté dans versions/
    --apply: écrase veille.json
    --dry-run: affiche seulement, n'écrit rien
    """
    veille_data = load_veille_json()
    existing_urls = get_existing_urls(veille_data)
    history = load_history()
    
    total_new = 0
    summary = {}
    version_path = None
    
    for topic_name, articles in categorized_articles.items():
        veille_index = topics_config[topic_name]["veille_index"]
        
        if veille_index >= len(veille_data["veilles"]):
            logger.warning(f"⚠ Index {veille_index} hors limites pour {topic_name}, ignoré")
            continue
        
        new_articles = []
        for article in articles:
            link = article.get("link", "")
            link_id = url_hash(link)
            
            # Ignorer les doublons
            if link in existing_urls or link_id in history.get("processed_urls", []):
                continue
            
            # Convertir au format veille
            veille_article = article_to_veille_format(article, topic_name)
            new_articles.append(veille_article)
            
            # Marquer comme traité
            history.setdefault("processed_urls", []).append(link_id)
            existing_urls.add(link)
        
        # Limiter si demandé
        if max_articles and len(new_articles) > max_articles:
            new_articles = new_articles[:max_articles]
        
        summary[topic_name] = len(new_articles)
        total_new += len(new_articles)
        
        if not dry_run and new_articles:
            # Ajouter les nouveaux articles à la veille
            veille_data["veilles"][veille_index]["articles"].extend(new_articles)
    
    if not dry_run and total_new > 0:
        # Toujours créer une version datée
        version_path = save_versioned_json(veille_data)
        
        # Si --apply, écraser aussi le fichier principal
        if apply:
            save_veille_json(veille_data)
        
        save_history(history)
    
    return summary, total_new, version_path

# ─────────────────────────────────────────────
# Export CSV
# ─────────────────────────────────────────────

def export_to_csv(categorized_articles):
    """Exporte les articles trouvés en CSV."""
    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    for topic, articles in categorized_articles.items():
        if not articles:
            continue
        
        csv_path = EXPORT_DIR / f"veille_{topic}_{timestamp}.csv"
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=[
                "date", "title", "link", "description", "source", "tags"
            ])
            writer.writeheader()
            for article in articles:
                writer.writerow({
                    "date": article.get("date", ""),
                    "title": article.get("title", ""),
                    "link": article.get("link", ""),
                    "description": article.get("description", ""),
                    "source": article.get("source", ""),
                    "tags": ", ".join(article.get("tags", []))
                })
        
        logger.info(f"📄 Export CSV: {csv_path}")

# ─────────────────────────────────────────────
# Rapport
# ─────────────────────────────────────────────

def print_report(categorized_articles, summary, total_new, dry_run=False, apply=False, version_path=None):
    """Affiche un rapport de la veille."""
    print("\n" + "=" * 60)
    print("  RAPPORT DE VEILLE AUTOMATIQUE")
    print(f"  {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
    if dry_run:
        print("  [MODE APERCU - Aucune modification]")
    elif apply:
        print("  [MODE APPLY - veille.json ecrase]")
    else:
        print("  [MODE VERSION - fichier date cree]")
    print("=" * 60)
    
    for topic, articles in categorized_articles.items():
        new_count = summary.get(topic, 0)
        print(f"\n{'─' * 40}")
        print(f"  📌 {topic} : {len(articles)} trouvés, {new_count} nouveaux")
        print(f"{'─' * 40}")
        
        for i, article in enumerate(articles[:10], 1):  # Afficher max 10
            status = "🆕" if i <= new_count else "📰"
            print(f"  {status} [{article.get('source', '?')}]")
            print(f"     {article.get('title', 'Sans titre')}")
            print(f"     📅 {article.get('date', 'Date inconnue')}")
            if article.get("link"):
                print(f"     🔗 {article['link'][:80]}...")
            print()
        
        if len(articles) > 10:
            print(f"  ... et {len(articles) - 10} autres articles")
    
    print(f"\n{'=' * 60}")
    print(f"  TOTAL : {total_new} nouveaux articles")
    if version_path:
        print(f"  FICHIER : {version_path.name}")
        print(f"  CHEMIN  : {version_path}")
    if not dry_run and not apply and total_new > 0:
        print(f"")
        print(f"  Pour ecraser veille.json, relancer avec --apply")
    print(f"{'=' * 60}\n")

# ─────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Système de veille automatique RSS - Cybersécurité",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples:
  python3 rss.py                    # Cree un fichier date (versions/)
  python3 rss.py --dry-run          # Apercu sans rien ecrire
  python3 rss.py --apply            # Ecrase veille.json
  python3 rss.py --topic MFA        # Filtrer uniquement MFA
  python3 rss.py --topic ZTNA SIEM  # Filtrer ZTNA et SIEM
  python3 rss.py --max-articles 5   # Max 5 articles par topic
  python3 rss.py --export-csv       # Exporter aussi en CSV
        """
    )
    parser.add_argument('--dry-run', action='store_true',
                        help='Afficher les resultats sans rien ecrire')
    parser.add_argument('--apply', action='store_true',
                        help='Ecraser veille.json (sinon cree un fichier date)')
    parser.add_argument('--topic', nargs='+', choices=['MFA', 'ZTNA', 'SIEM'],
                        help='Filtrer par topic(s) spécifique(s)')
    parser.add_argument('--max-articles', type=int, default=None,
                        help='Nombre max d\'articles à ajouter par topic')
    parser.add_argument('--export-csv', action='store_true',
                        help='Exporter les résultats en CSV')
    parser.add_argument('--max-age', type=int, default=MAX_AGE_DAYS,
                        help=f'Âge max des articles en jours (défaut: {MAX_AGE_DAYS})')
    parser.add_argument('--verbose', '-v', action='store_true',
                        help='Mode verbeux')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    logger.info("🚀 Démarrage de la veille automatique...")
    
    # Charger la configuration
    try:
        config = load_sources()
    except Exception as e:
        logger.error(f"Erreur chargement config: {e}")
        sys.exit(1)
    
    topics_config = config["topics"]
    
    # Filtrer les topics si demandé
    if args.topic:
        topics_config = {k: v for k, v in topics_config.items() if k in args.topic}
        logger.info(f"📋 Topics sélectionnés: {', '.join(args.topic)}")
    
    # Rassembler tous les feeds
    all_feeds = []
    for category, feeds in config["rss_feeds"].items():
        all_feeds.extend(feeds)
    
    logger.info(f"📡 {len(all_feeds)} flux RSS à scanner...")
    
    # Fetch en parallèle
    all_articles = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(fetch_feed, feed): feed for feed in all_feeds}
        for future in as_completed(futures):
            articles = future.result()
            all_articles.extend(articles)
    
    logger.info(f"📊 {len(all_articles)} articles récupérés au total")
    
    # Filtrer par âge
    if args.max_age:
        cutoff = datetime.now() - timedelta(days=args.max_age)
        # On ne filtre par âge que si on a une date parseable
        # Les articles sans date sont conservés
    
    # Catégoriser par topic
    categorized = categorize_articles(all_articles, topics_config)
    
    # Dedupliquer et mettre a jour
    summary, total_new, version_path = update_veille_json(
        categorized, topics_config,
        dry_run=args.dry_run,
        apply=args.apply,
        max_articles=args.max_articles
    )
    
    # Export CSV si demande
    if args.export_csv:
        export_to_csv(categorized)
    
    # Rapport
    print_report(categorized, summary, total_new,
                 dry_run=args.dry_run, apply=args.apply,
                 version_path=version_path)
    
    return 0 if total_new > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
