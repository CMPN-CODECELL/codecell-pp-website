export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "24px",
        background: "#040b15",
        color: "#fff",
        fontFamily: '"Press Start 2P", monospace',
      }}
    >
      <div>
        <h1 style={{ fontSize: "clamp(22px, 6vw, 40px)", margin: 0 }}>404</h1>
        <p style={{ fontSize: "12px", lineHeight: 1.8, margin: "24px 0" }}>
          This page doesn&apos;t exist.
        </p>
        <a href="/" style={{ color: "#ffe81f", fontSize: "12px" }}>
          Back to CodeCell++ home
        </a>
      </div>
    </main>
  );
}
