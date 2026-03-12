import { chatCompletion } from "./_ai.js";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function summarizeWithGrok(messages) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey || !messages?.length) return null;

  try {
    const conversation = messages
      .map((m) => `${m.role === "user" ? "Cliente" : "Assistente"}: ${m.content}`)
      .join("\n");

    const resp = await chatCompletion(apiKey, {
      model: "grok-4-1-fast-non-reasoning",
      messages: [
        {
          role: "system",
          content:
            "Riassumi questa conversazione in 3-5 righe in italiano. Evidenzia: tipo di azienda, funzionalità richieste per il gestionale, numero utenti, integrazioni necessarie, budget se menzionato. Sii conciso.",
        },
        { role: "user", content: conversation },
      ],
      max_tokens: 300,
      temperature: 0.3,
    });

    const data = await resp.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

async function sendTelegram(data) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  let text = `🤖 <b>NUOVO LEAD — LANDINGBOT</b>\n\n`;

  if (data.source === "form") {
    text +=
      `📝 <b>Da: Modulo</b>\n\n` +
      `👤 <b>Nome:</b> ${data.nome || "—"}\n` +
      `📧 <b>Email:</b> ${data.email}\n` +
      `📞 <b>Telefono:</b> ${data.telefono}\n` +
      `🏢 <b>Azienda:</b> ${data.azienda || "—"}\n` +
      `👥 <b>Utenti stimati:</b> ${data.utenti || "—"}\n\n` +
      `📋 <b>Funzionalità richieste:</b>\n${data.funzionalita}\n`;
  } else {
    text +=
      `💬 <b>Da: Chat guidata</b>\n\n` +
      `📧 <b>Email:</b> ${data.email}\n` +
      `📞 <b>Telefono:</b> ${data.phone}\n` +
      `💬 <b>Messaggi chat:</b> ${data.messagesCount}\n\n` +
      `📋 <b>Riassunto conversazione:</b>\n${data.summary || "Non disponibile"}\n`;
  }

  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );
  } catch (err) {
    console.error("Telegram send error:", err);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;
  const source = body.source || "chat";

  // Log strutturato — visibile in Vercel Dashboard > Logs
  console.log(
    JSON.stringify({
      type: "NEW_LEAD",
      source,
      email: body.email,
      phone: body.telefono || body.phone,
      nome: body.nome,
      timestamp: new Date().toISOString(),
    })
  );

  if (source === "form") {
    // Lead da modulo
    if (!body.email || !body.telefono) {
      return res.status(400).json({ error: "Email e telefono obbligatori" });
    }
    await sendTelegram({ ...body, source: "form" });
  } else {
    // Lead da chat
    const { email, phone, messages } = body;
    if (!email || !phone) {
      return res.status(400).json({ error: "Email e telefono obbligatori" });
    }
    const summary = await summarizeWithGrok(messages);
    await sendTelegram({ email, phone, summary, messagesCount: messages?.length || 0, source: "chat" });
  }

  return res.status(200).json({ ok: true });
}
