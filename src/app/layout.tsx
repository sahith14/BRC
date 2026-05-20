import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnalyticsBeacon } from "@/components/AnalyticsBeacon";

export const metadata: Metadata = {
  metadataBase: new URL("https://bharatarashtracockroaches.org"),
  title: {
    default: "BRC — Bharata Rashtra Cockroaches | The Ignored Are Speaking",
    template: "%s · BRC"
  },
  description:
    "Bharata Rashtra Cockroaches (BRC) — a cinematic political movement of farmers, students, workers and citizens. The ignored are speaking.",
  keywords: [
    "BRC",
    "Bharata Rashtra Cockroaches",
    "political movement",
    "India youth movement",
    "anti corruption",
    "farmers movement",
    "students movement",
    "exam paper leak",
    "transparency"
  ],
  openGraph: {
    title: "BRC — The Ignored Are Speaking",
    description:
      "A cinematic political movement of farmers, students, workers and citizens.",
    url: "https://bharatarashtracockroaches.org",
    siteName: "Bharata Rashtra Cockroaches",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BRC — The Ignored Are Speaking",
    description: "A cinematic political movement of the ignored masses."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-900 text-white antialiased selection:bg-crimson-500 selection:text-white">
        <AnalyticsBeacon />
        {children}
      </body>
    </html>
  );
}
