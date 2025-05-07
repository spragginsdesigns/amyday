"use client";

import React from "react";

import HeroSection from "@/components/HeroSection";
import TypewriterLetter from "@/components/TypewriterLetter";
import HoldToRevealMessage from "@/components/HoldToRevealMessage";
import ComplimentGenerator from "@/components/ComplimentGenerator";
import DarkHumorGenerator from "@/components/DarkHumorGenerator";
import AIChat from "@/components/AIChat";

import { letterText, hiddenMessage } from "@/lib/messages";
import { compliments } from "@/lib/compliments";

export default function Home() {
	return (
		<main className="min-h-screen pb-24 bg-gradient-to-br from-dark-bg via-black to-neutral-900 text-neutral-200">
			<div className="container px-6 sm:px-8 mx-auto max-w-4xl">
				{/* Welcome Section */}
				<HeroSection />

				{/* AI Chat - Custom built by Austin */}
				<div className="my-12 relative">
					<hr className="border-neutral-700/50 my-12 sm:my-16" />
					<div className="absolute -top-3 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs px-3 py-1 rounded-full text-white font-medium animate-pulse">
						New!
					</div>
					<h2 className="text-3xl font-serif text-center text-blush mb-4 tracking-wider">
						Meet Dark Amy AI
					</h2>
					<p className="text-center text-neutral-400 mb-8">
						Austin built me just for you.
					</p>
					<AIChat />
				</div>

				{/* Letter Section */}
				<TypewriterLetter text={letterText} />

				{/* Hidden Message */}
				<div className="my-12">
					<hr className="border-neutral-700/50 my-12 sm:my-16" />
					<HoldToRevealMessage hiddenMessage={hiddenMessage} />
				</div>

				{/* Compliment Generator */}
				<div className="my-12">
					<hr className="border-neutral-700/50 my-12 sm:my-16" />
					<h2 className="text-3xl font-serif text-center text-blush mb-8 tracking-wider">
						A Reminder For You
					</h2>
					<ComplimentGenerator compliments={compliments} />
				</div>

				{/* Dark Humor Generator */}
				<div className="my-12">
					<hr className="border-neutral-700/50 my-12 sm:my-16" />
					<DarkHumorGenerator />
				</div>

				{/* Footer */}
				<footer className="mt-24 pt-8 border-t border-neutral-700/50 text-center text-sm text-neutral-400">
					<p>Made with love for Amy, by Austin 💛</p>
					<p className="mt-2">© {new Date().getFullYear()}</p>
				</footer>
			</div>
		</main>
	);
}
