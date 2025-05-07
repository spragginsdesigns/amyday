"use client";

import React, { useState } from "react";

interface ComplimentGeneratorProps {
	compliments: string[];
}

const ComplimentGenerator: React.FC<ComplimentGeneratorProps> = ({
	compliments,
}) => {
	const [compliment, setCompliment] = useState(
		"Click the button for a nice thought!"
	);

	const getRandomCompliment = () => {
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
				className="px-8 py-4 font-bold rounded-lg bg-blush text-dark-bg transition-all duration-300 ease-in-out hover:bg-lilac focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-opacity-50 shadow-md hover:shadow-lg transform hover:-translate-y-1"
			>
				Brighten My Day!
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
