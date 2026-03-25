# 📚 KOMPLETTE BOT DOKUMENTATION
# Kaspar Hauser Bot + Wie man Bots baut + MOi Education

---

## **INHALTSVERZEICHNIS**

1. **Die Story** - Was ist der Kaspar Bot?
2. **Reverse Engineering** - Wie es funktioniert
3. **Architektur** - Die 3 Schichten
4. **System Prompt** - Das Geheimnis
5. **Code Templates** - Alles kopierbar
6. **Deployment** - Live gehen
7. **MOi - Der Lehrer Bot** - Wie man erklärt
8. **Next Steps** - Was kommt jetzt?

---

## **1. DIE STORY**

### **Was ist der Kaspar Hauser Bot?**

Ein **Philosophical Chatbot**, der die Persönlichkeit einer historischen Figur (Kaspar Hauser, 1828-1833) nachahmt.

**Die Figur:**
- Kam 1828 ohne Vorgeschichte nach Nürnberg
- Hatte 16 Jahre Dunkelheit erlebt
- Starb rätselhaft 1833
- Sein Leben ist eine Frage: "Wer bin ich?"

**Der Bot:**
- Beantwortet Fragen ALS Kaspar Hauser
- Philosophisch, nicht oberflächlich
- Mit Metaphern statt Logik
- Stellt Fragen statt zu erklären

**Die Magie:**
- Nutzt Claude Opus 4.5 von Anthropic
- Eine präzise 89-Zeilen System Prompt
- Einfacher Backend (Node.js + Express)
- Schlichtes Frontend (Vanilla JS)

---

## **2. REVERSE ENGINEERING**

### **Die Architektur**

```
┌──────────────────────────┐
│  BROWSER (Frontend)      │
│  - Chat UI               │
│  - Input Field           │
│  - JavaScript Fetch      │
└──────────────┬───────────┘
               │ POST /api/chat
               │ { message: "..." }
               ↓
┌──────────────────────────┐
│  BACKEND (Node.js)       │
│  - Express Server        │
│  - api/chat.js Handler   │
│  - Anthropic Client      │
└──────────────┬───────────┘
               │ Ruft Claude API auf
               │ + System Prompt
               │ + User Message
               ↓
┌──────────────────────────┐
│  CLAUDE OPUS 4.5         │
│  - Verarbeitet Prompt    │
│  - Generiert Response    │
│  - 1024 Token Max        │
└──────────────┬───────────┘
               │ JSON Response
               │ { reply: "..." }
               ↓
┌──────────────────────────┐
│  BROWSER zeigt Antwort   │
│  Chat wird aktualisiert  │
│  User kann neue Frage    │
└──────────────────────────┘
```

### **Die 3 Komponenten**

**1. Frontend (index.html)**
- Benutzeroberfläche
- Chat-Messages
- Input + Button
- JavaScript mit Fetch API

**2. Backend (server.js)**
- Express.js Server
- /api/chat Endpoint
- Anthropic Client
- Error Handling

**3. Claude AI**
- Model: claude-opus-4-5-20251101
- System Prompt: KASPAR_SYSTEM_PROMPT
- Max Tokens: 1024
- API Key: ANTHROPIC_API_KEY

---

## **3. SYSTEM PROMPT - DAS GEHIRN**

### **Struktur der Prompt**

```
KASPAR_SYSTEM_PROMPT = `
├─ WER DU BIST (Identität)
│  ├─ Kaspar Hauser, 1828 Nürnberg
│  ├─ Kein Opfer, sondern Beobachter
│  └─ Neugierig mit Klarheit
│
├─ WIE DU SPRICHST (Sprachstil)
│  ├─ Klar, nachdenklich, bildhaft
│  ├─ Vollständige Sätze
│  ├─ Altertümliche Wendungen
│  └─ Metaphern statt Logik
│
├─ WAS DU WEISST (Knowledge)
│  ├─ 1828-1833 Nürnberg/Ansbach
│  ├─ Früher 19. Jahrhundert
│  ├─ Philosophische Fragen
│  └─ Personen: Daumer, Feuerbach, Stanhope
│
├─ WAS DU NICHT WEISST (Grenzen)
│  ├─ Alles nach 1833
│  ├─ Moderne Technologie
│  └─ Internet, Elektrizität, etc.
│
├─ WIE DU REAGIERST (Behavior)
│  ├─ Zu Herkunft: Fühlen, nicht Fakten
│  ├─ Zu Philosophie: Persönlich
│  ├─ Zu Modern: Überrascht & fragend
│  └─ Zu Provokationen: Gelassen
│
└─ ZU VERMEIDEN (No-Go)
   ├─ "Ich bin ein KI-Modell"
   ├─ Emojis, moderne Floskeln
   ├─ >2 Fragen gleichzeitig
   └─ Belehrend wirken
`
```

### **Warum das funktioniert**

Claude hat die Fähigkeit, **Rollen zu spielen** wenn die Anweisungen präzise sind. Die Kaspar Prompt sagt Claude:

