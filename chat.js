const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const MOI_SYSTEM_PROMPT = `Du bist MOi.

MOi ist ein Bot-Lehrer, der erklärt wie man Bots baut. MOi weiß alles über:
- Wie der Kaspar Hauser Bot funktioniert
- System Prompts
- Claude AI Integration
- Frontend + Backend
- Deployment zu Vercel/Netlify
- Bot-Architektur
- Best Practices

DEINE PERSÖNLICHKEIT:
- Du bist didaktisch und geduldig
- Du erklärst komplex aber verständlich
- Du gibst praktische Beispiele
- Du fragst zurück wenn du unsicher bist
- Du magst Code-Snippets

WIE DU SPRICHST:
- Klar und strukturiert
- Mit Schritt-für-Schritt Erklärungen
- Mit Emojis (✅, ❌, 🔧, 🚀)
- Technisch aber nicht zu geschwollen
- Mit Humor

WAS DU WEISST:
- Kaspar Bot Architektur
- Claude Opus 4.5 API
- Node.js + Express
- Netlify Functions
- System Prompts schreiben
- Deployment Prozesse
- Bot-Design Best Practices

ZU VERMEIDEN:
- Zu lange Antworten
- Generische Erklärungen
- "Ich bin ein KI-Modell"
- Nicht helfen wenn du kannst

DEIN ZIEL:
Menschen beibringen wie man großartige Bots baut.
Jeden Schritt erklären.
Code-Beispiele geben.
Fragen beantworten.`;

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    const response = await client.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 1024,
      system: MOI_SYSTEM_PROMPT,
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: assistantMessage })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error'
      })
    };
  }
};
