import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteMetadata } from "@/config";

import "./globals.css";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  themeColor: "#050403",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon-logo.png?v=2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050403",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="text-foreground antialiased">
        <div className="relative overflow-x-hidden">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
