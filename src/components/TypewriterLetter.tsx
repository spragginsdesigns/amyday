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

	// Split the text into paragraphs for better formatting
	const paragraphs = text.split("\n\n");

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

	// Format the displayed text with paragraphs
	const formattedDisplayedText = () => {
		const result = [];
		let currentPosition = 0;

		for (let i = 0; i < paragraphs.length; i++) {
			const paragraphLength = paragraphs[i].length;
			// Get the portion of displayed text for this paragraph
			const paragraphText = displayedText.substring(
				currentPosition,
				Math.min(currentPosition + paragraphLength, displayedText.length)
			);

			result.push(
				<p key={i} className="mb-4">
					{paragraphText}
				</p>
			);

			// Move position forward, accounting for paragraph text and the '\n\n' separator
			currentPosition += paragraphLength + 2;
		}

		return result;
	};

	return (
		<AnimatePresence>
			<motion.div
				className="p-6 my-8 glassmorphism"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className="text-lg font-serif leading-relaxed text-ivory">
					{formattedDisplayedText()}
				</div>

				{isTypingComplete && (
					<motion.div
						className="mt-4 flex justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<span className="text-sm text-blush italic">
							✨ Message from Austin ✨
						</span>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default TypewriterLetter;
