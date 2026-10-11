import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const syne = localFont({
  src: "./fonts/syne.woff2",
  variable: "--font-syne",
  weight: "400 800",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEURA CORE — The Architecture of Transcendence",
  description:
    "A millimetric cybernetic interface. Scroll to witness the biomechanical disassembly sequence in real time.",
  keywords: ["neura core", "cybernetics", "bionic interface", "scrollytelling"],
  openGraph: {
    title: "NEURA CORE — The Architecture of Transcendence",
    description:
      "A millimetric cybernetic interface. Scroll to witness the biomechanical disassembly sequence in real time.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23030303'/%3E%3Ccircle cx='16' cy='16' r='7' fill='none' stroke='%2300F0FF' stroke-width='2'/%3E%3Ccircle cx='16' cy='16' r='2.5' fill='%2300F0FF'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="relative min-h-screen bg-void">
        {/* Static deep-space background layers */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% -10%, #0a0a12 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 110%, #0a0218 0%, transparent 55%), #030303",
          }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}