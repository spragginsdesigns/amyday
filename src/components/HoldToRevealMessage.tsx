"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoldToRevealMessageProps {
	hiddenMessage: string;
}

const GiftBox: React.FC<{ isOpening: boolean; progress: number }> = ({
	isOpening,
	progress,
}) => {
	// Colors for the gift
	const ribbonColor = "#f9a8d4"; // Pink ribbon
	const boxColor = "#ffe4e6"; // Light pink box
	const boxShadowColor = "#fda4af"; // Slightly darker for depth

	return (
		<div className="relative w-48 h-48 mx-auto">
			{/* Box base */}
			<motion.div
				initial={{ scale: 1 }}
				animate={{
					scale: isOpening ? 1.05 : 1,
					boxShadow: isOpening
						? "0 10px 25px rgba(249, 168, 212, 0.5)"
						: "0 4px 6px rgba(249, 168, 212, 0.2)",
				}}
				transition={{ duration: 0.3 }}
				className="absolute inset-0 rounded-lg"
				style={{
					backgroundColor: boxColor,
					borderBottom: `4px solid ${boxShadowColor}`,
					transform: "translateY(0)",
				}}
			/>

			{/* Box lid - scales down/slides up when opened */}
			<motion.div
				initial={{ y: 0, scaleY: 1 }}
				animate={{
					y: isOpening ? -40 - progress * 50 : 0,
					scaleY: isOpening ? 0.8 : 1,
					opacity: isOpening ? 0.8 - progress * 0.8 : 1,
				}}
				transition={{ duration: 0.3 }}
				className="absolute inset-0 rounded-lg origin-bottom"
				style={{
					backgroundColor: boxColor,
					borderTop: `4px solid ${boxShadowColor}`,
				}}
			/>

			{/* Vertical ribbon */}
			<motion.div
				initial={{ height: "100%" }}
				animate={{
					height: isOpening ? `${100 - progress * 100}%` : "100%",
					opacity: isOpening ? 1 - progress : 1,
				}}
				transition={{ duration: 0.3 }}
				className="absolute left-1/2 top-0 w-6 -ml-3 origin-top"
				style={{
					backgroundColor: ribbonColor,
				}}
			/>

			{/* Horizontal ribbon */}
			<motion.div
				initial={{ width: "100%" }}
				animate={{
					width: isOpening ? `${100 - progress * 100}%` : "100%",
					opacity: isOpening ? 1 - progress : 1,
				}}
				transition={{ duration: 0.3 }}
				className="absolute top-1/2 left-0 h-6 -mt-3 origin-left"
				style={{
					backgroundColor: ribbonColor,
				}}
			/>

			{/* Center bow/knot */}
			<motion.div
				initial={{ rotate: 0, scale: 1 }}
				animate={{
					rotate: isOpening ? 45 + progress * 45 : 0,
					scale: isOpening ? 0.8 - progress * 0.6 : 1,
					opacity: isOpening ? 1 - progress : 1,
					y: isOpening ? -20 * progress : 0,
				}}
				transition={{ duration: 0.4 }}
				className="absolute left-1/2 top-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full z-10"
				style={{ backgroundColor: ribbonColor }}
			>
				{/* Bow decoration */}
				<motion.div
					className="absolute -left-3 -top-2 w-6 h-8 rounded-full"
					style={{ backgroundColor: ribbonColor, transform: "rotate(-30deg)" }}
					animate={{
						opacity: isOpening ? 1 - progress : 1,
						x: isOpening ? -10 * progress : 0,
						rotate: isOpening ? -30 - 20 * progress : -30,
					}}
				/>
				<motion.div
					className="absolute -right-3 -top-2 w-6 h-8 rounded-full"
					style={{ backgroundColor: ribbonColor, transform: "rotate(30deg)" }}
					animate={{
						opacity: isOpening ? 1 - progress : 1,
						x: isOpening ? 10 * progress : 0,
						rotate: isOpening ? 30 + 20 * progress : 30,
					}}
				/>
			</motion.div>

			{/* Glow effect when opening */}
			{isOpening && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: progress * 0.7 }}
					className="absolute inset-0 rounded-lg z-0"
					style={{
						background: `radial-gradient(circle, rgba(249,168,212,0.6) 0%, rgba(255,228,230,0) 70%)`,
						filter: "blur(10px)",
					}}
				/>
			)}
		</div>
	);
};

