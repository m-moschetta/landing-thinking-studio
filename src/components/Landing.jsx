import { useState, useEffect } from "react";
import ChatGuided from "./ChatGuided";

const CAL_LINK = "https://fantastical.app/mario-moschetta/thinking-intro-meeting";

export default function Landing() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const steps = [
    { n: "001", t: "CHATTA", d: "Parla con la nostra AI: ti aiuta a strutturare la soluzione perfetta." },
    { n: "002", t: "ANALISI", d: "Analizziamo le tue esigenze e progettiamo la soluzione ideale." },
    { n: "003", t: "PROPOSTA", d: "Ricevi una proposta dettagliata e un preventivo entro 24 ore." },
    { n: "004", t: "CONSEGNA", d: "Il tuo gestionale è pronto in due settimane, testato e funzionante." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:#FFFEF2;color:#1a1a1a;overflow-x:hidden}
        ::selection{background:#FF2D00;color:#fff}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes skewIn{from{opacity:0;transform:skewY(2deg) translateY(20px)}to{opacity:1;transform:skewY(0) translateY(0)}}

        .sans{font-family:'DM Sans',sans-serif}
        .display{font-family:'Playfair Display',Georgia,serif}

        .brutal-btn{background:#000;color:#FFFEF2;border:3px solid #000;padding:16px 32px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.15s;position:relative}
        .brutal-btn:hover{background:#FF2D00;border-color:#FF2D00;transform:translate(-3px,-3px);box-shadow:6px 6px 0 #000}
        .brutal-btn:active{transform:translate(0,0);box-shadow:none}

        .brutal-btn-outline{background:transparent;color:#1a1a1a;border:3px solid #000;padding:16px 32px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.15s}
        .brutal-btn-outline:hover{background:#000;color:#FFFEF2;transform:translate(-3px,-3px);box-shadow:6px 6px 0 #FF2D00}

        .marquee-track{display:flex;width:max-content;animation:marquee 22s linear infinite}

        @media(max-width:768px){
          .hero-big{font-size:42px!important}
          .grid-2{grid-template-columns:1fr!important}
          .grid-4{grid-template-columns:1fr 1fr!important}
          .hero-flex{flex-direction:column!important;align-items:flex-start!important}
          .nav-inner{padding:12px 16px!important}
          .cta-layout{flex-direction:column!important;align-items:stretch!important}
          .cta-chat-wrap{margin-top:40px!important;width:100%!important}
          .stat-grid{grid-template-columns:1fr 1fr!important}
          .steps-layout{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* TICKER */}
      <div style={{ background: "#000", color: "#FFFEF2", overflow: "hidden", borderBottom: "3px solid #000" }}>
        <div className="marquee-track" style={{ padding: "10px 0" }}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className="sans" style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, whiteSpace: "nowrap", paddingRight: 60 }}>
              THINKING STUDIO — Il tuo gestionale su misura in 2 settimane — Milano, Italia — {time.toLocaleTimeString("it-IT")} —{" "}
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{ borderBottom: "3px solid #000", position: "sticky", top: 0, zIndex: 100, background: "#FFFEF2" }}>
        <div className="nav-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className="sans" style={{ fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>THINKING</span>
            <span className="display" style={{ fontSize: 22, fontStyle: "italic", color: "#FF2D00" }}>Studio</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href="#chat" className="brutal-btn-outline" style={{ padding: "10px 20px", fontSize: 13 }}>
              Parla con noi
            </a>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ padding: "10px 20px", fontSize: 13 }}>
              Prenota una demo
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 32px 60px", borderBottom: "3px solid #000" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 24, animation: "slideUp 0.4s ease-out" }}>
            [ Benvenuto su Thinking Studio ]
          </div>
          <h1
            className="hero-big"
            style={{
              fontSize: 72,
              fontFamily: "'Playfair Display',Georgia,serif",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: 40,
              maxWidth: 900,
              animation: "slideUp 0.6s ease-out",
            }}
          >
            Il tuo gestionale
            <br />
            perfetto.
            <br />
            <span
              style={{
                fontStyle: "italic",
                color: "#FF2D00",
                textDecoration: "underline",
                textDecorationThickness: 4,
                textUnderlineOffset: 8,
              }}
            >
              In sole due settimane.
            </span>
          </h1>
          <div className="hero-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
            <p
              className="sans"
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 520,
                color: "#555",
                animation: "slideUp 0.6s ease-out 0.2s both",
              }}
            >
              Ti consegniamo il gestionale che vuoi, personalizzato secondo le tue esigenze.
              <br />
              Parla con la nostra chat guidata per ricevere{" "}
              <strong style={{ color: "#1a1a1a" }}>una proposta personalizzata in 24 ore.</strong>
            </p>
            <div style={{ display: "flex", gap: 12, animation: "slideUp 0.6s ease-out 0.3s both", flexShrink: 0, flexWrap: "wrap" }}>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn">
                Prenota una demo &uarr;
              </a>
              <a href="#chat" className="brutal-btn-outline">
                Inizia ora &darr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "3px solid #000" }}>
        {[
          { n: "2", l: "settimane di sviluppo" },
          { n: "100%", l: "personalizzato" },
          { n: "24h", l: "per ricontattarti" },
          { n: "∞", l: "funzionalità possibili" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "28px 24px", textAlign: "center", borderRight: i < 3 ? "3px solid #000" : "none" }}>
            <div className="display" style={{ fontSize: 36, fontStyle: "italic", color: "#FF2D00" }}>{s.n}</div>
            <div className="sans" style={{ fontSize: 13, marginTop: 6, color: "#666" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* COME FUNZIONA */}
      <section style={{ borderBottom: "3px solid #000" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: 400 }}>
          <div style={{ background: "#000", color: "#FFFEF2", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "3px solid #000" }}>
            <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 16 }}>[ Come funziona ]</div>
            <h2 className="display" style={{ fontSize: 40, fontStyle: "italic", lineHeight: 1.1 }}>
              Da idea a gestionale operativo.
            </h2>
            <p className="sans" style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7, marginTop: 20 }}>
              Quattro passaggi. Niente riunioni infinite. Ti accompagniamo dall'idea alla consegna.
            </p>
          </div>
          <div>
            {steps.map((s, i) => (
              <div key={i} style={{ padding: "28px 32px", borderBottom: i < 3 ? "3px solid #000" : "none", display: "flex", alignItems: "baseline", gap: 20, animation: `skewIn 0.5s ease-out ${i * 0.1}s both` }}>
                <span className="sans" style={{ fontSize: 12, color: "#FF2D00", fontWeight: 700, flexShrink: 0 }}>{s.n}</span>
                <div>
                  <div className="sans" style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{s.t}</div>
                  <div className="sans" style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COSA INCLUDE */}
      <section style={{ borderBottom: "3px solid #000", background: "#FFFEF2" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0 }}>
          {/* Colonna sinistra */}
          <div style={{ padding: "60px 40px", borderRight: "3px solid #000" }}>
            <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 16 }}>[ Il tuo gestionale ]</div>
            <h2 className="display" style={{ fontSize: 48, fontStyle: "italic", lineHeight: 1.05, marginBottom: 24 }}>
              Esattamente
              <br />
              quello che
              <br />
              <span style={{ color: "#FF2D00" }}>vuoi tu.</span>
            </h2>
            <p className="sans" style={{ fontSize: 15, lineHeight: 1.85, color: "#555", maxWidth: 420, marginBottom: 32 }}>
              Non un gestionale generico. Non un abbonamento mensile. <strong style={{ color: "#1a1a1a" }}>Il tuo gestionale</strong>, costruito attorno ai tuoi processi, consegnato in due settimane.
            </p>
            {[
              "Gestione clienti, ordini, fatture — tutto in un posto",
              "Dashboard personalizzata con i numeri che contano per te",
              "Notifiche automatiche e flussi di lavoro su misura",
              "Integrazioni con i tuoi strumenti esistenti",
            ].map((ex, i) => (
              <div key={i} className="sans" style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, color: "#333", marginBottom: 12 }}>
                <span style={{ width: 20, height: 20, background: "#000", color: "#FFFEF2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0, marginTop: 2 }}>→</span>
                {ex}
              </div>
            ))}
          </div>

          {/* Colonna destra — scheda offerta */}
          <div style={{ padding: "60px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ border: "3px solid #000", background: "#000", color: "#FFFEF2", padding: "40px 36px" }}>
              <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 24 }}>COSA INCLUDE</div>
              {[
                { label: "SVILUPPO", val: "Gestionale su misura" },
                { label: "TEMPI", val: "2 settimane garantite" },
                { label: "AGGIORNAMENTI", val: "Ad ogni step del progetto" },
                { label: "PROPRIETÀ", val: "Tuo per sempre" },
                { label: "ASSISTENZA", val: "Post-consegna inclusa" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 18, marginBottom: 18, borderBottom: i < 4 ? "1px solid #333" : "none" }}>
                  <span className="sans" style={{ fontSize: 11, letterSpacing: 1.5, color: "#888", fontWeight: 700 }}>{row.label}</span>
                  <span className="sans" style={{ fontSize: 14, fontWeight: 600, color: "#FFFEF2" }}>{row.val}</span>
                </div>
              ))}
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ marginTop: 24, display: "block", textAlign: "center", background: "#FF2D00", borderColor: "#FF2D00", fontSize: 14, padding: "14px 24px" }}>
                Prenota una demo &uarr;
              </a>
            </div>
            <p className="sans" style={{ fontSize: 12, color: "#aaa", marginTop: 16, lineHeight: 1.6 }}>
              Parla con la nostra chat per descrivere le funzionalità che vuoi — riceverai una proposta entro 24 ore.
            </p>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <div style={{ background: "#FF2D00", padding: "20px 32px", borderBottom: "3px solid #000", textAlign: "center" }}>
        <span className="sans" style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>
          Nessuna sorpresa, massima trasparenza — ti aggiorniamo ad ogni passo del processo.
        </span>
      </div>

      {/* CHAT */}
      <section id="chat" style={{ padding: "80px 32px", borderBottom: "3px solid #000", background: "#FFFEF2" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 20 }}>
            [ Inizia da qui ]
          </div>
          <h2 className="display" style={{ fontSize: 52, fontStyle: "italic", lineHeight: 1.05, marginBottom: 16 }}>
            Descrivi il tuo
            <br />
            <span style={{ color: "#FF2D00" }}>gestionale ideale.</span>
          </h2>
          <p className="sans" style={{ fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 40, maxWidth: 600 }}>
            Parla con la nostra chat guidata: ti aiuterà a strutturare il gestionale perfetto per le tue esigenze.{" "}
            <strong style={{ color: "#1a1a1a" }}>Riceverai una proposta personalizzata entro 24 ore.</strong>
          </p>
          <ChatGuided />
        </div>
      </section>

      {/* DEMO CTA */}
      <section style={{ background: "#000", color: "#FFFEF2", borderBottom: "3px solid #000", padding: "60px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 16 }}>[ Demo dal vivo ]</div>
            <h2 className="display" style={{ fontSize: 44, fontStyle: "italic", lineHeight: 1.1, marginBottom: 16 }}>
              Vuoi vedere
              <br />
              un esempio concreto?
            </h2>
            <p className="sans" style={{ fontSize: 15, color: "#aaa", lineHeight: 1.7, maxWidth: 440 }}>
              Prenota una demo gratuita di 30 minuti. Ti mostriamo gestionali simili già costruiti e capiamo insieme cosa fa al caso tuo.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ background: "#FF2D00", borderColor: "#FF2D00", fontSize: 16, padding: "18px 36px", textAlign: "center" }}>
              Prenota una demo gratuita &uarr;
            </a>
            <a href="#chat" className="brutal-btn-outline" style={{ color: "#FFFEF2", borderColor: "#FFFEF2", fontSize: 14, padding: "14px 28px", textAlign: "center" }}>
              Parla con la chat &darr;
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span className="sans" style={{ fontWeight: 700, fontSize: 14 }}>THINKING</span>
          <span className="display" style={{ fontSize: 16, fontStyle: "italic", color: "#FF2D00" }}>Studio</span>
        </div>
        <span className="sans" style={{ fontSize: 12, color: "#aaa" }}>&copy; 2026 — Milano, Italia</span>
      </footer>
    </>
  );
}
