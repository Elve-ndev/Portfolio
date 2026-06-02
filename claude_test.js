// Test simple pour Claude via API Anthropic
// Usage: set ANTHROPIC_API_KEY puis `node claude_test.js`

const API_KEY = process.env.ANTRHOPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Erreur: définissez la variable d\'environnement ANTHROPIC_API_KEY');
  process.exit(1);
}

const fetch = global.fetch || require('node-fetch');

const url = 'https://api.anthropic.com/v1/complete';

const body = {
  model: 'claude-2.1', // adaptez selon le modèle disponible
  prompt: 'You are a helpful assistant. Réponds simplement: "ok"',
  max_tokens: 100,
  temperature: 0.2
};

(async () => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log('Réponse API:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Erreur requête:', err);
  }
})();