const HoldToRevealMessage = ({
	hiddenMessage,
}: HoldToRevealMessageProps): React.ReactNode => {
	const [isRevealed, setIsRevealed] = useState(false);
	const [isOpening, setIsOpening] = useState(false);
	const [holdProgress, setHoldProgress] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const holdStartTimeRef = useRef<number | null>(null);
	const holdDuration = 1500; // Slightly longer duration (1.5s) for more satisfying experience
	const [showSparkles, setShowSparkles] = useState(false);

	// Format the message with paragraph breaks at natural points
	const formatMessageWithBreaks = (
		message: string
	): {
		mobile: React.ReactNode[];
		desktop: React.ReactNode[];
	} => {
		// Split the message into paragraphs (these will become columns on desktop)
		const paragraphs = message
			.replace(". You", ".\n\nYou")
			.replace("grace has", "grace\nhas")
			.replace("resilience.", "resilience.\n\n")
			.replace("becoming.", "becoming.\n\n")
			.replace("eternal.", "eternal.\n\n")
			.split("\n\n");

		// For mobile: render as regular paragraphs with better spacing
		const mobileParagraphs = paragraphs.map((paragraph, index) => (
			<p
				key={`mobile-${index}`}
				className={`mb-6 ${index === paragraphs.length - 1 ? "mb-0" : ""}`}
			>
				{paragraph.split("\n").map((line, lineIndex) => (
					<React.Fragment key={`mobile-${index}-${lineIndex}`}>
						{line}
						{lineIndex < paragraph.split("\n").length - 1 && <br />}
					</React.Fragment>
				))}
			</p>
		));

		// For desktop: render as columns
		const desktopColumns = paragraphs.map((paragraph, index) => (
			<div key={`desktop-${index}`} className="flex-1 px-4 min-w-[200px]">
				{paragraph.split("\n").map((line, lineIndex) => (
					<React.Fragment key={`desktop-${index}-${lineIndex}`}>
						{line}
						{lineIndex < paragraph.split("\n").length - 1 && <br />}
					</React.Fragment>
				))}
			</div>
		));

		return {
			mobile: mobileParagraphs,
			desktop: desktopColumns,
		};
	};

	// Clean up interval on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const startHold = () => {
		// Clear any existing interval
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		holdStartTimeRef.current = Date.now();
		// Don't reset isRevealed if it's already true (fixes flash of content)
		if (!isRevealed) {
			setIsOpening(true);
			setHoldProgress(0);
			setShowSparkles(false);
		}

		intervalRef.current = setInterval(() => {
			if (holdStartTimeRef.current) {
				const elapsed = Date.now() - holdStartTimeRef.current;
				const progress = Math.min(elapsed / holdDuration, 1);

				// Update progress consistently
				setHoldProgress(progress);

				// Only trigger the reveal exactly at 100%
				if (progress >= 1) {
					// Complete the animation cycle
					setIsRevealed(true);
					setTimeout(() => {
						setShowSparkles(true);
					}, 200); // Slight delay for sparkles for better visual sequence

					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
				}
			}
		}, 16); // Use 16ms for smoother 60fps animation
	};

	const endHold = () => {
		// Clear the interval
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		holdStartTimeRef.current = null;

		// Only reset if we haven't reached full progress
		if (holdProgress < 1) {
			setHoldProgress(0);
			setIsOpening(false);
			setShowSparkles(false);
		}
	};

	// Toggle function to handle closing and opening the gift
	const toggleGift = () => {
		if (isRevealed) {
			setIsRevealed(false);
			setIsOpening(false);
			setHoldProgress(0);
			setShowSparkles(false);
		} else {
			startHold();
		}
	};

	// Handle events conditionally but always provide a handler function
	const handleMouseDown = () => {
		if (isRevealed) {
			toggleGift();
		} else {
			startHold();
		}
	};

	const handleMouseUp = () => {
		if (!isRevealed) {
			endHold();
		}
	};

	const handleMouseLeave = () => {
		if (!isRevealed) {
			endHold();
		}
	};

	const handleTouchStart = () => {
		if (isRevealed) {
			toggleGift();
		} else {
			startHold();
		}
	};

	const handleTouchEnd = () => {
		if (!isRevealed) {
			endHold();
		}
	};

	return (
		<div className="my-12 text-center">
			<motion.h3
				className="text-xl sm:text-2xl font-serif text-blush mb-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.7 }}
			>
				A Special Gift For You
			</motion.h3>

			<div className="relative">
				{/* Touch instruction message - adapt based on state */}
				<motion.p
					className="text-sm text-neutral-300 mb-6 italic"
					initial={{ opacity: 0 }}
					animate={{ opacity: isRevealed ? 0 : 1 }}
					transition={{ duration: 0.5 }}
				>
					Press and hold to unwrap your gift...
				</motion.p>

				{/* Main gift interaction area */}
				<div
					className="relative mx-auto w-64 h-64 flex items-center justify-center cursor-pointer select-none"
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseLeave}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					{/* Progress indicator ring (only visible during hold) - Place it behind everything else */}
					{isOpening && !isRevealed && (
						<svg
							className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-70 z-0"
							viewBox="0 0 100 100"
						>
							<circle
								className="text-neutral-600 stroke-current"
								strokeWidth="2"
								fill="transparent"
								r="48"
								cx="50"
								cy="50"
							/>
							<circle
								className="text-blush stroke-current"
								strokeWidth="3"
								strokeLinecap="round"
								fill="transparent"
								r="48"
								cx="50"
								cy="50"
								style={{
									strokeDasharray: `${holdProgress * 302}, 302`, // 2πr ≈ 302 for r=48
									transition: "stroke-dasharray 0.05s linear", // Smoother updates
								}}
							/>
						</svg>
					)}

					{/* Container for either the gift or the revealed message */}
					<motion.div
						whileHover={{ scale: isRevealed ? 1 : 1.03 }}
						whileTap={{ scale: 0.98 }}
						className="w-full h-full flex items-center justify-center relative z-10"
					>
						{/* The gift box - only show when not revealed */}
						{!isRevealed && (
							<GiftBox isOpening={isOpening} progress={holdProgress} />
						)}
					</motion.div>
				</div>

				{/* Revealed message - Use absolute positioning instead of fixed for better mobile experience */}
				<AnimatePresence mode="wait">
					{isRevealed && (
						<motion.div
							className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center p-4 sm:p-6 min-h-[400px]"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.8 }}
							transition={{ duration: 0.5, type: "spring" }}
							onClick={toggleGift}
						>
							<motion.div
								className="p-4 sm:p-6 md:p-8 glassmorphism border border-blush/40 rounded-xl cursor-pointer mx-auto shadow-xl max-h-[80vh] overflow-y-auto"
								initial={{ y: 20 }}
								animate={{ y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								style={{
									background: "rgba(30, 30, 46, 0.95)",
									backdropFilter: "blur(12px)",
									width: "100%",
									maxWidth: "600px",
								}}
							>
								{/* Mobile layout (single column) */}
								<motion.div
									className="md:hidden text-base sm:text-lg leading-loose tracking-wide text-left pb-2"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3, duration: 0.5 }}
									style={{
										background: "linear-gradient(to right, #f9a8d4, #d8b4fe)",
										backgroundClip: "text",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
										textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
										fontWeight: 500,
									}}
								>
									{formatMessageWithBreaks(hiddenMessage).mobile}
								</motion.div>

								{/* Desktop layout (multi-column) */}
								<motion.div
									className="hidden md:flex flex-row gap-8 text-lg lg:text-xl leading-loose tracking-wide"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3, duration: 0.5 }}
									style={{
										background: "linear-gradient(to right, #f9a8d4, #d8b4fe)",
										backgroundClip: "text",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
										textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
										fontWeight: 500,
									}}
								>
									{formatMessageWithBreaks(hiddenMessage).desktop}
								</motion.div>

								{/* Hint to show it's clickable */}
								<motion.p
									className="text-xs sm:text-sm mt-6 text-blush/90 italic text-center font-medium"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.8, duration: 0.5 }}
								>
									Tap to close
								</motion.p>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Sparkles effect - moved here to be above everything else */}
				<AnimatePresence>
					{showSparkles && (
						<motion.div
							className="absolute inset-0 pointer-events-none z-30"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{[...Array(12)].map((_, i) => (
								<motion.div
									key={i}
									className="absolute w-2 h-2 rounded-full"
									initial={{
										x: "50%",
										y: "50%",
										scale: 0,
										opacity: 1,
									}}
									animate={{
										x: `${50 + (Math.random() * 100 - 50)}%`,
										y: `${50 + (Math.random() * 100 - 50)}%`,
										scale: Math.random() * 2 + 1,
										opacity: 0,
									}}
									transition={{
										duration: Math.random() * 1 + 0.5,
										ease: "easeOut",
										delay: Math.random() * 0.2,
									}}
									style={{
										left: `calc(50% - 1rem)`,
										top: `calc(50% - 1rem)`,
										background: `radial-gradient(circle, rgba(252,231,121,1) 0%, rgba(252,211,77,1) 100%)`,
										boxShadow: "0 0 10px rgba(252,211,77,0.8)",
									}}
								/>
							))}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Retry button - only show after message is revealed */}
				<AnimatePresence>
					{isRevealed && (
						<motion.button
							onClick={toggleGift}
							className="mt-8 px-4 py-2 bg-blush/30 hover:bg-blush/50 rounded-full text-sm border border-blush/40 transition-all duration-300 text-ivory"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ delay: 0.5, duration: 0.3 }}
						>
							Wrap it back up
						</motion.button>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default HoldToRevealMessage;
