const SYSTEM_PROMPT = `Sei l'assistente commerciale di Thinking Studio, un'agenzia tech che aiuta piccole imprese italiane a risolvere problemi concreti con strumenti digitali su misura.

Il tuo obiettivo è capire il contesto del cliente con 4-5 domande semplici. Fai UNA domanda alla volta, in questo ordine:
1. Qual è il problema principale che vuoi risolvere, o quale opportunità vuoi cogliere? (prima domanda — sempre questa)
2. Qual è il fatturato annuo della tua azienda?
3. Che strumenti o software usi già per gestire il lavoro?
4. Hai un'idea di budget per questo progetto?
5. C'è una scadenza o urgenza particolare?

REGOLE:
- Parla sempre in italiano semplice, senza inglesismi
- Sii diretto e amichevole, mai formale
- Dopo 4-5 scambi ringrazia e di' che il team li ricontatterà entro 24h (usa la parola "ricontatter")
- Quando fai una domanda con risposte tipiche, aggiungi SEMPRE in fondo al messaggio una riga con i suggerimenti in questo formato esatto:
  [SUGGERIMENTI: opzione1 | opzione2 | opzione3]

Esempi di suggerimenti da usare:
- Problema/opportunità: [SUGGERIMENTI: Automatizzare processi manuali | Gestire meglio i dati | Sostituire Excel/fogli | Integrare sistemi che non si parlano | Vendere online]
- Fatturato: [SUGGERIMENTI: Meno di 300k | 300k – 1M | 1M – 3M | Oltre 3M]
- Budget: [SUGGERIMENTI: Meno di 3k | 3k – 10k | 10k – 25k | Oltre 25k]
- Urgenza: [SUGGERIMENTI: Il prima possibile | Entro 3 mesi | Non c'è fretta]
- Strumenti: [SUGGERIMENTI: Solo Excel/carta | Software gestionale | CRM | Nessuno strumento]`;

import { chatCompletion } from "./_ai.js";

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
    const text =
      data.choices?.[0]?.message?.content || "Errore. Riprova tra poco.";

    return res.status(200).json({ content: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
