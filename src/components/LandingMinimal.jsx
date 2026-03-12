import ChatGuided from "./ChatGuided";

export default function LandingMinimal() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#FFFEF2;color:#1a1a1a;overflow-x:hidden}
        ::selection{background:#FF2D00;color:#fff}
        .sans{font-family:'DM Sans',sans-serif}
        .display{font-family:'Playfair Display',Georgia,serif}
        @media(max-width:768px){
          .minimal-hero-title{font-size:36px!important}
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        gap: 40,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span className="sans" style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>THINKING</span>
          <span className="display" style={{ fontSize: 20, fontStyle: "italic", color: "#FF2D00" }}>Studio</span>
        </div>

        {/* Hero text */}
        <div style={{ textAlign: "center", maxWidth: 600 }}>
          <h1
            className="minimal-hero-title display"
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
              marginBottom: 16,
            }}
          >
            Il tuo gestionale perfetto in{" "}
            <span style={{ color: "#FF2D00", fontStyle: "italic" }}>sole due settimane</span>
          </h1>
          <p
            className="sans"
            style={{
              fontSize: 16,
              color: "#555",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Guarda come funziona una demo. Inizia ora.
          </p>
        </div>

        {/* Chat */}
        <div style={{ width: "100%", maxWidth: 560 }}>
          <ChatGuided />
        </div>

        {/* Footer micro */}
        <div
          className="sans"
          style={{
            fontSize: 11,
            color: "#999",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          &copy; 2025 Thinking Studio &mdash; thinkingstudio.dev
        </div>
      </div>
    </>
  );
}
