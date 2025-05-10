import React, { useEffect, useState } from "react";

interface ScrollIndicatorProps {
	isLastSection?: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
	isLastSection = false,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;

			// Hide indicator when user has scrolled a bit
			if (scrollPosition > windowHeight * 0.3) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!isVisible || isLastSection) return null;

	return (
		<div className="scroll-indicator">
			<p className="text-xs text-neutral-400 mb-2 text-center">Scroll Down</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="mx-auto"
			>
				<path d="M12 5v14"></path>
				<path d="m19 12-7 7-7-7"></path>
			</svg>
		</div>
	);
};

export default ScrollIndicator;
