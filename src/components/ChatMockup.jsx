import { useState, useEffect, useRef } from "react";
import { createConversation, updateConversation, saveLeadContact } from "../lib/firebase";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Ciao! Sono l'assistente di Thinking Studio. Raccontaci il tuo progetto — ti faccio qualche domanda per capire come aiutarti.",
};

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "3px solid #000",
  padding: "10px 12px",
  color: "#000",
  fontSize: 13,
  fontFamily: "'DM Sans',sans-serif",
  fontWeight: 500,
  outline: "none",
};

function parseSuggestions(text) {
  const match = text.match(/\[SUGGERIMENTI:\s*([^\]]+)\]/);
  if (!match) return { clean: text, suggestions: [] };
  const suggestions = match[1].split("|").map((s) => s.trim()).filter(Boolean);
  const clean = text.replace(/\[SUGGERIMENTI:[^\]]+\]/, "").trim();
  return { clean, suggestions };
}

export default function ChatMockup() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [convId, setConvId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, finished]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setSuggestions([]);
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await resp.json();
      const raw = data.content || "Errore. Riprova tra poco.";
      const { clean, suggestions: newSuggestions } = parseSuggestions(raw);
      const withReply = [...updated, { role: "assistant", content: clean }];

      setMessages(withReply);
      setSuggestions(newSuggestions);

      const isDone = clean.includes("ricontatter") || updated.length > 12;
      if (isDone) { setFinished(true); setSuggestions([]); }

      // Firebase in background — non blocca la chat
      (async () => {
        try {
          let currentConvId = convId;
          if (!currentConvId) {
            currentConvId = await createConversation(updated);
            setConvId(currentConvId);
          }
          await updateConversation(
            currentConvId,
            withReply,
            isDone ? "completed" : "active"
          );
        } catch {
          // Firebase non critico
        }
      })();
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Errore di connessione. Riprova." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitLead = async () => {
    if (!email.trim() || !phone.trim()) return;
    setLeadLoading(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      // Salva email + telefono su Firebase
      await saveLeadContact(convId, email.trim(), phone.trim());
    } catch {
      // Il lead è già loggato server-side, non blocchiamo l'UX
    }

    setLeadSent(true);
    setLeadLoading(false);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        border: "4px solid #000",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        height: 460,
        position: "relative",
        boxShadow: "12px 12px 0 #000",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "4px solid #000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#FF2D00",
        }}
      >
        <span
          className="sans"
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00FF57",
              display: "inline-block",
            }}
          />
          Parlaci del tuo progetto
        </span>
        <span
          className="sans"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}
        >
          THINKING STUDIO
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "#FFFEF2",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "10px 14px",
              background: m.role === "user" ? "#000" : "#fff",
              color: m.role === "user" ? "#fff" : "#000",
              fontSize: 13,
              lineHeight: 1.6,
              fontFamily: "'DM Sans',sans-serif",
              border: m.role === "user" ? "none" : "2px solid #000",
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div
            className="sans"
            style={{ fontSize: 13, color: "#FF2D00", fontWeight: 700 }}
          >
            Sto elaborando...
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && !finished && (
        <div style={{
          padding: "6px 10px 2px",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          borderTop: "2px solid #000",
          background: "#FFFEF2",
        }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(s);
                setSuggestions([]);
                setTimeout(() => {
                  setInput("");
                  const userMsg = { role: "user", content: s };
                  const updated = [...messages, userMsg];
                  setMessages(updated);
                  setSuggestions([]);
                  setLoading(true);
                  fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: updated.map((m) => ({ role: m.role, content: m.content })) }),
                  })
                    .then((r) => r.json())
                    .then((data) => {
                      const raw = data.content || "Errore. Riprova tra poco.";
                      const { clean, suggestions: newS } = parseSuggestions(raw);
                      const withReply = [...updated, { role: "assistant", content: clean }];
                      setMessages(withReply);
                      setSuggestions(newS);
                      const isDone = clean.includes("ricontatter") || updated.length > 12;
                      if (isDone) { setFinished(true); setSuggestions([]); }
                      (async () => {
                        try {
                          let cid = convId;
                          if (!cid) { cid = await createConversation(updated); setConvId(cid); }
                          await updateConversation(cid, withReply, isDone ? "completed" : "active");
                        } catch {}
                      })();
                    })
                    .catch(() => setMessages((prev) => [...prev, { role: "assistant", content: "Errore di connessione. Riprova." }]))
                    .finally(() => setLoading(false));
                }, 0);
              }}
              style={{
                background: "#fff",
                border: "2px solid #000",
                padding: "4px 10px",
                fontSize: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                color: "#000",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { e.target.style.background = "#FF2D00"; e.target.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.target.style.background = "#fff"; e.target.style.color = "#000"; }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Bottom area */}
      <div style={{ padding: 10, borderTop: "4px solid #000" }}>
        {leadSent ? (
          /* Conferma finale */
          <div
            className="sans"
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 13,
              padding: 10,
              background: "#00FF57",
              color: "#000",
            }}
          >
            Perfetto! Ti ricontattiamo entro 24 ore.
          </div>
        ) : finished ? (
          /* Form raccolta contatti */
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              className="sans"
              style={{ fontSize: 12, fontWeight: 700, color: "#FF2D00", marginBottom: 2 }}
            >
              Lasciaci i tuoi contatti per essere richiamato:
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              style={inputStyle}
            />
            <div style={{ display: "flex", gap: 0 }}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitLead()}
                placeholder="Il tuo numero di telefono"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                onClick={submitLead}
                disabled={leadLoading || !email.trim() || !phone.trim()}
                style={{
                  background: "#FF2D00",
                  border: "3px solid #000",
                  borderLeft: "none",
                  padding: "10px 16px",
                  color: "#fff",
                  fontWeight: 900,
                  cursor:
                    leadLoading || !email.trim() || !phone.trim()
                      ? "not-allowed"
                      : "pointer",
                  fontSize: 13,
                  fontFamily: "'DM Sans',sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {leadLoading ? "..." : "Invia"}
              </button>
            </div>
          </div>
        ) : (
          /* Input chat normale */
          <div style={{ display: "flex", gap: 0 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Scrivi qui..."
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: "#000",
                border: "3px solid #000",
                borderLeft: "none",
                padding: "10px 16px",
                color: "#fff",
                fontWeight: 900,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontSize: 16,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
