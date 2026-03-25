# 🤖 MOi - Kaspar Hauser Bot on Netlify

**MOi erklärt wie ich den Kaspar Hauser Bot gebaut und zu Netlify deployed habe.**

Ein detailliertes Resume über den gesamten Prozess von der Idee zum Live-Bot.

---

## 🎯 Was ist MOi?

MOi ist ein **Lehrer-Bot** mit **7 Kapiteln**:

1. **Die Idee** - Wer war Kaspar Hauser? Warum ein Bot?
2. **Planung** - Wie baut man Bots? Step-by-Step Plan
3. **Code schreiben** - Frontend + Backend
4. **System Prompt** - Das Geheimnis (89 Zeilen!)
5. **Lokal testen** - Alles checken bevor Deploy
6. **Zu Netlify** - Live gehen in 5 Minuten
7. **Live! 🎉** - Der Bot in der Welt + Was du gelernt hast

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/dein-username/MOi.git
cd MOi

# 2. Dependencies
npm install

# 3. Environment
cp .env.example .env
# Setze ANTHROPIC_API_KEY=sk-...

# 4. Run
npm start
# Öffne http://localhost:3000
# Password: unwritten-2026
```

---

## 📂 Dateien für GitHub

```
MOi/
├── 📄 README.md (diese Datei)
├── 🌐 public/
│   └── index.html (Frontend - die MOi UI)
├── 🛠️ netlify/
│   └── functions/
│       └── chat.js (API - Backend)
├── ⚙️ netlify.toml (Netlify Config)
├── 📦 package.json (Dependencies)
├── 📋 .env.example (Template für Secrets)
├── .gitignore (Ignore node_modules, .env, etc.)
└── 📚 docs/
    ├── KASPAR_BOT_REVERSE_ENGINEERING.md
    ├── BOT_BUILDER_STARTER_KIT.md
    └── KOMPLETTE_DOKUMENTATION.md
```

---

## 🔐 Environment Variables

Erstelle `.env` mit:

```
ANTHROPIC_API_KEY=sk-ant-v0-...
```

⚠️ **Niemals in Git speichern!** → `.gitignore` kümmert sich drum

---

## 📱 Features

✅ **7 interaktive Kapitel**  
✅ **Vollständige Architektur-Erklärung**  
✅ **Code-Snippets Copy-Paste ready**  
✅ **Netlify Deploy Guide**  
✅ **System Prompt Magic** (Das Geheimnis!)  
✅ **Q&A mit MOi**  
✅ **Responsive Design**  

---

## 🎓 Was du lernst

**Backend:**
- Express.js Server
- Claude API Integration
- Netlify Functions (Serverless)
- Error Handling & CORS

**Frontend:**
- Vanilla JavaScript (keine Frameworks)
- Fetch API
- State Management (Tabs, Login)
- Responsive Design

**AI:**
- System Prompts schreiben
- Character Engineering
- Claude "dressieren"
- Prompt Iteration

**Deployment:**
- GitHub Integration
- Netlify CI/CD
- Environment Variables
- Production Best Practices

---

## 🔑 Das Geheimnis: System Prompt

Die System Prompt ist nicht Code, sondern **Charakter-Definition**.

Sie sagt Claude:
- **WER du bist** (Kaspar Hauser, 1828-1833)
- **WIE du sprichst** (Philosophisch, altertümlich)
- **WAS du weißt** (Früher 19. Jahrhundert)
- **WAS du NICHT weisst** (Moderne Technologie)
- **ZU VERMEIDEN** ("Ich bin ein KI")

89 Zeilen = Maximale Qualität der Antworten

---

## 🚀 Zu Netlify Deployen

```bash
# 1. GitHub Repo hochladen
git push origin main

# 2. Netlify verbinden
# → netlify.com
# → Import from Git
# → Wähle MOi Repo

# 3. Build Settings (Auto erkannt):
# Build command: npm install
# Functions: netlify/functions
# Publish: public

# 4. Environment Variable
# Settings → Build & Deploy → Environment
# ANTHROPIC_API_KEY=sk-...

# 5. Deploy!
# Netlify macht alles automatisch
```

**Resultat:** `https://moi.netlify.app` ✅

---

## 🔗 Kaspar Hauser Bot

Basiert auf echter historischer Figur:
- **26. Mai 1828**: Tauchte in Nürnberg auf
- **1828-1829**: Lerntes die Welt kennen
- **1833**: Starb unter mysteriösen Umständen
- **Das Rätsel**: "Wer bin ich?"

Der Bot verkörpert diese Essenz.

---

## 📚 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | HTML5, CSS3, Vanilla JS |
| **Backend** | Node.js, Express.js |
| **AI** | Claude Opus 4.5 (Anthropic) |
| **Functions** | Netlify Functions |
| **Deployment** | Netlify + GitHub |
| **Auth** | Simple Password (Demo) |

---

## 💬 Password

Login zu MOi:
```
unwritten-2026
```

---

## 📖 Dokumentation

Im `/docs` Ordner:
- `KASPAR_BOT_REVERSE_ENGINEERING.md` - Detaillierte Architektur
- `BOT_BUILDER_STARTER_KIT.md` - Vom Scratch bauen
- `KOMPLETTE_DOKUMENTATION.md` - Alles in einem

---

## 🎯 Next Steps

Nach dem Verstehen:

### Kurz-fristig
- [ ] MOi lokaal testen
- [ ] Alle 7 Kapitel durchlesen
- [ ] Code kopieren & verstehen
- [ ] Zu Netlify deployen

### Mittelfristig
- [ ] Andere Characters bauen (Shakespeare, Sherlock)
- [ ] Multi-Turn Conversations
- [ ] User Authentication
- [ ] Analytics

### Langfristig
- [ ] Voice Input/Output
- [ ] Memory zwischen Sessions
- [ ] Fine-Tuning
- [ ] Monetisierung

---

## 🤝 Contributing

Verbesserungs-Ideen? Fehler gefunden?

1. Fork
2. Feature Branch (`git checkout -b feature/xyz`)
3. Commit (`git commit -m "Add xyz"`)
4. Push (`git push origin feature/xyz`)
5. Pull Request

---

## 📄 License

MIT - Frei zu verwenden, ändern, weiterverbreiten

---

## 🙏 Credits

**Unwritten Studio:**
- Vision: "Worte werden Welten"
- Team: Tobias von Dewitz, Stefan Probst, mehr
- Betreute Intelligenz Meetup (Nürnberg)

**Anthropic:**
- Claude API
- Die beste AI für Long-Form Conversations

**Netlify:**
- Einfaches Deployment
- Kostenlos für kleine Projekte

---

## 📞 Support

Fragen? 

1. Lese die Kapitel in MOi
2. Check `/docs` Dateien
3. Schaue Build Logs auf Netlify
4. Öffne ein GitHub Issue

---

**Made with ❤️ by Anjelic @ Unwritten Studio**

*Der Kaspar Hauser Bot - Philosophie trifft AI*

🚀 **Happy Bot Building!**
