"use client";

import React, { useState, useRef, useEffect } from "react";

interface VoicePlayerProps {
	audioSrc: string;
	musicSrc?: string; // Optional background music
}

const VoicePlayer: React.FC<VoicePlayerProps> = ({ audioSrc, musicSrc }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(70); // Default volume level
	const voiceRef = useRef<HTMLAudioElement>(null);
	const musicRef = useRef<HTMLAudioElement>(null);

	// Handle play/pause toggling
	const togglePlayback = () => {
		if (!voiceRef.current) return;

		if (isPlaying) {
			voiceRef.current.pause();
			if (musicRef.current) musicRef.current.pause();
		} else {
			voiceRef.current.play();
			if (musicRef.current) musicRef.current.play();
		}

		setIsPlaying(!isPlaying);
	};

	// Update volume for both audio elements
	const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number(event.target.value);
		setVolume(newVolume);

		if (voiceRef.current) voiceRef.current.volume = newVolume / 100;
		if (musicRef.current) musicRef.current.volume = (newVolume / 100) * 0.4; // Music at 40% of voice volume
	};

	// Handle the end of audio playback
	useEffect(() => {
		const handleEnded = () => {
			setIsPlaying(false);
		};

		const voiceEl = voiceRef.current;
		if (voiceEl) {
			voiceEl.addEventListener("ended", handleEnded);
		}

		return () => {
			if (voiceEl) {
				voiceEl.removeEventListener("ended", handleEnded);
			}
		};
	}, []);

	return (
		<div className="my-6 glassmorphism p-4">
			<div className="flex flex-col items-center space-y-4">
				<h3 className="text-xl font-serif text-blush">Listen to the Letter</h3>

				<button
					onClick={togglePlayback}
					className="px-6 py-2 rounded-full bg-lilac text-dark-bg hover:bg-blush transition-colors"
				>
					{isPlaying ? "Pause" : "Play"}
				</button>

				<div className="w-full max-w-xs flex items-center space-x-2">
					<span className="text-sm">🔈</span>
					<input
						type="range"
						min="0"
						max="100"
						value={volume}
						onChange={handleVolumeChange}
						className="w-full accent-blush"
					/>
					<span className="text-sm">🔊</span>
				</div>

				{/* Hidden audio elements */}
				<audio ref={voiceRef} src={audioSrc} preload="metadata" />
				{musicSrc && (
					<audio ref={musicRef} src={musicSrc} loop preload="metadata" />
				)}
			</div>
		</div>
	);
};

export default VoicePlayer;
