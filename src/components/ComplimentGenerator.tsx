"use client";

import React, { useState } from "react";
import { useButtonAnimation } from "../hooks/useButtonAnimation";

interface ComplimentGeneratorProps {
	compliments: string[];
}

const ComplimentGenerator: React.FC<ComplimentGeneratorProps> = ({
	compliments,
}) => {
	const [compliment, setCompliment] = useState(
		"Click the button for a nice thought!"
	);

	const { isAnimating, triggerAnimation } = useButtonAnimation();

	const getRandomCompliment = () => {
		triggerAnimation();

		if (compliments.length === 0) {
			setCompliment(
				"No compliments available right now, but you're still amazing!"
			);
			return;
		}
		const randomIndex = Math.floor(Math.random() * compliments.length);
		setCompliment(compliments[randomIndex]);
	};

	return (
		<div className="my-8 text-center">
			<button
				onClick={getRandomCompliment}
				className={`px-8 py-4 font-bold rounded-lg bg-blush text-dark-bg transition-all duration-300 ease-in-out hover:bg-lilac focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-opacity-50 shadow-md hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden
					${isAnimating ? "animate-button-pulse" : ""}
				`}
				aria-label="Generate random compliment"
			>
				<span
					className={`relative z-10 ${isAnimating ? "animate-text-float" : ""}`}
				>
					Brighten My Day!
				</span>

				{/* Particle effects */}
				{isAnimating && (
					<>
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-sweep-shine"></span>
						<span className="absolute -inset-1 bg-glow opacity-0 animate-pulse-glow rounded-lg"></span>
						<span className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-white opacity-0 animate-particle-topLeft"></span>
						<span className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-white opacity-0 animate-particle-topRight"></span>
						<span className="absolute -left-4 -bottom-4 w-8 h-8 rounded-full bg-white opacity-0 animate-particle-bottomLeft"></span>
						<span className="absolute -right-4 -bottom-4 w-8 h-8 rounded-full bg-white opacity-0 animate-particle-bottomRight"></span>
					</>
				)}
			</button>

			{compliment && (
				<div className="mt-6 p-6 glassmorphism min-h-[80px] flex items-center justify-center">
					<p className="text-xl italic text-ivory">{compliment}</p>
				</div>
			)}
		</div>
	);
};

export default ComplimentGenerator;
