const SYSTEM_PROMPT = `Sei l'assistente commerciale di Thinking Studio, un'agenzia tech che sviluppa soluzioni SaaS, ERP leggeri e automazioni per micro e piccole imprese italiane (fino a €5M di fatturato). Il tuo obiettivo è fare 4-6 domande per capire:
1. Che tipo di azienda è (settore, dimensione, fatturato indicativo)
2. Quali strumenti/software usano attualmente
3. Quali problemi hanno nella gestione dati / processi
4. Che budget indicativo hanno in mente
5. Quali integrazioni servirebbero.
Sii diretto, amichevole e chiaro. Parla sempre in italiano semplice, senza inglesismi. Fai UNA domanda alla volta. Quando hai raccolto abbastanza info (dopo 4-6 scambi), ringrazia e di' che il team li ricontatterà entro 24h.`;

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
