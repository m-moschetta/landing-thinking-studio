import { useState, useEffect, useRef } from "react";
import { createConversation, updateConversation } from "../lib/firebase";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Ciao! Sono l'assistente di Thinking Studio. Raccontaci il tuo progetto — ti faccio qualche domanda per capire come aiutarti.",
};

export default function ChatMockup() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [convId, setConvId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    // Crea conversazione su Firebase al primo messaggio utente
    let currentConvId = convId;
    if (!currentConvId) {
      currentConvId = await createConversation(updated);
      setConvId(currentConvId);
    }

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await resp.json();
      const text = data.content || "Errore. Riprova tra poco.";
      const withReply = [...updated, { role: "assistant", content: text }];

      setMessages(withReply);

      // Salva su Firebase
      const isDone = text.includes("ricontatter") || updated.length > 12;
      await updateConversation(
        currentConvId,
        withReply,
        isDone ? "completed" : "active"
      );

      if (isDone) setFinished(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Errore di connessione. Riprova." },
      ]);
    }

    setLoading(false);
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
      {/* Title bar — simula device */}
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
            style={{
              fontSize: 13,
              color: "#FF2D00",
              fontWeight: 700,
            }}
          >
            Sto elaborando...
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: 10, borderTop: "4px solid #000" }}>
        {finished ? (
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
            Ricevuto. Ti ricontattiamo entro 24 ore.
          </div>
        ) : (
          <div style={{ display: "flex", gap: 0 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Scrivi qui..."
              style={{
                flex: 1,
                background: "#fff",
                border: "3px solid #000",
                padding: "10px 12px",
                color: "#000",
                fontSize: 13,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 500,
                outline: "none",
              }}
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
