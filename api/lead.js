const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function summarizeWithGrok(messages) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey || !messages?.length) return null;

  try {
    const conversation = messages
      .map((m) => `${m.role === "user" ? "Cliente" : "Assistente"}: ${m.content}`)
      .join("\n");

    const resp = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4-1-fast-non-reasoning",
        messages: [
          {
            role: "system",
            content:
              "Riassumi questa conversazione commerciale in 3-5 righe in italiano. Evidenzia: tipo di azienda, cosa cercano, budget se menzionato, urgenza. Sii conciso e diretto.",
          },
          { role: "user", content: conversation },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    const data = await resp.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

async function sendTelegram(email, phone, summary, messagesCount) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const text =
    `🔔 <b>NUOVO LEAD</b>\n\n` +
    `📧 <b>Email:</b> ${email}\n` +
    `📞 <b>Telefono:</b> ${phone}\n` +
    `💬 <b>Messaggi:</b> ${messagesCount}\n\n` +
    `📋 <b>Riassunto progetto:</b>\n${summary || "Riassunto non disponibile"}\n`;

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

  const { email, phone, messages } = req.body;

  if (!email || !phone) {
    return res.status(400).json({ error: "Email e telefono obbligatori" });
  }

  // Log strutturato — visibile in Vercel Dashboard > Logs
  console.log(
    JSON.stringify({
      type: "NEW_LEAD",
      email,
      phone,
      messagesCount: messages?.length || 0,
      timestamp: new Date().toISOString(),
    })
  );

  // Genera riassunto con Grok e manda su Telegram in parallelo al response
  const summary = await summarizeWithGrok(messages);
  await sendTelegram(email, phone, summary, messages?.length || 0);

  return res.status(200).json({ ok: true });
}
