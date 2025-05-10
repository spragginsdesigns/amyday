"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	darkHumorLines,
	darkHumorLinesMild,
	darkHumorLinesSpicy,
} from "../lib/darkHumor";
import { cn } from "@/lib/utils";

type HumorMode = "default" | "mild" | "spicy";

const humorModeMap: Record<HumorMode, string[]> = {
	default: darkHumorLines,
	mild: darkHumorLinesMild,
	spicy: darkHumorLinesSpicy,
};

const humorModeLabels: Record<HumorMode, string> = {
	default: "Chaotic",
	mild: "Silly",
	spicy: "Savage 😈",
};

/**
 * Formats humor text by adding emphasis to key phrases
 * Looks for patterns like quotes, ALL CAPS, and common emphasis indicators
 */
const formatHumorText = (text: string): React.ReactNode => {
	// Look for text in quotes or with asterisks/special formatting
	const parts = text.split(/(\*[^*]+\*|"[^"]+"|'[^']+'|\([^)]+\)|™|LOL)/g);

	return parts.map((part, index) => {
		// Handle quoted text
		if (part.startsWith('"') && part.endsWith('"')) {
			return (
				<em key={index} className="font-medium text-blush">
					{part}
				</em>
			);
		}
		// Handle asterisk-emphasized text
		else if (part.startsWith("*") && part.endsWith("*")) {
			return (
				<strong key={index} className="font-bold text-lilac">
					{part.slice(1, -1)}
				</strong>
			);
		}
		// Handle text in single quotes
		else if (part.startsWith("'") && part.endsWith("'")) {
			return (
				<span key={index} className="font-medium text-muted-rose">
					{part}
				</span>
			);
		}
		// Handle text in parentheses
		else if (part.startsWith("(") && part.endsWith(")")) {
			return (
				<span key={index} className="text-slate-400 font-light">
					{part}
				</span>
			);
		}
		// Handle trademark symbol
		else if (part === "™") {
			return (
				<sup key={index} className="text-xs text-blush">
					™
				</sup>
			);
		}
		// Handle LOL or similar emphasis
		else if (part === "LOL") {
			return (
				<span key={index} className="font-bold text-blush">
					{part}
				</span>
			);
		}
		// Return normal text
		else {
			return <span key={index}>{part}</span>;
		}
	});
};

const DarkHumorGenerator: React.FC = () => {
	const [currentJoke, setCurrentJoke] = useState<string>("");
	const [humorMode, setHumorMode] = useState<HumorMode>("default");
	const [showJoke, setShowJoke] = useState<boolean>(false);
	const [isGenerating, setIsGenerating] = useState<boolean>(false);

	const getRandomJoke = () => {
		setIsGenerating(true);

		// Short timeout to show loading state
		setTimeout(() => {
			const lines = humorModeMap[humorMode];
			const randomIndex = Math.floor(Math.random() * lines.length);
			setCurrentJoke(lines[randomIndex]);
			setShowJoke(true);
			setIsGenerating(false);
		}, 400);
	};

	const toggleHumorMode = () => {
		setHumorMode((prevMode) => {
			if (prevMode === "default") return "mild";
			if (prevMode === "mild") return "spicy";
			return "default"; // Cycle back to default from spicy
		});
	};

	// Get a joke on initial load or when humorMode changes and no joke is shown
	useEffect(() => {
		if (!showJoke) {
			// You might want to load a joke on first render or not.
			// getRandomJoke();
		}
	}, [humorMode, showJoke]);

	return (
		<div className="w-full mx-auto max-w-xl p-4 sm:p-8 rounded-xl bg-gradient-to-br from-dark-bg to-slate-900 border border-blush/20 shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-lg text-center">
			<h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blush to-lilac bg-clip-text text-transparent mb-4 sm:mb-6 font-serif">
				Dark Humor Dose
			</h2>

			<motion.div
				className={cn(
					"mb-6 sm:mb-8 min-h-[120px] flex items-center justify-center p-4 sm:p-6 rounded-xl transition-all duration-300",
					"bg-card-bg border border-blush/20 shadow-inner backdrop-blur-sm",
					showJoke ? "bg-opacity-80" : "bg-opacity-40"
				)}
				animate={{
					boxShadow: isGenerating
						? "0 0 15px rgba(230,168,215,0.4)"
						: "inset 0 2px 4px rgba(0,0,0,0.2)",
				}}
			>
				<AnimatePresence mode="wait">
					{isGenerating && (
						<motion.div
							key="loading"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="flex items-center justify-center"
						>
							<div className="h-6 w-6 rounded-full border-2 border-t-transparent border-blush animate-spin" />
						</motion.div>
					)}
					{!isGenerating && showJoke && currentJoke && (
						<motion.div
							key={currentJoke} // Key change triggers animation
							initial={{ opacity: 0, y: 20, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.9 }}
							transition={{
								duration: 0.5,
								type: "spring",
								stiffness: 120,
								damping: 12,
							}}
							className="text-lg sm:text-xl text-slate-100 leading-relaxed italic px-2"
						>
							{formatHumorText(currentJoke)}
						</motion.div>
					)}
					{!isGenerating && !showJoke && (
						<motion.p
							className="text-base sm:text-lg text-slate-400/80 italic font-light"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							Ready for a laugh?
						</motion.p>
					)}
				</AnimatePresence>
			</motion.div>

			<div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
				<motion.button
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					onClick={getRandomJoke}
					disabled={isGenerating}
					className={cn(
						"group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blush to-lilac",
						"font-semibold rounded-lg overflow-hidden transition-all duration-300",
						"text-dark-bg text-base sm:text-lg shadow-lg shadow-blush/20",
						"disabled:opacity-70 disabled:cursor-not-allowed",
						"after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity",
						"hover:after:opacity-10 hover:shadow-blush/30"
					)}
				>
					<span className="relative z-10 flex items-center justify-center gap-2">
						<span className="text-xl">💀</span>
						<span>Need a Laugh</span>
					</span>
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					onClick={toggleHumorMode}
					className={cn(
						"w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 bg-card-bg hover:bg-opacity-80",
						"text-slate-100 font-medium rounded-lg shadow-lg shadow-slate-900/30",
						"border border-blush/20 transition-all duration-300",
						"focus:outline-none focus:ring-2 focus:ring-blush/30"
					)}
				>
					<span>Mode: {humorModeLabels[humorMode]}</span>
				</motion.button>
			</div>
		</div>
	);
};

export default DarkHumorGenerator;
