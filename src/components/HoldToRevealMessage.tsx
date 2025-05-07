"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoldToRevealMessageProps {
	hiddenMessage: string;
}

const HoldToRevealMessage: React.FC<HoldToRevealMessageProps> = ({
	hiddenMessage,
}) => {
	const [isRevealed, setIsRevealed] = useState(false);
	const [holdProgress, setHoldProgress] = useState(0);
	const [holdStartTime, setHoldStartTime] = useState<number | null>(null);
	const holdDuration = 1000; // 1 second hold to reveal

	const startHold = () => {
		setHoldStartTime(Date.now());
		setIsRevealed(false);

		const interval = setInterval(() => {
			if (holdStartTime) {
				const elapsed = Date.now() - holdStartTime;
				const progress = Math.min(elapsed / holdDuration, 1);
				setHoldProgress(progress);

				if (progress >= 1) {
					setIsRevealed(true);
					clearInterval(interval);
				}
			}
		}, 10);

		return () => clearInterval(interval);
	};

	const endHold = () => {
		setHoldStartTime(null);
		if (holdProgress < 1) {
			setHoldProgress(0);
			setIsRevealed(false);
		}
	};

	return (
		<div className="my-12 text-center">
			<h3 className="text-xl font-serif text-muted-rose mb-4">
				Something special just for you...
			</h3>

			<div className="relative inline-block">
				<motion.button
					onMouseDown={startHold}
					onMouseUp={endHold}
					onMouseLeave={endHold}
					onTouchStart={startHold}
					onTouchEnd={endHold}
					className="px-8 py-4 font-semibold rounded-lg bg-gradient-to-r from-lilac to-blush text-dark-bg transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blush focus:ring-opacity-50 relative overflow-hidden"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="relative z-10">Hold to Reveal a Message</span>
					<motion.div
						className="absolute bottom-0 left-0 h-full bg-muted-rose opacity-50"
						style={{ width: `${holdProgress * 100}%` }}
					/>
				</motion.button>
			</div>

			<AnimatePresence>
				{isRevealed && (
					<motion.div
						className="mt-6 p-6 glassmorphism max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 10, height: 0 }}
						animate={{ opacity: 1, y: 0, height: "auto" }}
						exit={{ opacity: 0, y: 10, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						<motion.p
							className="text-xl text-ivory"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							{hiddenMessage}
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default HoldToRevealMessage;
