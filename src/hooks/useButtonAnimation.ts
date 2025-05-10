import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to manage button animation state
 * @param duration Animation duration in milliseconds
 * @returns Animation state and trigger function
 */
export function useButtonAnimation(duration = 1000) {
	const [isAnimating, setIsAnimating] = useState(false);

	// Reset animation state after duration
	useEffect(() => {
		if (!isAnimating) return;

		const timer = setTimeout(() => {
			setIsAnimating(false);
		}, duration);

		// Cleanup timer on unmount or when isAnimating changes
		return () => clearTimeout(timer);
	}, [isAnimating, duration]);

	// Callback to trigger animation
	const triggerAnimation = useCallback(() => {
		// Reset animation before starting a new one (ensures it triggers again if already animating)
		if (isAnimating) {
			setIsAnimating(false);
			// Use requestAnimationFrame to ensure the state update is processed
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setIsAnimating(true);
				});
			});
		} else {
			setIsAnimating(true);
		}
	}, [isAnimating]);

	return { isAnimating, triggerAnimation };
}
