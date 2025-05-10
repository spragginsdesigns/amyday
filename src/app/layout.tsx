import type { Metadata, Viewport } from "next";
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
	description:
		"AMyDay is a custom-built application created by Austin for Amy, featuring a personal AI companion, special messages, and more.",
	keywords: [
		"AMyDay",
		"personal",
		"custom",
		"AI companion",
		"dark humor",
		"special",
	],
	authors: [{ name: "Austin" }],
	manifest: "/manifest.json",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "/icon0.svg", type: "image/svg+xml" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
		apple: [{ url: "/apple-icon.png" }, { url: "/apple-touch-icon.png" }],
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "AMyDay",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#121212" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon-96x96.png"
				/>
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${lobster.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