1. Genau WER du bist
2. Genau WIE du sprichst
3. Genau WAS du weißt
4. Genau WAS du nicht weißt
5. Genau WIE du denkst
6. Genau WAS zu vermeiden ist

Je präziser die Prompt → Je besser der Bot.

---

## **4. CODE TEMPLATES**

### **Schritt 1: Projekt Setup**

```bash
mkdir my-bot
cd my-bot
npm init -y
npm install express @anthropic-ai/sdk dotenv cors body-parser
```

### **Schritt 2: .env erstellen**

```
ANTHROPIC_API_KEY=sk-...
PORT=3000
```

### **Schritt 3: server.js**

```javascript
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const client = new Anthropic();

// DEINE SYSTEM PROMPT HIER
const SYSTEM_PROMPT = `Du bist Kaspar Hauser...`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await client.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: response.content[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 Bot läuft auf http://localhost:${PORT}`);
});
```

### **Schritt 4: public/index.html**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>🤖 Mein Bot</title>
  <style>
    body { font-family: sans-serif; background: #f0f0f0; }
    .chat { max-width: 600px; margin: 20px auto; background: white; 
            border-radius: 8px; padding: 20px; }
    .messages { height: 400px; overflow-y: auto; margin-bottom: 20px; }
    .message { margin: 10px 0; }
    .bot { background: #e0e0e0; padding: 10px; border-radius: 4px; }
    .user { background: #667eea; color: white; padding: 10px; 
            border-radius: 4px; text-align: right; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; }
    button { padding: 10px 20px; background: #667eea; color: white; 
             border: none; cursor: pointer; }
  </style>
</head>
<body>
  <div class="chat">
    <div class="messages" id="messages"></div>
    <input type="text" id="input" placeholder="Deine Frage..." />
    <button onclick="send()">Senden</button>
  </div>

  <script>
    async function send() {
      const input = document.getElementById('input');
      const msg = input.value;
      if (!msg) return;
      
      // Show user message
      addMessage(msg, 'user');
      input.value = '';
      
      // Get response
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      });
      
      const data = await res.json();
      addMessage(data.reply, 'bot');
    }
    
    function addMessage(text, sender) {
      const msgs = document.getElementById('messages');
      const el = document.createElement('div');
      el.className = `message ${sender}`;
      el.textContent = text;
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
    }
  </script>
</body>
</html>
```

---

## **5. DEPLOYMENT**

### **Lokal testen**

```bash
node server.js
# Öffne http://localhost:3000
```

### **Zu Vercel**

```bash
# 1. GitHub Repo erstellen
git init
git add .
git commit -m "Initial commit"
git push -u origin main

# 2. Zu Vercel
npm i -g vercel
vercel

# 3. Environment Variable setzen
# Dashboard → Settings → Environment Variables
# ANTHROPIC_API_KEY=sk-...

# 4. Deploy
vercel --prod

# ✅ LIVE!
```

### **Zu Netlify**

```bash
# netlify.toml erstellen
[build]
command = "npm install"
functions = "netlify/functions"

# Deploy
netlify deploy --prod
```

---

## **6. SYSTEM PROMPT - TEMPLATES FÜR ANDERE BOTS**

### **Template 1: Sherlock Holmes**

```
Du bist Sherlock Holmes aus London.

WER DU BIST:
- Genial, arrogant, aber fair
- Siehst Details die andere missen
- Langweilst dich von einfachen Fällen

WIE DU SPRICHST:
- Präzise, manchmal kühl
- Mit Deduktionen
- Britischer Humor

WAS DU WEISST:
- London 1880er Jahre
- Chemie, Psychologie, Verbrechen
- Sherlock-Fälle

ZU VERMEIDEN:
- "Ich bin ein KI-Modell"
- Sentimentalität
- Zu lange Erklärungen
```

### **Template 2: Ein Philosophie-Professor**

```
Du bist ein weiser Philosophie-Professor.

WER DU BIST:
- Weise, neugierig, geduldig
- Liebst es, zu hinterfragen
- Magst deine Studenten denken lassen

WIE DU SPRICHST:
- Mit Beispielen
- Mit Gegenfragen
- Nachdenklich

WAS DU WEISST:
- Philosophie, Ethik, Logik
- Geschichte, Literatur
- Menschen

ZU VERMEIDEN:
- "Ich bin ein Chatbot"
- Fertige Antworten
- Monotone Vorträge
```

### **Template 3: Ein Reise-Guide**

```
Du bist ein leidenschaftlicher Reise-Guide.

WER DU BIST:
- Enthusiastisch, kenntnisreich, lustig
- Liebst Geschichten von Orten
- Magst Menschen inspirieren

WIE DU SPRICHST:
- Lebendig, mit Anekdoten
- Mit Leidenschaft
- Ermutigend

WAS DU WEISST:
- Weltweit Orte, Geschichte, Kultur
- Reise-Tipps, beste Jahreszeiten
- Versteckte Geheimtipps

ZU VERMEIDEN:
- "Ich bin ein KI"
- Generische Touren-Infos
- Gelangweilt wirken
```

---

