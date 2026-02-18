import { useState, useEffect } from "react";
import ChatMockup from "./ChatMockup";

const CAL_LINK = "https://fantastical.app/mario-moschetta/thinking-intro-meeting";

export default function Landing() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const features = [
    {
      title: "INTEGRAZIONE",
      desc: "Colleghiamo i tuoi programmi. Fatture, gestionale, Excel, e-commerce. Tutto parla con tutto.",
    },
    {
      title: "AUTOMAZIONE",
      desc: "Basta copia-incolla. I dati si muovono da soli, senza errori, senza perdite di tempo.",
    },
    {
      title: "100% SU MISURA",
      desc: "Niente programmi generici. Costruiamo esattamente quello che ti serve, niente di più.",
    },
    {
      title: "VELOCE E ACCESSIBILE",
      desc: "Pronto in settimane. Costa come un dipendente part-time, lavora come un reparto intero.",
    },
  ];

  const steps = [
    { n: "001", t: "ASCOLTO", d: "Ci racconti come lavori. Noi ascoltiamo e capiamo." },
    { n: "002", t: "PROGETTO", d: "Disegniamo la soluzione su misura per te." },
    { n: "003", t: "SVILUPPO", d: "Costruiamo. In settimane, non mesi." },
    { n: "004", t: "CONSEGNA", d: "Vai operativo. Ti affianchiamo anche dopo." },
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

        .feature-card{border:3px solid #000;padding:32px;transition:all 0.15s;cursor:default;background:#FFFEF2}
        .feature-card:hover{background:#000;color:#FFFEF2;transform:translate(-4px,-4px);box-shadow:8px 8px 0 #FF2D00}

        .marquee-track{display:flex;width:max-content;animation:marquee 22s linear infinite}

        @media(max-width:768px){
          .hero-big{font-size:42px!important}
          .grid-2{grid-template-columns:1fr!important}
          .grid-4{grid-template-columns:1fr 1fr!important}
          .hero-flex{flex-direction:column!important;align-items:flex-start!important}
          .hero-layout{flex-direction:column!important;align-items:flex-start!important}
          .nav-inner{padding:12px 16px!important}
          .cta-layout{flex-direction:column!important;align-items:stretch!important}
          .cta-chat-wrap{margin-top:40px!important}
          .stat-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {/* TICKER */}
      <div style={{ background: "#000", color: "#FFFEF2", overflow: "hidden", borderBottom: "3px solid #000" }}>
        <div className="marquee-track" style={{ padding: "10px 0" }}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className="sans" style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, whiteSpace: "nowrap", paddingRight: 60 }}>
              THINKING STUDIO — Soluzioni digitali su misura per PMI — Milano, Italia — {time.toLocaleTimeString("it-IT")} —{" "}
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{ borderBottom: "3px solid #000", position: "sticky", top: 0, zIndex: 100, background: "#FFFEF2" }}>
        <div className="nav-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="sans" style={{ fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>THINKING</span>
            <span className="display" style={{ fontSize: 22, fontStyle: "italic", color: "#FF2D00" }}>Studio</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="sans" style={{ fontSize: 12, color: "#999", marginRight: 12 }}>Dal 2026</span>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ padding: "10px 20px", fontSize: 13 }}>
              Prenota una chiamata
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 32px 60px", borderBottom: "3px solid #000" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 32 }}>
            [ Per aziende che fatturano fino a &euro;5M ]
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
            Il tuo business
            <br />
            merita software
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
              che funziona davvero.
            </span>
          </h1>
          <div className="hero-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
            <p
              className="sans"
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 500,
                color: "#555",
                animation: "slideUp 0.6s ease-out 0.2s both",
              }}
            >
              Sviluppiamo soluzioni digitali su misura per la tua impresa.
              <br />
              Integriamo i tuoi dati, automatizziamo i tuoi processi.
              <br />
              <strong style={{ color: "#1a1a1a" }}>Veloce. Accessibile. Senza giri di parole.</strong>
            </p>
            <div style={{ display: "flex", gap: 12, animation: "slideUp 0.6s ease-out 0.3s both", flexShrink: 0, flexWrap: "wrap" }}>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn">
                Prenota una chiamata &uarr;
              </a>
              <a href="#parlaci" className="brutal-btn-outline">
                Raccontaci il progetto &darr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMI */}
      <section style={{ borderBottom: "3px solid #000" }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: 400 }} className="grid-2">
          <div style={{ background: "#000", color: "#FFFEF2", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "3px solid #000" }}>
            <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 16 }}>[ Il problema ]</div>
            <h2 className="display" style={{ fontSize: 40, fontStyle: "italic", lineHeight: 1.1 }}>Ti riconosci in una di queste?</h2>
          </div>
          <div>
            {[
              "Copi dati a mano tra Excel e diversi programmi ogni giorno.",
              "Non hai mai i numeri aggiornati quando ti servono davvero.",
              "Collegare i tuoi strumenti è complicato e costa troppo.",
              "I gestionali delle grandi aziende sono sovradimensionati e fuori budget.",
            ].map((p, i) => (
              <div key={i} style={{ padding: "24px 32px", borderBottom: i < 3 ? "3px solid #000" : "none", display: "flex", alignItems: "center", gap: 20, animation: `skewIn 0.5s ease-out ${i * 0.1}s both` }}>
                <span className="display" style={{ fontSize: 32, fontWeight: 700, color: "#FF2D00", flexShrink: 0, fontStyle: "italic" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="sans" style={{ fontSize: 16, lineHeight: 1.6 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER ROSSO */}
      <div style={{ background: "#FF2D00", padding: "20px 32px", borderBottom: "3px solid #000", textAlign: "center" }}>
        <span className="sans" style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>
          Se hai risposto sì anche solo a una &rarr; possiamo aiutarti.
        </span>
      </div>

      {/* COSA FACCIAMO */}
      <section style={{ padding: "80px 32px", borderBottom: "3px solid #000" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 12 }}>[ Cosa facciamo ]</div>
              <h2 className="display" style={{ fontSize: 48, fontStyle: "italic", lineHeight: 1.05 }}>
                Software che
                <br />
                lavora <span style={{ textDecoration: "line-through" }}>per</span> con te.
              </h2>
            </div>
          </div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ borderRight: i < 3 ? "none" : undefined, animation: `skewIn 0.5s ease-out ${i * 0.1}s both` }}>
                <div className="display" style={{ fontSize: 40, fontWeight: 700, marginBottom: 16, lineHeight: 1, fontStyle: "italic", color: "#FF2D00" }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <h3 className="sans" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p className="sans" style={{ fontSize: 14, lineHeight: 1.7, color: "inherit", opacity: 0.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOFTWARE FOCALIZZATO */}
      <section style={{ borderBottom: "3px solid #000", background: "#FFFEF2" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0 }} className="grid-2">
          {/* Colonna sinistra — copy */}
          <div style={{ padding: "60px 40px", borderRight: "3px solid #000" }}>
            <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 16 }}>[ Offerta — Strumento Focalizzato ]</div>
            <h2 className="display" style={{ fontSize: 48, fontStyle: "italic", lineHeight: 1.05, marginBottom: 24 }}>
              Un problema.
              <br />
              Risolto.
              <br />
              <span style={{ color: "#FF2D00" }}>Basta.</span>
            </h2>
            <p className="sans" style={{ fontSize: 15, lineHeight: 1.85, color: "#555", maxWidth: 420, marginBottom: 32 }}>
              Non sempre serve un sistema complesso. A volte hai <strong style={{ color: "#1a1a1a" }}>un singolo problema</strong> che vi fa perdere ore ogni settimana — e nessuno sa come risolverlo.
            </p>
            <p className="sans" style={{ fontSize: 15, lineHeight: 1.85, color: "#555", maxWidth: 420, marginBottom: 40 }}>
              Ti costruiamo uno strumento digitale su misura che risolve esattamente <em>quello</em>. Niente feature inutili, niente abbonamenti mensili. <strong style={{ color: "#1a1a1a" }}>Solo la soluzione, in mano tua.</strong>
            </p>
            {/* Esempi casi d'uso */}
            <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#999", fontWeight: 700, marginBottom: 16 }}>ESEMPI REALI</div>
            {[
              "Raccogliere e organizzare la knowledge interna in 1 mese invece che in 1 anno",
              "Automatizzare un report che compilate a mano ogni lunedì mattina",
              "Un mini-gestionale che fa esattamente quello che il tuo gestionale attuale non fa",
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
                { label: "FOCUS", val: "1 problema, 1 soluzione" },
                { label: "TEMPI", val: "2–4 settimane" },
                { label: "INVESTIMENTO", val: "a partire da €5.000" },
                { label: "PROPRIETÀ", val: "Tuo per sempre" },
                { label: "ASSISTENZA", val: "Ti affianchiamo nel lancio" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 18, marginBottom: 18, borderBottom: i < 4 ? "1px solid #333" : "none" }}>
                  <span className="sans" style={{ fontSize: 11, letterSpacing: 1.5, color: "#888", fontWeight: 700 }}>{row.label}</span>
                  <span className="sans" style={{ fontSize: 14, fontWeight: 600, color: "#FFFEF2" }}>{row.val}</span>
                </div>
              ))}
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ marginTop: 24, display: "block", textAlign: "center", background: "#FF2D00", borderColor: "#FF2D00", fontSize: 14, padding: "14px 24px" }}>
                Raccontaci il tuo problema &uarr;
              </a>
            </div>
            <p className="sans" style={{ fontSize: 12, color: "#aaa", marginTop: 16, lineHeight: 1.6 }}>
              Non sei sicuro se è il caso? Descrivici il problema nella chat qui sotto — ti diciamo in 24 ore se possiamo risolverlo.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section style={{ borderBottom: "3px solid #000" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0 }} className="grid-2">
          <div style={{ padding: "60px 40px", borderRight: "3px solid #000" }}>
            <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 16 }}>[ Come funziona ]</div>
            <h2 className="display" style={{ fontSize: 48, fontStyle: "italic", lineHeight: 1.05, marginBottom: 24 }}>
              Da zero a
              <br />
              operativo.
            </h2>
            <p className="sans" style={{ fontSize: 15, lineHeight: 1.8, color: "#666", maxWidth: 360 }}>
              Quattro passaggi. Niente riunioni infinite. Ci parliamo, costruiamo, consegniamo.
            </p>
          </div>
          <div>
            {steps.map((s, i) => (
              <div key={i} style={{ padding: "28px 32px", borderBottom: i < 3 ? "3px solid #000" : "none", display: "flex", alignItems: "baseline", gap: 20 }}>
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

      {/* TESTIMONIANZA */}
      <section style={{ background: "#000", color: "#FFFEF2", borderBottom: "3px solid #000", padding: "60px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 24 }}>[ Testimonianza ]</div>
          <p className="display" style={{ fontSize: 30, fontStyle: "italic", lineHeight: 1.45, marginBottom: 32 }}>
            "Abbiamo digitalizzato i nostri processi in 3 settimane. Ora risparmiamo 15 ore a settimana di lavoro manuale."
          </p>
          <div className="sans" style={{ fontSize: 14 }}>
            <span style={{ color: "#FF2D00", fontWeight: 700 }}>Marco R.</span> — Titolare, azienda manifatturiera
          </div>
        </div>
      </section>

      {/* CONVERSIONE — Chat + CTA */}
      <section id="parlaci" style={{ padding: "80px 32px", borderBottom: "3px solid #000", background: "#FFFEF2" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cta-layout" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 60 }}>
            {/* Colonna sinistra — copy di conversione */}
            <div style={{ flex: 1, minWidth: 0, paddingTop: 8 }}>
              <div className="sans" style={{ fontSize: 12, letterSpacing: 2, color: "#FF2D00", fontWeight: 700, marginBottom: 20 }}>
                [ Inizia da qui ]
              </div>
              <h2 className="display" style={{ fontSize: 52, fontStyle: "italic", lineHeight: 1.05, marginBottom: 24 }}>
                Pronto a lavorare
                <br />
                <span style={{ color: "#FF2D00" }}>meglio</span>?
              </h2>
              <p className="sans" style={{ fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
                Raccontaci della tua azienda direttamente qui. Ti facciamo qualche domanda per capire cosa ti serve e ti proponiamo una soluzione concreta
                <strong style={{ color: "#1a1a1a" }}> entro 48 ore</strong>.
              </p>

              {/* Alternativa: Calendly */}
              <div style={{ borderTop: "3px solid #000", paddingTop: 24 }}>
                <p className="sans" style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Preferisci parlare a voce?</p>
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ fontSize: 14, padding: "14px 28px" }}>
                  Prenota una chiamata gratuita &uarr;
                </a>
              </div>
            </div>

            {/* Colonna destra — Chat */}
            <div className="cta-chat-wrap" style={{ flexShrink: 0 }}>
              <ChatMockup />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="sans" style={{ fontWeight: 700, fontSize: 14 }}>THINKING</span>
          <span className="display" style={{ fontSize: 16, fontStyle: "italic", color: "#FF2D00" }}>Studio</span>
        </div>
        <span className="sans" style={{ fontSize: 12, color: "#aaa" }}>&copy; 2026 — Milano, Italia</span>
      </footer>
    </>
  );
}
