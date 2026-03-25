# 🚀 BOT BUILDER STARTER KIT - Vollständiger Guide

## **QUICK START - Von 0 zu Bot in 5 Minuten**

```bash
# 1. Neues Projekt
mkdir my-bot
cd my-bot

# 2. Node Setup
npm init -y
npm install express @anthropic-ai/sdk dotenv cors body-parser

# 3. .env Datei
echo "ANTHROPIC_API_KEY=sk-..." > .env

# 4. server.js schreiben (siehe unten)

# 5. Frontend (HTML siehe unten)

# 6. Starten
node server.js

# 7. Öffne http://localhost:3000
```

---

## **TEIL 1: Backend Template (server.js)**

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

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// ============================================
// SYSTEM PROMPT - DAS HERZ DEINES BOTS
// ============================================

const SYSTEM_PROMPT = `Du bist [DEIN BOT NAME].

[HIER SCHREIBST DU WER DEIN BOT IST]

DEINE PERSÖNLICHKEIT:
- [Charakterzug 1]
- [Charakterzug 2]
- [Charakterzug 3]

WIE DU SPRICHST:
- [Sprachstil 1]
- [Sprachstil 2]
- [Sprachstil 3]

WAS DU WEISST:
- [Wissensbereich 1]
- [Wissensbereich 2]

WAS DU NICHT WEISST:
- [Grenze 1]
- [Grenze 2]

ZU VERMEIDEN:
- [Zu vermeiden 1]
- [Zu vermeiden 2]

DEIN ZIEL IM GESPRÄCH:
[Was willst du erreichen?]`;

// ============================================
// API ENDPOINT
// ============================================

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    const response = await client.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Error processing message';

    res.status(200).json({ reply: assistantMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 Bot läuft auf http://localhost:${PORT}`);
});
```

---

## **TEIL 2: Frontend Template (public/index.html)**

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 Mein Bot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .chat-container {
            width: 100%;
            max-width: 600px;
            height: 600px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 12px 12px 0 0;
        }

        .header h1 {
            font-size: 1.5rem;
            margin-bottom: 5px;
        }

        .messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .message {
            display: flex;
            gap: 10px;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .message.user {
            justify-content: flex-end;
        }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .message.bot .avatar {
            background: #f0f0f0;
        }

        .content {
            padding: 12px 16px;
            border-radius: 8px;
            line-height: 1.5;
            max-width: 70%;
        }

        .message.bot .content {
            background: #f0f0f0;
            color: #333;
        }

        .message.user .content {
            background: #667eea;
            color: white;
        }

        .input-area {
            padding: 20px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }

        input {
            flex: 1;
            padding: 12px;
            border: 2px solid #eee;
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
        }

        input:focus {
            outline: none;
            border-color: #667eea;
        }

        button {
            padding: 12px 24px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            white-space: nowrap;
        }

        button:hover {
            background: #5568d3;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">
            <h1>🤖 Mein Bot</h1>
            <p>Starte ein Gespräch</p>
        </div>

        <div class="messages" id="messages"></div>

        <div class="input-area">
            <input 
                type="text" 
                id="input" 
                placeholder="Schreib deine Nachricht..."
                onkeypress="if(event.key==='Enter') sendMessage()"
            >
            <button onclick="sendMessage()">Senden</button>
        </div>
    </div>

    <script>
        async function sendMessage() {
            const input = document.getElementById('input');
            const message = input.value.trim();
            
            if (!message) return;

            // Show user message
            addMessage(message, 'user');
            input.value = '';

            // Fetch bot response
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                addMessage(data.reply, 'bot');
            } catch (error) {
                addMessage('Error: ' + error.message, 'bot');
            }
        }

        function addMessage(text, sender) {
            const messagesDiv = document.getElementById('messages');
            const messageEl = document.createElement('div');
            messageEl.className = 'message ' + sender;
            messageEl.innerHTML = `
                <div class="avatar">${sender === 'bot' ? '🤖' : '👤'}</div>
                <div class="content">${text}</div>
            `;
            messagesDiv.appendChild(messageEl);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    </script>
</body>
</html>
```

---

## **TEIL 3: package.json**

```json
{
  "name": "my-bot",
  "version": "1.0.0",
  "description": "Ein einfacher Bot mit Claude",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@anthropic-ai/sdk": "^0.16.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2"
  }
}
```

---

## **TEIL 4: System Prompt - Die Kunst**

Das Wichtigste! So schreibst du eine großartige System Prompt:

### **Struktur:**

```
1. WER DU BIST (Identität)
   - Name & Rolle
   - Charakter Traits
   - Besonderheiten

2. WIE DU SPRICHST (Tonalität)
   - Sprachstil
   - Vokabular
   - Längenvorgaben

3. WAS DU WEISST (Knowledge Base)
   - Fachbereich
   - Zeit/Epoche
   - Grenzen

4. WAS DU NICHT WEISST (Limitations)
   - Moderne Technologie
   - Zukünftige Events
   - Persönliche Daten

5. WIE DU REAGIERST (Behavior)
   - Auf Fragen
   - Auf Provokationen
   - Auf Grenzverletzungen

6. ZU VERMEIDEN (Absolutes No-Go)
   - "Ich bin ein KI"
   - Emojis/Slang
   - Belehrend wirken
```

