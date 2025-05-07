"use client";

import React from "react";

import HeroSection from "@/components/HeroSection";
import TypewriterLetter from "@/components/TypewriterLetter";
import HoldToRevealMessage from "@/components/HoldToRevealMessage";
import ComplimentGenerator from "@/components/ComplimentGenerator";
import VoicePlayer from "@/components/VoicePlayer";
import DarkHumorGenerator from "@/components/DarkHumorGenerator"; // Added import

import { letterText, hiddenMessage } from "@/lib/messages";
import { compliments } from "@/lib/compliments";

export default function Home() {
	return (
		<main className="min-h-screen pb-16 bg-gradient-to-b from-dark-bg to-gray-900">
			<div className="container px-4 mx-auto max-w-3xl">
				{/* Welcome Section */}
				<HeroSection />

				{/* Letter Section */}
				<TypewriterLetter text={letterText} />

				{/* Audio Player */}
				<VoicePlayer
					audioSrc="/audio/letter.mp3"
					musicSrc="/audio/background.mp3"
				/>

				{/* Hidden Message */}
				<div className="my-12">
					<hr className="border-gray-700 my-8" />
					<HoldToRevealMessage hiddenMessage={hiddenMessage} />
				</div>

				{/* Compliment Generator */}
				<div className="my-12">
					<hr className="border-gray-700 my-8" />
					<h2 className="text-2xl font-serif text-center text-blush mb-6">
						A Reminder For You
					</h2>
					<ComplimentGenerator compliments={compliments} />
				</div>

				{/* Dark Humor Generator */}
				<div className="my-12">
					<hr className="border-gray-700 my-8" />
					<DarkHumorGenerator />
				</div>

				{/* Footer */}
				<footer className="mt-16 text-center text-sm text-gray-500">
					<p>Made with love for Amy, by Austin 💛</p>
					<p className="mt-2">© {new Date().getFullYear()}</p>
				</footer>
			</div>
		</main>
	);
}
