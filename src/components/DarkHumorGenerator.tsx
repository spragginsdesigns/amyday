"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	darkHumorLines,
	darkHumorLinesMild,
	darkHumorLinesSpicy,
} from "../lib/darkHumor";

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

const DarkHumorGenerator: React.FC = () => {
	const [currentJoke, setCurrentJoke] = useState<string>("");
	const [humorMode, setHumorMode] = useState<HumorMode>("default");
	const [showJoke, setShowJoke] = useState<boolean>(false);

	const getRandomJoke = () => {
		const lines = humorModeMap[humorMode];
		const randomIndex = Math.floor(Math.random() * lines.length);
		setCurrentJoke(lines[randomIndex]);
		setShowJoke(true);
	};

	const toggleHumorMode = () => {
		setHumorMode((prevMode) => {
			if (prevMode === "default") return "mild";
			if (prevMode === "mild") return "spicy";
			return "default"; // Cycle back to default from spicy
		});
		// Optionally, get a new joke when mode changes
		// getRandomJoke();
	};

	// Get a joke on initial load or when humorMode changes and no joke is shown
	useEffect(() => {
		if (!showJoke) {
			// You might want to load a joke on first render or not.
			// getRandomJoke();
		}
	}, [humorMode, showJoke]);

	return (
		<div className="my-8 p-6 rounded-xl shadow-2xl bg-slate-800/70 backdrop-blur-lg border border-slate-700 text-center max-w-md mx-auto">
			<h2 className="text-3xl font-bold text-rose-400 mb-6">Dark Humor Dose</h2>

			<div className="mb-6 min-h-[100px] flex items-center justify-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
				<AnimatePresence mode="wait">
					{showJoke && currentJoke && (
						<motion.p
							key={currentJoke} // Key change triggers animation
							initial={{ opacity: 0, y: 20, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.9 }}
							transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
							className="text-lg text-slate-200 italic"
						>
							{currentJoke}
						</motion.p>
					)}
					{!showJoke && <p className="text-slate-400">Ready for a laugh?</p>}
				</AnimatePresence>
			</div>

			<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
				<motion.button
					whileHover={{ scale: 1.05, rotate: -2 }}
					whileTap={{ scale: 0.95 }}
					onClick={getRandomJoke}
					className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300 text-lg"
				>
					💀 Need a Laugh
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={toggleHumorMode}
					className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-slate-100 font-medium rounded-lg shadow-md transition-colors duration-300"
				>
					Mode: {humorModeLabels[humorMode]}
				</motion.button>
			</div>
		</div>
	);
};

export default DarkHumorGenerator;
