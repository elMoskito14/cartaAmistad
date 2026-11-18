import type { Metadata, Viewport } from "next";
import { Barlow, Bitter } from "next/font/google";
import "./globals.css";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "La Carta de la Amistad",
  description: "Quién ha echado su carta de la amistad, a quién, y qué favor pidió.",
};

export const viewport: Viewport = {
  themeColor: "#1d5a3a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bitter.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
