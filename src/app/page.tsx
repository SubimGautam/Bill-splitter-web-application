import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* Header */}
      <header style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2.5rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "2.25rem",
            height: "2.25rem",
            backgroundColor: "#10b981",
            borderRadius: "0.375rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: "1.125rem" }}>$</span>
          </div>
          <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#111827" }}>Splito</span>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Link 
            href="/authentication/signup" 
            style={{
              padding: "0.5rem 1.25rem",
              backgroundColor: "#10b981",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "0.375rem",
              textDecoration: "none"
            }}
          >
            Sign Up
          </Link>
          <Link 
            href="/authentication/login" 
            style={{
              padding: "0.5rem 1.25rem",
              backgroundColor: "#10b981",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "0.375rem",
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "0 1rem"
      }}>
        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem", color: "#111827" }}>
            Welcome to Splito
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#4b5563", marginBottom: "2rem" }}>
            Split bills with friends and family easily
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link 
              href="/authentication/signup" 
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#10b981",
                color: "white",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "0.5rem",
                textDecoration: "none"
              }}
            >
              Get Started
            </Link>
            <Link 
              href="/authentication/login" 
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#f3f4f6",
                color: "#111827",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "0.5rem",
                textDecoration: "none"
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}