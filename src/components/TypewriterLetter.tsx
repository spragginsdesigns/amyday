"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterLetterProps {
	text: string;
}

const TypewriterLetter: React.FC<TypewriterLetterProps> = ({ text }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTypingComplete, setIsTypingComplete] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// Split the text into stanzas for poetic formatting
	const stanzas = text.split("\n\n");

	useEffect(() => {
		// Initialize audio
		audioRef.current = new Audio("/audio/poem-background.mp3");
		audioRef.current.loop = true;
		audioRef.current.volume = 0.3;

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = "";
			}
		};
	}, []);

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
					className="mb-8 text-center leading-relaxed stanza"
					initial={{ opacity: 0.6 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: i * 0.2 }}
				>
					{stanzaText.split("\n").map((line, lineIndex) => (
						<div key={lineIndex} className="py-1">
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

	const toggleAudio = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			audioRef.current.volume = parseFloat(e.target.value) / 100;
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				className="p-8 my-8 glassmorphism rounded-lg max-w-3xl mx-auto border border-blush/20"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className="text-center mb-8">
					<h2 className="text-2xl font-serif text-blush mb-2">
						Listen to the Letter
					</h2>
					<div className="w-16 h-1 bg-blush/40 mx-auto rounded-full"></div>
				</div>

				<div className="font-serif text-lg md:text-xl leading-loose text-ivory/90 poem-content">
					{formattedDisplayedText()}
				</div>

				{isTypingComplete && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className="mt-10 flex flex-col items-center"
					>
						<div className="audio-controls flex flex-col items-center space-y-4 w-full">
							<button
								onClick={toggleAudio}
								className="px-6 py-2 bg-blush/20 hover:bg-blush/30 rounded-full transition-all text-ivory"
							>
								{isPlaying ? "Pause" : "Play Background Music"}
							</button>
							<div className="flex items-center w-full max-w-sm justify-center mt-4">
								<button className="text-blush/80 mx-2">
									<span
										className={`${
											!isPlaying || audioRef.current?.volume === 0
												? "opacity-50"
												: "opacity-100"
										}`}
									>
										🔊
									</span>
								</button>
								<input
									type="range"
									min="0"
									max="100"
									defaultValue="30"
									onChange={handleVolumeChange}
									className="w-full h-2 bg-blush/20 rounded-lg appearance-none cursor-pointer accent-blush"
								/>
								<button className="text-blush/80 mx-2">
									<span
										className={`${
											!isPlaying || audioRef.current?.volume === 1
												? "opacity-50"
												: "opacity-100"
										}`}
									>
										🔊
									</span>
								</button>
							</div>
						</div>

						<motion.div
							className="mt-8"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 1 }}
						>
							<span className="text-sm text-blush italic px-4 py-2 border border-blush/20 rounded-full">
								✨ A living tribute ✨
							</span>
						</motion.div>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default TypewriterLetter;
