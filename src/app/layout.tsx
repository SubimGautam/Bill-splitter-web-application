import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Splito - Split Bills Easily",
  description: "Split expenses with friends and family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}