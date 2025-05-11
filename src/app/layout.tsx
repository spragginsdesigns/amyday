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
	metadataBase: new URL("https://amyday.vercel.app"),
	title: "AmyDay: A special digital experience crafted just for Amy Taylor.",
	description:
		"A special digital experience crafted by Austin Spraggins, just for Amy Taylor (Rothchild) of Oakhurst, CA. Discover a personal AI companion, heartfelt messages, and delightful surprises designed to make her day.",
	keywords: [
		"AmyDay",
		"Amy Taylor",
		"Amy Rothchild",
		"Amy Taylor Oakhurst",
		"Amy Rothchild Oakhurst",
		"Amy Taylor Fresno",
		"Amy Rothchild Fresno",
		"Mothers Day",
		"custom Mothers Day site",
		"AI companion",
		"dark humor",
		"special",
		"digital experience",
		"interactive gift",
		"AI chat",
		"personalized letter",
		"compliment generator",
		"animated surprise",
		"digital mother's day gift",
		"typewriter poem",
		"hidden message",
	],
	authors: [{ name: "Austin Spraggins" }],
	applicationName: "AmyDay",
	referrer: "origin-when-cross-origin",
	alternates: {
		canonical: "https://amyday.vercel.app",
	},
	manifest: "/site.webmanifest",
	category: "personal",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
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
		title: "AmyDay",
	},
	openGraph: {
		title: "AmyDay: A special digital experience crafted just for Amy Taylor.",
		description:
			"A special digital experience crafted by Austin Spraggins, just for Amy Taylor of Oakhurst, CA. Discover a personal AI companion, heartfelt messages, and delightful surprises designed to make her day.",
		url: "https://amyday.vercel.app",
		siteName: "AmyDay",
		locale: "en_US",
		images: [
			{
				url: "/amyday-ogimage-2.png",
				width: 1200,
				height: 630,
				alt: "AmyDay: A tribute to the strongest woman I know.",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "AmyDay: A special digital experience crafted just for Amy Taylor.",
		description:
			"A special digital experience crafted by Austin Spraggins, just for Amy Taylor of Oakhurst, CA. Discover a personal AI companion, heartfelt messages, and delightful surprises designed to make her day.",
		images: ["/amyday-ogimage-2.png"],
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
