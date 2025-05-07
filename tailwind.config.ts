import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				lilac: "#C8A2C8", // A soft, muted purple
				blush: "#E6A8D7", // A gentle pink
				ivory: "#FFFFF0", // A warm, creamy white
				"muted-rose": "#D8BFD8", // A dusty, desaturated rose pink
				"dark-bg": "#231F20", // A very dark grey, almost black, for primary background
				"card-bg": "rgba(55, 55, 70, 0.6)", // Semi-transparent dark background for cards (glassmorphism)
				"accent-glow": "rgba(200, 162, 200, 0.3)", // Lilac glow for accents
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				sans: ['"Inter"', "sans-serif"], // Example: Using Inter as a modern sans-serif
				serif: ['"Playfair Display"', "serif"], // Example: Elegant serif for special text
			},
			backdropBlur: {
				xs: "2px",
			},
		},
	},
	plugins: [],
};
export default config;
