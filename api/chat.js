import { chatCompletion } from "./_ai.js";

const SYSTEM_PROMPT = `Sei l'assistente di LandingBot, un servizio che costruisce gestionali su misura in sole due settimane.

Il tuo obiettivo è aiutare l'utente a strutturare il gestionale ideale per la sua azienda, facendo domande guidate. Fai UNA domanda alla volta, in questo ordine:

1. Che tipo di azienda gestisce e qual è il suo settore? (prima domanda — sempre questa)
2. Quali sono le funzionalità più importanti che deve avere il gestionale? (es: clienti, ordini, fatture, magazzino, report)
3. Quanti utenti useranno il gestionale?
4. Ci sono integrazioni con altri software che usa già? (es: Excel, gestionale attuale, e-commerce, contabilità)
5. Ha un budget orientativo in mente per questo progetto?

REGOLE:
- Parla sempre in italiano semplice e diretto, mai formale
- Sii amichevole e concreto — dai esempi pratici
- Dopo 4-5 scambi ringrazia e di' che il team li ricontatterà con una proposta entro 24h (usa la parola "ricontatter")
- Quando fai una domanda con risposte tipiche, aggiungi SEMPRE in fondo una riga con i suggerimenti in questo formato esatto:
  [SUGGERIMENTI: opzione1 | opzione2 | opzione3]

Esempi di suggerimenti da usare:
- Tipo azienda: [SUGGERIMENTI: Artigianale / Manifatturiera | Commercio / Retail | Servizi / Consulenza | Edilizia / Impianti | Altro]
- Funzionalità: [SUGGERIMENTI: Gestione clienti (CRM) | Fatturazione e ordini | Magazzino e inventario | Report e dashboard | Prenotazioni / Agenda]
- Utenti: [SUGGERIMENTI: Solo io (1 utente) | 2–5 utenti | 6–20 utenti | Più di 20 utenti]
- Integrazioni: [SUGGERIMENTI: Nessuna — parto da zero | Excel e file Office | Gestionale esistente | E-commerce (Shopify / WooCommerce) | Software contabilità]
- Budget: [SUGGERIMENTI: Meno di 3.000€ | 3.000€ – 8.000€ | 8.000€ – 20.000€ | Oltre 20.000€]`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "XAI_API_KEY not configured" });
  }

  try {
    const response = await chatCompletion(apiKey, {
      model: "grok-4-1-fast-non-reasoning",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("xAI API error:", response.status, errorText);
      return res.status(502).json({ error: "AI provider error" });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "Errore. Riprova tra poco.";
    return res.status(200).json({ content: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
