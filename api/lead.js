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
      messages: messages || [],
      timestamp: new Date().toISOString(),
    })
  );

  return res.status(200).json({ ok: true });
}
