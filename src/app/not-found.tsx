import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      padding: "1rem"
    }}>
      <h1 style={{ fontSize: "6rem", fontWeight: "bold", color: "#10b981", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "1rem", color: "#111827" }}>Page Not Found</h2>
      <p style={{ fontSize: "1.125rem", color: "#6b7280", marginBottom: "2rem", textAlign: "center", maxWidth: "28rem" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          padding: "1rem 2rem",
          backgroundColor: "#10b981",
          color: "white",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          fontWeight: 500,
          textDecoration: "none"
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}