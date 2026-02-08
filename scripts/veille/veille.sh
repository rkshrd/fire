#!/bin/bash
# ============================================
# Veille Automatique RSS - Script de lancement
# ============================================
#
# Ce script lance le système de veille automatique
# qui récupère les flux RSS cybersécurité et met
# à jour le fichier veille.json
#
# Usage:
#   ./veille.sh              # Exécution normale
#   ./veille.sh --dry-run    # Aperçu sans modification
#   ./veille.sh --cron       # Mode cron (silencieux sauf erreurs)
#   ./veille.sh --install    # Installer les dépendances
#   ./veille.sh --schedule   # Configurer un cron job quotidien
#
# ============================================

set -euo pipefail

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Répertoires
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Remonter jusqu'à la racine du dépôt (portfolio/scripts/veille -> ../../.. )
ROOT_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
PYTHON_SCRIPT="$SCRIPT_DIR/fetch.py"
LOG_FILE="$SCRIPT_DIR/veille.log"

# ─────────────────────────────────────────────
# Fonctions utilitaires
# ─────────────────────────────────────────────

log() {
    echo -e "${CYAN}[$(date '+%H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERREUR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1"
}

# ─────────────────────────────────────────────
# Vérification des prérequis
# ─────────────────────────────────────────────

check_python() {
    if command -v python3 &> /dev/null; then
        PYTHON_CMD="python3"
    elif command -v python &> /dev/null; then
        PYTHON_CMD="python"
    else
        error "Python3 n'est pas installé."
        echo "  → Installez-le avec: sudo apt install python3 python3-pip python3-venv"
        exit 1
    fi
    
    PYTHON_VERSION=$($PYTHON_CMD --version 2>&1 | awk '{print $2}')
    log "Python détecté: $PYTHON_VERSION"
}

# ─────────────────────────────────────────────
# Installation des dépendances
# ─────────────────────────────────────────────

install_deps() {
    log "📦 Installation des dépendances..."
    
    check_python
    
    # Créer un environnement virtuel si nécessaire
    if [ ! -d "$VENV_DIR" ]; then
        log "Création de l'environnement virtuel..."
        $PYTHON_CMD -m venv "$VENV_DIR"
    fi
    
    # Activer le venv
    source "$VENV_DIR/bin/activate"
    
    # Installer feedparser
    pip install --upgrade pip > /dev/null 2>&1
    pip install feedparser > /dev/null 2>&1
    
    success "Dépendances installées avec succès"
    success "  → feedparser $(pip show feedparser 2>/dev/null | grep Version | awk '{print $2}')"
    
    deactivate
}

# ─────────────────────────────────────────────
# Activation de l'environnement
# ─────────────────────────────────────────────

activate_env() {
    if [ -d "$VENV_DIR" ]; then
        source "$VENV_DIR/bin/activate"
    else
        # Vérifier si feedparser est installé globalement
        if ! $PYTHON_CMD -c "import feedparser" 2>/dev/null; then
            warn "feedparser non trouvé. Installation..."
            install_deps
            source "$VENV_DIR/bin/activate"
        fi
    fi
}

# ─────────────────────────────────────────────
# Configuration du cron job
# ─────────────────────────────────────────────

setup_cron() {
    log "⏰ Configuration du cron job..."
    
    CRON_CMD="0 8 * * * cd $SCRIPT_DIR && $SCRIPT_DIR/veille.sh --cron >> $LOG_FILE 2>&1"
    
    # Vérifier si le cron existe déjà
    if crontab -l 2>/dev/null | grep -q "veille.sh"; then
        warn "Un cron job existe déjà pour la veille."
        echo "  Cron actuel:"
        crontab -l | grep "veille.sh"
        read -p "  Remplacer ? (o/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Oo]$ ]]; then
            return
        fi
        # Supprimer l'ancien
        crontab -l | grep -v "veille.sh" | crontab -
    fi
    
    # Ajouter le nouveau cron
    (crontab -l 2>/dev/null; echo "$CRON_CMD") | crontab -
    
    success "Cron job configuré : tous les jours à 8h00"
    echo "  → Pour vérifier: crontab -l"
    echo "  → Pour supprimer: crontab -l | grep -v veille.sh | crontab -"
}

# ─────────────────────────────────────────────
# Exécution principale
# ─────────────────────────────────────────────

run_veille() {
    local ARGS=("$@")
    
    check_python
    activate_env
    
    # Vérifier que le script Python existe
    if [ ! -f "$PYTHON_SCRIPT" ]; then
        error "Script Python non trouvé: $PYTHON_SCRIPT"
        exit 1
    fi
    
    # Vérifier que le fichier de sources existe
    if [ ! -f "$SCRIPT_DIR/sources.json" ]; then
        error "Fichier de sources non trouvé: $SCRIPT_DIR/sources.json"
        exit 1
    fi
    
    # Vérifier que veille.json existe (à la racine du dépôt)
    if [ ! -f "$ROOT_DIR/veille.json" ]; then
        error "veille.json non trouvé dans: $ROOT_DIR"
        exit 1
    fi
    
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════╗"
    echo "║   🔍 VEILLE AUTOMATIQUE CYBERSÉCURITÉ   ║"
    echo "║      MFA · ZTNA · SIEM                  ║"
    echo "╚══════════════════════════════════════════╝"
    echo -e "${NC}"
    
    # Lancer le script Python
    $PYTHON_CMD "$PYTHON_SCRIPT" "${ARGS[@]}"
    EXIT_CODE=$?
    
    if [ $EXIT_CODE -eq 0 ]; then
        success "Veille terminée avec succès - Nouveaux articles ajoutés"
    elif [ $EXIT_CODE -eq 1 ]; then
        log "Veille terminée - Aucun nouvel article trouvé"
    else
        error "La veille a rencontré des erreurs (code: $EXIT_CODE)"
    fi
    
    return $EXIT_CODE
}

# ─────────────────────────────────────────────
# Point d'entrée
# ─────────────────────────────────────────────

main() {
    cd "$SCRIPT_DIR"
    
    case "${1:-}" in
        --install)
            install_deps
            ;;
        --schedule)
            setup_cron
            ;;
        --cron)
            # Mode silencieux pour cron
            shift
            check_python
            activate_env
            $PYTHON_CMD "$PYTHON_SCRIPT" "$@" >> "$LOG_FILE" 2>&1
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --install       Installer les dépendances (feedparser)"
            echo "  --schedule      Configurer un cron job quotidien (8h00)"
            echo "  --cron          Mode silencieux (pour cron)"
            echo "  --dry-run       Aperçu sans modifier veille.json"
            echo "  --topic T       Filtrer par topic (MFA, ZTNA, SIEM)"
            echo "  --max-articles N  Limiter le nombre d'articles par topic"
            echo "  --export-csv    Exporter les résultats en CSV"
            echo "  --verbose       Mode verbeux"
            echo "  --help          Afficher cette aide"
            echo ""
            echo "Exemples:"
            echo "  $0 --install           # Première utilisation"
            echo "  $0                     # Lancer la veille"
            echo "  $0 --dry-run           # Tester sans modifier"
            echo "  $0 --topic MFA SIEM    # Veille MFA et SIEM uniquement"
            echo "  $0 --schedule          # Planifier en cron quotidien"
            ;;
        *)
            run_veille "$@"
            ;;
    esac
}

main "$@"
