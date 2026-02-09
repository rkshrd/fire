# Veille Automatique RSS - Cybersécurité (dossier `veille`)

Ceci est une copie simplifiée du répertoire de veille, déplacée vers
`portfolio/scripts/veille` pour avoir un nom en un mot (`veille`).

Principales commandes:

Linux/macOS:

```bash
chmod +x veille.sh
./veille.sh --install
./veille.sh           # lancer la veille
./veille.sh --dry-run # aperçu sans modifier
```

Python:

```bash
python3 rss.py --dry-run
```

Cron:

```bash
./veille.sh --schedule
```

Les fichiers importants sont:

- `rss.py` : script Python principal
- `rss_sources.json` : configuration des flux et mots-clés
- `veille.sh` : lanceur bash pour installation et planification
- `versions/` : copies datées de `veille.json`
- `veille_history.json` : historique des URL traitées