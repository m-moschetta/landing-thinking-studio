import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const SYSTEM_PROMPT = `Sei l'assistente commerciale di Thinking Studio, un'agenzia tech che sviluppa soluzioni SaaS, ERP leggeri e automazioni per micro e piccole imprese italiane (fino a €5M di fatturato). Il tuo obiettivo è fare 4-6 domande per capire:
1. Che tipo di azienda è (settore, dimensione, fatturato indicativo)
2. Quali strumenti/software usano attualmente
3. Quali problemi hanno nella gestione dati / processi
4. Che budget indicativo hanno in mente
5. Quali integrazioni servirebbero.
Sii diretto, amichevole e chiaro. Parla sempre in italiano semplice, senza inglesismi. Fai UNA domanda alla volta. Quando hai raccolto abbastanza info (dopo 4-6 scambi), ringrazia e di' che il team li ricontatterà entro 24h.`;

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function localApiPlugin(xaiApiKey) {
  return {
    name: "local-api-chat",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/api/chat") {
          return next();
        }

        if (req.method !== "POST") {
          return json(res, 405, { error: "Method not allowed" });
        }

        try {
          const raw = await readBody(req);
          const parsed = raw ? JSON.parse(raw) : {};
          const { messages } = parsed;

          if (!Array.isArray(messages)) {
            return json(res, 400, { error: "Invalid messages format" });
          }

          const apiKey = xaiApiKey;
          if (!apiKey) {
            return json(res, 500, {
              error:
                "XAI_API_KEY non configurata. Aggiungila in .env.local per usare la chat in locale.",
            });
          }

          const response = await fetch("https://api.x.ai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "grok-4-1-fast-non-reasoning",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              max_tokens: 1000,
              temperature: 0.7,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            return json(res, 502, {
              error: "AI provider error",
              detail: errorText.slice(0, 500),
            });
          }

          const data = await response.json();
          const text =
            data.choices?.[0]?.message?.content || "Errore. Riprova tra poco.";
          return json(res, 200, { content: text });
        } catch (error) {
          return json(res, 500, {
            error: "Internal server error",
            detail: error instanceof Error ? error.message : "Unknown error",
          });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), localApiPlugin(env.XAI_API_KEY)],
  };
});
