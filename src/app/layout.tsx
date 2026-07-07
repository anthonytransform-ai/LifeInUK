import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SettingsProvider } from "@/context/SettingsContext";
import NavBar from "@/components/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anthonytransform-ai.github.io/LifeInUK"),
  title: "Life in the UK Mock Test",
  description: "Bilingual Life in the UK Mock Test App",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LifeInUK",
  },
  icons: {
    apple: "/LifeInUK/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SettingsProvider>
          <NavBar />
          <main className="flex-1 flex flex-col">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