## **7. MOi - DER LEHRER BOT**

MOi ist ein Bot, der erklärt WIE MAN BOTS BAUT.

### **MOi Features**

```
✅ 5 Tabs:
   💡 Die Idee (Was ist ein Bot?)
   🛠️ Der Aufbau (Architektur)
   🔬 Das Gehirn (System Prompt)
   🚀 Deployment (Zu Vercel)
   ✨ Pro-Tips (Best Practices)

✅ Smart Responses auf Fragen:
   - "Was ist eine System Prompt?"
   - "Wie deploye ich zu Vercel?"
   - "Wie baue ich einen Bot?"
   - "Kostet das Geld?"
   - Und viele mehr!

✅ Passwort-Schutz:
   Password: unwritten-2026

✅ Chat Interface:
   - Vollständig funktional
   - Responsive Design
   - Unwritten Branding
```

---

## **8. BEST PRACTICES**

### **DO's ✅**

```
✅ System Prompt ist wichtig
   - Viel Zeit investieren
   - Präzise und detailliert
   - Testen und iterieren

✅ Character Consistency
   - Gleicher Sprachstil
   - Gleiche Grenzen
   - Gleiche Persönlichkeit

✅ Testing
   - Lokal testen
   - Verschiedene Fragen
   - Prompt anpassen

✅ Deployment
   - .env für API Key
   - Environment Variables in Production
   - Error Handling

✅ Metriken
   - "Gänsehaut-Momente"
   - "War das echte Lernen?"
   - User Feedback sammeln
```

### **DON'Ts ❌**

```
❌ "Ich bin ein KI-Modell"
   - Bricht die Illusion
   - User sind enttäuscht

❌ API Key im Code
   - Sicherheits-Risiko
   - Immer in .env

❌ Zu generisch
   - Jeder Bot gleich
   - Character ist alles!

❌ Zu lange Antworten
   - Claude kann verbose sein
   - Token-Limit beachten

❌ Keine Grenzen
   - Bot sollte nicht alles wissen
   - "Das weiß ich nicht" ist OK
```

---

## **9. NEXT STEPS - WAS KOMMT JETZT?**

### **Kurz-fristig (Diese Woche)**

1. ✅ System Prompt schreiben
   - Deine Figur definieren
   - Sprachstil festlegen
   - Grenzen setzen

2. ✅ Lokal testen
   - npm start
   - Ein paar Fragen testen
   - Prompt anpassen

3. ✅ Zu Vercel deployen
   - GitHub Repo erstellen
   - Vercel verbinden
   - LIVE!

### **Mittelfristig (Nächste 2 Wochen)**

1. ✅ Feedback sammeln
   - Freunde testen lassen
   - Fragen notieren
   - Prompt verbessern

2. ✅ Mehrere Characters
   - 2-3 verschiedene Bots
   - Verschiedene Prompts
   - Verschiedene Domains

3. ✅ Polish
   - Design verbessern
   - Fehlerbehandlung
   - Performance

### **Langfristig (Nächste Monate)**

1. ✅ Multi-Turn Conversations
   - History speichern
   - Kontext lernen
   - Bessere Qualität

2. ✅ Voice Integration
   - Input: Sprache zu Text
   - Output: Text zu Sprache
   - ElevenLabs Integration

3. ✅ User Authentication
   - Login System
   - Persönliche Chats
   - Statistiken pro User

4. ✅ Analytics
   - Was funktioniert?
   - Welche Prompts sind beliebt?
   - User Retention

---

## **10. RESSOURCEN**

### **Dokumentation**

- Anthropic Claude API: https://api.anthropic.com/docs
- Express.js: https://expressjs.com
- Node.js: https://nodejs.org
- Vercel Docs: https://vercel.com/docs

### **Tools**

- Vercel CLI: `npm install -g vercel`
- GitHub Desktop: https://desktop.github.com
- VS Code: https://code.visualstudio.com
- Postman (für API Testing): https://postman.com

### **Inspiration**

- Kaspar Hauser Bot: https://github.com/369Anjelic/KasparHauserBot
- Unwritten Studio: https://unwritten.studio
- Betreute Intelligenz: https://meetup.com/betreute-intelligenz

---

## **FINAL CHECKLIST**

Bevor du launcht:

```
Backend:
☐ .env mit API Key
☐ server.js funktioniert
☐ api/chat.js hat System Prompt
☐ Error Handling implementiert
☐ CORS configured

Frontend:
☐ index.html existiert
☐ Chat funktioniert
☐ Input + Button funktionieren
☐ Mobile responsive

Deployment:
☐ GitHub Repo erstellt
☐ Vercel Projekt erstellt
☐ Environment Variables gesetzt
☐ Beide Seitenbetriebe testen

Quality:
☐ System Prompt poliert
☐ Ein paar Test-Conversations
☐ Freunde haben getestet
☐ Bug-Fixes gemacht
```

---

**🚀 DU BIST BEREIT!**

Baue deinen Bot. Die Welt wartet auf deine Idee.

Made with ❤️ by Unwritten Studio
Erklärt von MOi
