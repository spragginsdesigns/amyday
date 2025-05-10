"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterLetterProps {
	text: string;
}

const TypewriterLetter: React.FC<TypewriterLetterProps> = ({ text }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTypingComplete, setIsTypingComplete] = useState(false);

	// Split the text into stanzas for poetic formatting
	const stanzas = text.split("\n\n");

	useEffect(() => {
		// If we haven't finished typing yet
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				// Add the next character to the displayed text
				setDisplayedText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prevIndex) => prevIndex + 1);
			}, 50); // Typing speed - adjust as needed

			return () => clearTimeout(timeout);
		} else {
			setIsTypingComplete(true);
		}
	}, [currentIndex, text]);

	// Format the displayed text with stanzas
	const formattedDisplayedText = () => {
		const result = [];
		let currentPosition = 0;

		for (let i = 0; i < stanzas.length; i++) {
			const stanzaLength = stanzas[i].length;
			// Get the portion of displayed text for this stanza
			const stanzaText = displayedText.substring(
				currentPosition,
				Math.min(currentPosition + stanzaLength, displayedText.length)
			);

			result.push(
				<motion.div
					key={i}
					className="mb-6 sm:mb-8 text-center stanza leading-normal"
					initial={{ opacity: 0.6 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: i * 0.2 }}
				>
					{stanzaText.split("\n").map((line, lineIndex) => (
						<div key={lineIndex} className="py-0.5">
							{line}
						</div>
					))}
				</motion.div>
			);

			// Move position forward, accounting for stanza text and the '\n\n' separator
			currentPosition += stanzaLength + 2;
		}

		return result;
	};

	return (
		<AnimatePresence>
			<motion.div
				className="p-6 sm:p-8 my-8 glassmorphism rounded-lg max-w-3xl mx-auto border border-blush/20"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className="text-center mb-8 sm:mb-10">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-blush mb-3 tracking-wide">
						God Sees It All
					</h1>
					<h2 className="text-lg sm:text-xl text-blush/80 font-serif italic mb-4">
						A Mother's Day Tribute to Amy
					</h2>
					<div className="w-16 sm:w-24 h-0.5 bg-blush/40 mx-auto rounded-full"></div>
				</div>

				<div className="font-serif text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-ivory/90 poem-content">
					{formattedDisplayedText()}
				</div>

				{isTypingComplete && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className="mt-8 sm:mt-10 flex flex-col items-center"
					>
						<motion.div
							className="mt-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 1 }}
						>
							<span className="text-xs sm:text-sm text-blush italic px-3 py-1.5 sm:px-4 sm:py-2 border border-blush/20 rounded-full bg-neutral-800/30 shadow-md">
								✨ A living tribute ✨
							</span>
						</motion.div>

						{/* Signature */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 1.2 }} // Slightly reduced delay
							className="mt-6 text-center"
						>
							{/* Refined font stack for better cursive rendering */}
							<p className="font-['Brush_Script_MT','Segoe_Script','Snell_Roundhand',cursive] text-lg sm:text-xl text-blush/90">
								By: Austin Spraggins
							</p>
						</motion.div>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default TypewriterLetter;
