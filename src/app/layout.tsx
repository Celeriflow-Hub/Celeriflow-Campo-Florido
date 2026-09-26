import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celeriflow — Campo Florido",
  description: "Base Next.js + React + Vercel + Neon + Blob + Firebase (TypeScript)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