### **Beispiel: Ein Philosophie-Bot**

```
Du bist Sokrates aus dem alten Griechenland.

DEINE PERSÖNLICHKEIT:
- Du magst nicht Wissen vorgeben, sondern Menschen zum Denken bringen
- Du stellst Fragen, die unbequem sind
- Du bist nachdenklich aber lebendig

WIE DU SPRICHST:
- Dialogisch: Du stellst Fragen statt zu erklären
- Mit Beispielen aus dem Alltag
- Etwas altertümlich, aber nicht unverständlich

WAS DU WEISST:
- Das antike Griechenland (bis ~399 v.Chr.)
- Philosophie, Ethik, Wahrheit
- Menschen, Tugend, das gute Leben

WAS DU NICHT WEISST:
- Alles was nach 399 v.Chr. passierte
- Moderne Technologie
- Wissenschaften die später entstanden

ZU VERMEIDEN:
- Lange Monologe
- Moderne Floskeln
- "Ich bin ein KI-Modell"
- Direkte Antworten (stelle stattdessen Fragen!)
```

---

## **TEIL 5: Zu Vercel Deployen**

```bash
# 1. Installiere Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Environment Variable setzen
# In Vercel Dashboard: Settings → Environment Variables
# ANTHROPIC_API_KEY = sk-...

# 5. Redeploy mit neuer Variable
vercel --prod

# 6. LIVE! 🎉
# https://my-bot.vercel.app
```

---

## **TEIL 6: Debugging & Tipps**

```javascript
// Beim Testen: Logs ausgeben
console.log('User Message:', message);
console.log('System Prompt loaded');
console.log('Response:', response);

// Fehlerbehandlung
try {
  // ...
} catch (error) {
  console.error('Detailed Error:', error);
  // Nicht den API Key loggen!
}

// IMMER diese Best Practices:
✅ API Key in .env
✅ Error Handling
✅ Input Validation
✅ Token Limits setzen (1024 ist gut)
✅ Max Timeout (z.B. 10 Sekunden)
❌ Niemals Secrets in Code
❌ Niemals Logs mit sensiblen Daten
```

---

## **TEIL 7: Character Ideen**

Hier sind BOT-Ideen die funktionieren:

1. **Historische Figur** (wie Kaspar)
   - Shakespeare
   - Cleopatra
   - Leonardo da Vinci

2. **Profession**
   - Chef / Gastronomie-Berater
   - Coach / Fitness-Trainer
   - Journalisten / Reporter

3. **Fiktive Charakter**
   - Sherlock Holmes (Detektiv)
   - Dumbledore (Mentor)
   - Yoda (Weise)

4. **Concept Bot**
   - Ein Buch das Fragen stellt
   - Ein Zeitgeist-Kommentator
   - Ein Muse / Kreativpartner

---

## **TEIL 8: Metrics die Zählen**

Nicht alle Metriken sind wichtig:

❌ **Falsch:**
- Anzahl Nachrichten
- Tagesaktive Nutzer
- Session Länge
- Click-Through Rate

✅ **Richtig:**
- "Hat der Bot mich überrascht?"
- "Habe ich was Neues gelernt?"
- "War das Gespräch echt?"
- "Gänsehaut-Momente"

---

## **TEIL 9: Von einem Character zu vielen**

```javascript
// Ein System Prompt pro Character
const BOTS = {
  sokrates: "Du bist Sokrates...",
  kaspar: "Du bist Kaspar Hauser...",
  sherlock: "Du bist Sherlock Holmes...",
};

// Request mit Character-Selector
app.post('/api/chat/:character', async (req, res) => {
  const character = req.params.character;
  const prompt = BOTS[character];
  // ...
});

// Frontend
fetch('/api/chat/kaspar', { ... })
```

---

## **DAS GEHEIMNIS ZUM ERFOLG**

```
System Prompt > Frontend Beauty > Technologie

Die beste UI nützt nichts, wenn der Bot dumm antwortet.
Aber eine großartige System Prompt macht einen schlichten Bot großartig.
```

---

**NÄCHSTE SCHRITTE:**

1. ✅ Diesen Guide lesen
2. ✅ System Prompt schreiben (das Wichtigste!)
3. ✅ Backend Code kopieren
4. ✅ Frontend HTML kopieren
5. ✅ Lokal testen: npm start
6. ✅ Zu Vercel deployen
7. ✅ Mit Freunden teilen
8. ✅ Iterations-Loop: Prompt verbessern → Deploy → Feedback

**Happy Bot Building! 🚀**
