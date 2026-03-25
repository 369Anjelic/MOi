# 📦 GITHUB UPLOAD GUIDE - Schritt für Schritt

## **WAS DU HOCHLADEN SOLLST**

Diese Dateien sind FERTIG vorbereitet und ready für GitHub:

```
✅ MOi_KASPAR_RESUME_MIT_PASSWORD.html
✅ MOi_README.md
✅ MOi_package.json
✅ netlify.toml
✅ netlify_functions_chat.js
✅ public_index.html
✅ .env_MOi_example
✅ .gitignore
✅ .github_workflows_deploy.yml
```

---

## 🎯 SCHRITT-FÜR-SCHRITT ANLEITUNG

### **SCHRITT 1: Lokale Folder-Struktur erstellen**

```bash
mkdir MOi
cd MOi

# Erstelle die Ordner
mkdir -p netlify/functions
mkdir -p public
mkdir -p .github/workflows
mkdir -p docs
```

### **SCHRITT 2: Dateien in richtige Orte speichern**

```
MOi/
├── MOi_KASPAR_RESUME_MIT_PASSWORD.html → RENAME zu: index.html → public/index.html
├── MOi_README.md → README.md
├── MOi_package.json → package.json
├── netlify.toml
├── netlify_functions_chat.js → netlify/functions/chat.js
├── public_index.html → public/index.html
├── .env_MOi_example → .env.example
├── .gitignore
├── .github/workflows/
│   └── .github_workflows_deploy.yml → deploy.yml
└── docs/
    └── (optionale Dokumentation)
```

### **SCHRITT 3: Lokal testen BEVOR du zu GitHub pushst**

```bash
cd MOi

# Install dependencies
npm install

# Erstelle .env mit deinem API Key
echo "ANTHROPIC_API_KEY=sk-..." > .env

# Starte lokal
npm start

# Test: http://localhost:3000
# Login mit: unwritten-2026
```

### **SCHRITT 4: Git initialisieren**

```bash
# Initialisiere Git
git init

# Füge alle Dateien hinzu
git add .

# Commit
git commit -m "Initial MOi Release - Kaspar Hauser Bot Resume"

# Stelle Branch auf main
git branch -M main
```

### **SCHRITT 5: GitHub Repo erstellen**

1. Öffne https://github.com/new
2. **Repository name:** `MOi`
3. **Description:** "MOi - Ein detailliertes Resume wie ich Kaspar Hauser Bot auf Netlify gebaut habe"
4. **Public** (oder Private wenn du willst)
5. **Klick "Create repository"**

### **SCHRITT 6: Zu GitHub pushen**

```bash
# Füge remote hinzu (copy-paste von GitHub):
git remote add origin https://github.com/369Anjelic/MOi.git

# Push zum main branch
git branch -M main
git push -u origin main

# ✅ Code ist jetzt auf GitHub!
```

### **SCHRITT 7: Netlify verbinden**

1. Öffne https://netlify.com
2. Login mit GitHub
3. Klick "Add new site" → "Import an existing project"
4. Wähle dein GitHub Konto
5. Suche nach "MOi" Repository
6. Klick "Connect & Deploy"

**Build Settings sollten auto-erkannt werden:**
```
Build command: npm install
Functions directory: netlify/functions
Publish directory: public
```

### **SCHRITT 8: Environment Variables setzen**

In Netlify Dashboard:
1. Gehe zu: Settings → Build & Deploy → Environment
2. Klick "Add environment variable"
3. **KEY:** ANTHROPIC_API_KEY
4. **VALUE:** sk-ant-... (dein echter API Key!)
5. Save

### **SCHRITT 9: Deploy!**

Netlify deployt automatisch wenn du pushst!

```bash
# Jedes Mal wenn du pusht:
git push origin main

# → Netlify buildet automatisch
# → Deploy zu production
# → Site ist LIVE!
```

---

## 📋 CHECKLIST VOR DEM PUSH

```
DATEI-STRUKTUR:
☐ netlify.toml im Root
☐ netlify/functions/chat.js existiert
☐ public/index.html existiert
☐ package.json im Root
☐ .env.example im Root (KEIN .env!)
☐ .gitignore im Root
☐ .github/workflows/deploy.yml existiert

CODE:
☐ npm install funktioniert
☐ npm start funktioniert lokal
☐ Login mit unwritten-2026 funktioniert
☐ Chat funktioniert (lokal getestet)

GIT:
☐ git init gemacht
☐ .gitignore filtert node_modules
☐ .gitignore filtert .env
☐ Alle wichtigen Dateien staged
☐ First commit gemacht

GITHUB:
☐ Repo erstellt
☐ git remote add origin ... gemacht
☐ git push erfolgt

NETLIFY:
☐ Repo connected
☐ ANTHROPIC_API_KEY environment variable gesetzt
☐ Build erfolgt ohne Fehler
```

---

## 🚨 HÄUFIGE FEHLER

### ❌ "node_modules wird zu GitHub gepusht"
```bash
# In .gitignore sicherstellen:
node_modules/
.env

# Dann:
git rm -r --cached node_modules/
git commit -m "Remove node_modules"
git push
```

### ❌ "ANTHROPIC_API_KEY wird gepusht"
```bash
# NIEMALS .env committen!
# Nur .env.example!

rm .env
git add .env.example
git commit -m "Remove .env, keep .env.example"
git push
```

### ❌ "Netlify Deploy fehlgeschlagen"
1. Check Build Logs: Netlify Dashboard → Deploys → Deploy Log
2. Häufige Probleme:
   - `npm install` fehlgeschlagen → Dependencies Error
   - `ANTHROPIC_API_KEY undefined` → Env Var nicht gesetzt
   - `netlify/functions/chat.js not found` → Datei nicht committed

### ❌ "Chat funktioniert nicht live"
1. Browser F12 → Console
2. Suche nach Errors
3. Network Tab → POST /.netlify/functions/chat
4. Check Status Code (200 = OK, 500 = Server Error)

---

## 🎓 GIT COMMANDS QUICK REFERENCE

```bash
# Status checken
git status

# Alles hinzufügen
git add .

# Spezifische Datei
git add netlify.toml

# Commit
git commit -m "Beschreibung was du geändert hast"

# Push (nachdem du origin gesetzt hast)
git push origin main

# Pull (wenn andere daran arbeiten)
git pull origin main

# Branch erstellen
git checkout -b feature/xyz

# Switch zu main
git checkout main

# Merge feature in main
git merge feature/xyz
```

---

## 📝 COMMIT MESSAGE BEST PRACTICES

Good commit messages:
```
✅ "Add MOi Resume UI with 7 chapters"
✅ "Fix: ANTHROPIC_API_KEY environment variable"
✅ "Deploy: Add Netlify Functions for chat API"
✅ "Docs: Update README with installation guide"

❌ "Update"
❌ "Fix bug"
❌ "xyz"
❌ "asdf"
```

---

## 🎉 ERFOLG!

Wenn alles funktioniert:

1. ✅ GitHub Repo: https://github.com/369Anjelic/MOi
2. ✅ Netlify Site: https://moi.netlify.app
3. ✅ Login: unwritten-2026
4. ✅ Chat funktioniert
5. ✅ Du kannst Änderungen machen und pushen
6. ✅ Netlify deployt automatisch

---

## 📚 WEITERE RESSOURCEN

- GitHub Docs: https://docs.github.com
- Git Basics: https://git-scm.com/book
- Netlify Docs: https://netlify.com/docs
- Anthropic API: https://api.anthropic.com/docs

---

**Du bist bereit! Viel Erfolg! 🚀**
