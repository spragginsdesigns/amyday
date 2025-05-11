"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypewriterLetterProps {
	text: string;
}

const TypewriterLetter: React.FC<TypewriterLetterProps> = ({ text }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTypingComplete, setIsTypingComplete] = useState(false);
	const [showProverbs, setShowProverbs] = useState(false);
	const [hasStartedTyping, setHasStartedTyping] = useState(true); // Default to true to start typing immediately
	const containerRef = useRef(null);

	// Extract proverbs quote from the text
	const mainTextAndProverbs = text.split('<div class="proverbs-quote">');
	const mainText = mainTextAndProverbs[0];
	const proverbsText = mainTextAndProverbs.length > 1 ? '<div class="proverbs-quote fade-in">' + mainTextAndProverbs[1] : "";

	// Split the main text into stanzas for poetic formatting
	const stanzas = mainText.split("\n\n");

	useEffect(() => {
		// Start typing immediately without waiting for view
		setHasStartedTyping(true);
	}, []);

	useEffect(() => {
		// If we have started typing and haven't finished
		if (hasStartedTyping && currentIndex < mainText.length) {
			const timeout = setTimeout(() => {
				// Add the next character to the displayed text
				setDisplayedText((prev) => prev + mainText[currentIndex]);
				setCurrentIndex((prevIndex) => prevIndex + 1);
			}, 50); // Typing speed - adjust as needed

			return () => clearTimeout(timeout);
		} else if (hasStartedTyping && currentIndex >= mainText.length) {
			setIsTypingComplete(true);
			// Show proverbs with a slight delay after typing is complete
			setTimeout(() => {
				setShowProverbs(true);
			}, 1000);
		}
	}, [currentIndex, mainText, hasStartedTyping]);

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
				<div key={i} className="mb-6 sm:mb-8 text-center stanza leading-normal">
					{stanzaText.split("\n").map((line, lineIndex) => (
						<div
							key={lineIndex}
							className="py-0.5"
							dangerouslySetInnerHTML={{ __html: line }}
						/>
					))}
				</div>
			);

			// Move position forward, accounting for stanza text and the '\n\n' separator
			currentPosition += stanzaLength + 2;
		}

		return result;
	};

	return (
		<div
			ref={containerRef}
			className="p-6 sm:p-8 my-8 glassmorphism rounded-lg max-w-3xl mx-auto border border-blush/20"
		>
			<div className="text-center mb-8 sm:mb-10">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-blush mb-3 tracking-wide">
					God Sees It All
				</h1>
				<h2 className="text-lg sm:text-xl text-blush/80 font-serif italic mb-4">
					A Mother&apos;s Day Tribute to Amy
				</h2>
				<div className="w-16 sm:w-24 h-0.5 bg-blush/40 mx-auto rounded-full"></div>
			</div>

			<div className="font-serif text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-ivory/90 poem-content">
				{hasStartedTyping ? formattedDisplayedText() : null}
				
				{/* Proverbs quote with fade-in */}
				{showProverbs && (
					<div dangerouslySetInnerHTML={{ __html: proverbsText }} />
				)}
			</div>

			{isTypingComplete && (
				<div className="mt-8 sm:mt-10 flex flex-col items-center">
					

					{/* Signature */}
					<div className="mt-6 text-center">
						{/* Refined font stack for better cursive rendering */}
						<p className="font-['Brush_Script_MT','Segoe_Script','Snell_Roundhand',cursive] text-lg sm:text-xl text-blush/90">
							By: Austin Spraggins
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default TypewriterLetter;
