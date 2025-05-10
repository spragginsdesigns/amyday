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
				glow: "rgba(230, 168, 215, 0.8)", // Blush color with opacity for glowing effect
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
			keyframes: {
				// Button pulse animation
				"button-pulse": {
					"0%": { transform: "scale(1)" },
					"10%": { transform: "scale(1.05)" },
					"20%": {
						transform: "scale(1.1)",
						boxShadow: "0 0 20px rgba(230, 168, 215, 0.8)",
					},
					"30%": { transform: "scale(1.05)" },
					"40%": { transform: "scale(1.02)" },
					"100%": { transform: "scale(1)" },
				},
				// Text float animation
				"text-float": {
					"0%": { transform: "translateY(0)" },
					"20%": { transform: "translateY(-4px) scale(1.05)" },
					"40%": { transform: "translateY(-2px) scale(1.02)" },
					"100%": { transform: "translateY(0) scale(1)" },
				},
				// Shine sweep animation
				"sweep-shine": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
				// Glow pulse animation
				"pulse-glow": {
					"0%": { opacity: "0" },
					"30%": { opacity: "0.6" },
					"70%": { opacity: "0.3" },
					"100%": { opacity: "0" },
				},
				// Particle animations for four corners
				"particle-topLeft": {
					"0%": { transform: "translate(0, 0)", opacity: "0", scale: "0.3" },
					"20%": { opacity: "0.7", scale: "0.5" },
					"100%": {
						transform: "translate(-20px, -20px)",
						opacity: "0",
						scale: "0",
					},
				},
				"particle-topRight": {
					"0%": { transform: "translate(0, 0)", opacity: "0", scale: "0.3" },
					"20%": { opacity: "0.7", scale: "0.5" },
					"100%": {
						transform: "translate(20px, -20px)",
						opacity: "0",
						scale: "0",
					},
				},
				"particle-bottomLeft": {
					"0%": { transform: "translate(0, 0)", opacity: "0", scale: "0.3" },
					"20%": { opacity: "0.7", scale: "0.5" },
					"100%": {
						transform: "translate(-20px, 20px)",
						opacity: "0",
						scale: "0",
					},
				},
				"particle-bottomRight": {
					"0%": { transform: "translate(0, 0)", opacity: "0", scale: "0.3" },
					"20%": { opacity: "0.7", scale: "0.5" },
					"100%": {
						transform: "translate(20px, 20px)",
						opacity: "0",
						scale: "0",
					},
				},
			},
			animation: {
				"button-pulse":
					"button-pulse 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
				"text-float": "text-float 1s ease-in-out forwards",
				"sweep-shine": "sweep-shine 0.7s ease-in-out",
				"pulse-glow": "pulse-glow 1s ease-in-out forwards",
				"particle-topLeft": "particle-topLeft 0.8s ease-out forwards",
				"particle-topRight": "particle-topRight 0.8s ease-out forwards",
				"particle-bottomLeft": "particle-bottomLeft 0.8s ease-out forwards",
				"particle-bottomRight": "particle-bottomRight 0.8s ease-out forwards",
			},
		},
	},
	plugins: [],
};
export default config;
