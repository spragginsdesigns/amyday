import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Dancing_Script, Lobster } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cursive/tattoo style font for headers
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AMyDay | A special experience created by Austin",
  description: "AMyDay is a custom-built application created by Austin for Amy, featuring a personal AI companion, special messages, and more.",
  keywords: ["AMyDay", "personal", "custom", "AI companion", "dark humor", "special"],
  authors: [{ name: "Austin" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${lobster.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
