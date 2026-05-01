# pushup-quest

Eine kleine PWA zum Tracken von täglichen Liegestützen — mit Monatszielen, Stats und Offline-Support.

## Stack

- Vanilla HTML / CSS / JavaScript (alles inline in `index.html`)
- Service Worker (`service-worker.js`) für Offline-Caching, Strategie: **network-first**
- Web App Manifest (`manifest.json`) für Installation als Standalone-App auf Mobile
- Hosting: Vercel — Auto-Deploy bei jedem Push auf `main`

## Lokal entwickeln

Statisch — einfach `index.html` öffnen oder einen Mini-Server starten:

```bash
python3 -m http.server 8000
# dann http://localhost:8000
```

## Deployen

Push nach `main` → Vercel deployt automatisch.
