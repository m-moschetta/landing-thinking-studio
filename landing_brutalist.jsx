import { useState, useEffect, useRef } from "react";

const CAL_LINK = "https://calendly.com/thinkingstudio";

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Ciao! Sono l'assistente di Thinking Studio. Raccontami della tua azienda e di cosa hai bisogno — ti faccio qualche domanda per capire come aiutarti." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Sei l'assistente commerciale di Thinking Studio, un'agenzia tech che sviluppa soluzioni SaaS, ERP leggeri e automazioni per micro e piccole imprese italiane (fino a €5M di fatturato). Il tuo obiettivo è fare 4-6 domande per capire: 1. Che tipo di azienda è (settore, dimensione, fatturato indicativo) 2. Quali strumenti/software usano attualmente 3. Quali problemi hanno nella gestione dati / processi 4. Che budget indicativo hanno in mente 5. Quali integrazioni servirebbero. Sii diretto, amichevole e chiaro. Parla sempre in italiano semplice, senza inglesismi. Fai UNA domanda alla volta. Quando hai raccolto abbastanza info (dopo 4-6 scambi), ringrazia e di' che il team li ricontatterà entro 24h.`,
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await resp.json();
      const text = data.content?.[0]?.text || "Errore. Riprova tra poco.";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      if (text.includes("ricontatter") || updated.length > 12) setFinished(true);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Errore di sistema. Riprova." }]);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position:"fixed",bottom:0,right:0,width:420,maxWidth:"100vw",height:520,background:"#fff",border:"4px solid #000",display:"flex",flexDirection:"column",zIndex:1000 }}>
      <div style={{ padding:"12px 16px",borderBottom:"4px solid #000",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#FF2D00" }}>
        <span style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:"#fff" }}>● Parlaci del tuo progetto</span>
        <button onClick={onClose} style={{ background:"#000",border:"none",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700,padding:"4px 12px",fontFamily:"'DM Sans',sans-serif",borderRadius:0 }}>Chiudi</button>
      </div>
      <div ref={scrollRef} style={{ flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10,background:"#fff" }}>
        {messages.map((m,i) => (
          <div key={i} style={{ alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"85%",padding:"10px 14px",background:m.role==="user"?"#000":"#f2f2f0",color:m.role==="user"?"#fff":"#000",fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans',sans-serif",border:m.role==="user"?"none":"2px solid #000" }}>{m.content}</div>
        ))}
        {loading && <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#FF2D00",fontWeight:700 }}>Sto elaborando...</div>}
      </div>
      <div style={{ padding:12,borderTop:"4px solid #000" }}>
        {finished ? (
          <div style={{ textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,padding:10,background:"#00FF57",color:"#000" }}>✓ Ricevuto. Ti ricontattiamo entro 24 ore.</div>
        ) : (
          <div style={{ display:"flex",gap:0 }}>
            <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&sendMessage()} placeholder="Scrivi qui..." style={{ flex:1,background:"#fff",border:"3px solid #000",padding:"12px 14px",color:"#000",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:500,outline:"none" }} />
            <button onClick={sendMessage} disabled={loading||!input.trim()} style={{ background:"#000",border:"3px solid #000",borderLeft:"none",padding:"12px 18px",color:"#fff",fontWeight:900,cursor:"pointer",fontSize:18,fontFamily:"'DM Sans',sans-serif" }}>→</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ThinkingStudioBrutalist() {
  const [chatOpen, setChatOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const features = [
    { title:"INTEGRAZIONE", desc:"Colleghiamo i tuoi programmi. Fatture, gestionale, Excel, e-commerce. Tutto parla con tutto." },
    { title:"AUTOMAZIONE", desc:"Basta copia-incolla. I dati si muovono da soli, senza errori, senza perdite di tempo." },
    { title:"100% SU MISURA", desc:"Niente programmi generici. Costruiamo esattamente quello che ti serve, niente di più." },
    { title:"VELOCE E ACCESSIBILE", desc:"Pronto in settimane. Costa come un dipendente part-time, lavora come un reparto intero." },
  ];

  const steps = [
    { n:"001", t:"ASCOLTO", d:"Ci racconti come lavori. Noi ascoltiamo e capiamo." },
    { n:"002", t:"PROGETTO", d:"Disegniamo la soluzione su misura per te." },
    { n:"003", t:"SVILUPPO", d:"Costruiamo. In settimane, non mesi." },
    { n:"004", t:"CONSEGNA", d:"Vai operativo. Ti affianchiamo anche dopo." },
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

        .fab-brutal{position:fixed;bottom:20px;right:20px;background:#FF2D00;color:#fff;border:4px solid #000;width:64px;height:64px;font-size:15px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:999;font-weight:700;transition:all 0.15s;font-family:'DM Sans',sans-serif;line-height:1}
        .fab-brutal:hover{transform:translate(-3px,-3px);box-shadow:6px 6px 0 #000}

        @media(max-width:768px){
          .hero-big{font-size:42px!important}
          .grid-2{grid-template-columns:1fr!important}
          .grid-4{grid-template-columns:1fr 1fr!important}
          .hero-flex{flex-direction:column!important;align-items:flex-start!important}
          .nav-inner{padding:12px 16px!important}
          .stat-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {/* TICKER */}
      <div style={{background:"#000",color:"#FFFEF2",overflow:"hidden",borderBottom:"3px solid #000"}}>
        <div className="marquee-track" style={{padding:"10px 0"}}>
          {[...Array(10)].map((_,i)=>(
            <span key={i} className="sans" style={{fontSize:13,fontWeight:600,letterSpacing:1,whiteSpace:"nowrap",paddingRight:60}}>
              THINKING STUDIO — Soluzioni digitali su misura per PMI — Milano, Italia — {time.toLocaleTimeString("it-IT")} —{" "}
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{borderBottom:"3px solid #000",position:"sticky",top:0,zIndex:100,background:"#FFFEF2"}}>
        <div className="nav-inner" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 32px"}}>
          <div style={{display:"flex",alignItems:"baseline",gap:8}}>
            <span className="sans" style={{fontWeight:700,fontSize:20,letterSpacing:-0.5}}>THINKING</span>
            <span className="display" style={{fontSize:22,fontStyle:"italic",color:"#FF2D00"}}>Studio</span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span className="sans" style={{fontSize:12,color:"#999",marginRight:12}}>Dal 2026</span>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{padding:"10px 20px",fontSize:13}}>Prenota una chiamata</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:"80px 32px 60px",borderBottom:"3px solid #000"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="sans" style={{fontSize:12,letterSpacing:2,color:"#FF2D00",fontWeight:700,marginBottom:32}}>[ Per aziende che fatturano fino a €5M ]</div>
          <h1 className="hero-big" style={{fontSize:72,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,lineHeight:1,letterSpacing:"-0.02em",marginBottom:40,maxWidth:900,animation:"slideUp 0.6s ease-out"}}>
            Il tuo business<br/>merita software<br/><span style={{fontStyle:"italic",color:"#FF2D00",textDecoration:"underline",textDecorationThickness:4,textUnderlineOffset:8}}>che funziona davvero.</span>
          </h1>
          <div className="hero-flex" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:40}}>
            <p className="sans" style={{fontSize:16,lineHeight:1.8,maxWidth:500,color:"#555",animation:"slideUp 0.6s ease-out 0.2s both"}}>
              Sviluppiamo soluzioni digitali su misura per la tua impresa.<br/>Integriamo i tuoi dati, automatizziamo i tuoi processi.<br/><strong style={{color:"#1a1a1a"}}>Veloce. Accessibile. Senza giri di parole.</strong>
            </p>
            <div style={{display:"flex",gap:12,animation:"slideUp 0.6s ease-out 0.3s both",flexShrink:0}}>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn">Prenota una chiamata ↗</a>
              <button className="brutal-btn-outline" onClick={()=>setChatOpen(true)}>Raccontaci il progetto →</button>
            </div>
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <div className="stat-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"3px solid #000"}}>
        {[{n:"2–4",l:"settimane"},{n:"70%",l:"risparmio sui costi"},{n:"100%",l:"su misura"},{n:"24 ore",l:"per ricontattarti"}].map((s,i)=>(
          <div key={i} style={{padding:"28px 24px",textAlign:"center",borderRight:i<3?"3px solid #000":"none"}}>
            <div className="display" style={{fontSize:36,fontStyle:"italic",color:"#FF2D00"}}>{s.n}</div>
            <div className="sans" style={{fontSize:13,marginTop:6,color:"#666"}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* PROBLEMI */}
      <section style={{borderBottom:"3px solid #000"}}>
        <div style={{display:"grid",gridTemplateColumns:"300px 1fr",minHeight:400}} className="grid-2">
          <div style={{background:"#000",color:"#FFFEF2",padding:40,display:"flex",flexDirection:"column",justifyContent:"center",borderRight:"3px solid #000"}}>
            <div className="sans" style={{fontSize:12,letterSpacing:2,color:"#FF2D00",fontWeight:700,marginBottom:16}}>[ Il problema ]</div>
            <h2 className="display" style={{fontSize:40,fontStyle:"italic",lineHeight:1.1}}>Ti riconosci in una di queste?</h2>
          </div>
          <div>
            {[
              "Copi dati a mano tra Excel e diversi programmi ogni giorno.",
              "Non hai mai i numeri aggiornati quando ti servono davvero.",
              "Collegare i tuoi strumenti è complicato e costa troppo.",
              "I gestionali delle grandi aziende sono sovradimensionati e fuori budget.",
            ].map((p,i)=>(
              <div key={i} style={{padding:"24px 32px",borderBottom:i<3?"3px solid #000":"none",display:"flex",alignItems:"center",gap:20,animation:`skewIn 0.5s ease-out ${i*0.1}s both`}}>
                <span className="display" style={{fontSize:32,fontWeight:700,color:"#FF2D00",flexShrink:0,fontStyle:"italic"}}>{String(i+1).padStart(2,"0")}</span>
                <span className="sans" style={{fontSize:16,lineHeight:1.6}}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER ROSSO */}
      <div style={{background:"#FF2D00",padding:"20px 32px",borderBottom:"3px solid #000",textAlign:"center"}}>
        <span className="sans" style={{fontSize:17,fontWeight:700,color:"#fff"}}>Se hai risposto sì anche solo a una → possiamo aiutarti.</span>
      </div>

      {/* COSA FACCIAMO */}
      <section style={{padding:"80px 32px",borderBottom:"3px solid #000"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:48,flexWrap:"wrap",gap:20}}>
            <div>
              <div className="sans" style={{fontSize:12,letterSpacing:2,color:"#FF2D00",fontWeight:700,marginBottom:12}}>[ Cosa facciamo ]</div>
              <h2 className="display" style={{fontSize:48,fontStyle:"italic",lineHeight:1.05}}>Software che<br/>lavora <span style={{textDecoration:"line-through"}}>per</span> con te.</h2>
            </div>
          </div>
          <div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0}}>
            {features.map((f,i)=>(
              <div key={i} className="feature-card" style={{borderRight:i<3?"none":undefined,animation:`skewIn 0.5s ease-out ${i*0.1}s both`}}>
                <div className="display" style={{fontSize:40,fontWeight:700,marginBottom:16,lineHeight:1,fontStyle:"italic",color:"#FF2D00"}}>{String.fromCharCode(65+i)}</div>
                <h3 className="sans" style={{fontSize:15,fontWeight:700,marginBottom:12}}>{f.title}</h3>
                <p className="sans" style={{fontSize:14,lineHeight:1.7,color:"inherit",opacity:0.65}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section style={{borderBottom:"3px solid #000"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:0}} className="grid-2">
          <div style={{padding:"60px 40px",borderRight:"3px solid #000"}}>
            <div className="sans" style={{fontSize:12,letterSpacing:2,color:"#FF2D00",fontWeight:700,marginBottom:16}}>[ Come funziona ]</div>
            <h2 className="display" style={{fontSize:48,fontStyle:"italic",lineHeight:1.05,marginBottom:24}}>Da zero a<br/>operativo.</h2>
            <p className="sans" style={{fontSize:15,lineHeight:1.8,color:"#666",maxWidth:360}}>Quattro passaggi. Niente riunioni infinite. Ci parliamo, costruiamo, consegniamo.</p>
          </div>
          <div>
            {steps.map((s,i)=>(
              <div key={i} style={{padding:"28px 32px",borderBottom:i<3?"3px solid #000":"none",display:"flex",alignItems:"baseline",gap:20}}>
                <span className="sans" style={{fontSize:12,color:"#FF2D00",fontWeight:700,flexShrink:0}}>{s.n}</span>
                <div>
                  <div className="sans" style={{fontSize:17,fontWeight:700,marginBottom:4}}>{s.t}</div>
                  <div className="sans" style={{fontSize:14,color:"#888",lineHeight:1.6}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIANZA */}
      <section style={{background:"#000",color:"#FFFEF2",borderBottom:"3px solid #000",padding:"60px 32px"}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <div className="sans" style={{fontSize:12,letterSpacing:2,color:"#FF2D00",fontWeight:700,marginBottom:24}}>[ Testimonianza ]</div>
          <p className="display" style={{fontSize:30,fontStyle:"italic",lineHeight:1.45,marginBottom:32}}>"Abbiamo digitalizzato i nostri processi in 3 settimane. Ora risparmiamo 15 ore a settimana di lavoro manuale."</p>
          <div className="sans" style={{fontSize:14}}><span style={{color:"#FF2D00",fontWeight:700}}>Marco R.</span> — Titolare, azienda manifatturiera</div>
        </div>
      </section>

      {/* CHIUSURA */}
      <section style={{padding:"100px 32px",borderBottom:"3px solid #000",textAlign:"center"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <h2 className="display" style={{fontSize:56,fontStyle:"italic",lineHeight:1.05,marginBottom:24}}>Pronto a lavorare<br/><span style={{color:"#FF2D00"}}>meglio</span>?</h2>
          <p className="sans" style={{fontSize:16,color:"#666",lineHeight:1.8,marginBottom:40}}>Raccontaci della tua azienda. Ti proponiamo una soluzione concreta<br/>in meno di 48 ore. Nessun impegno, nessun costo nascosto.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{fontSize:16,padding:"20px 44px"}}>Prenota una chiamata gratuita ↗</a>
            <button className="brutal-btn-outline" onClick={()=>setChatOpen(true)} style={{fontSize:16,padding:"20px 44px"}}>Raccontaci il progetto →</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:32,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
        <div style={{display:"flex",alignItems:"baseline",gap:8}}>
          <span className="sans" style={{fontWeight:700,fontSize:14}}>THINKING</span>
          <span className="display" style={{fontSize:16,fontStyle:"italic",color:"#FF2D00"}}>Studio</span>
        </div>
        <span className="sans" style={{fontSize:12,color:"#aaa"}}>© 2026 — Milano, Italia</span>
      </footer>

      {!chatOpen && <button className="fab-brutal" onClick={()=>setChatOpen(true)} title="Parlaci del tuo progetto">💬</button>}
      <ChatBot isOpen={chatOpen} onClose={()=>setChatOpen(false)} />
    </>
  );
}
