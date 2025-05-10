"use client";

import React from "react";
import { motion } from "framer-motion";

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
		<main className="min-h-screen pb-8 sm:pb-24 bg-gradient-to-br from-dark-bg via-black to-neutral-900 text-neutral-200">
			<div className="container px-2 sm:px-6 md:px-8 mx-auto max-w-4xl">
				{/* Welcome Section */}
				<HeroSection />

				{/* Hidden Message as Present */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
					className="my-10 sm:my-12"
				>
					<hr className="border-neutral-700/50 my-8 sm:my-16" />
					<HoldToRevealMessage hiddenMessage={hiddenMessage} />
				</motion.div>

				{/* AI Chat - Custom built by Austin */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
					className="my-10 sm:my-20 relative"
				>
					<hr className="border-neutral-700/50 my-8 sm:my-16" />
					<div className="absolute -top-3 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs px-3 py-1 rounded-full text-white font-medium animate-pulse shadow-glow">
						New!
					</div>
					<h2 className="text-xl sm:text-3xl font-serif text-center text-blush mb-3 sm:mb-4 tracking-wider">
						Meet "Dark Amy"
					</h2>
					<p className="text-center text-xs sm:text-base text-neutral-400 mb-6 sm:mb-8 max-w-lg mx-auto">
						Austin built me with a touch of your darkness.
						<br />
						<span className="block mt-2 italic">
							Talk to me anytime... if you&apos;re brave enough.
						</span>
					</p>
					<div className="glassmorphism rounded-lg p-1 border border-blush/30 shadow-xl">
						<AIChat />
					</div>
					<p className="text-xs text-center text-neutral-500 mt-3 sm:mt-4 italic">
						Your conversations are private and not stored anywhere
					</p>
				</motion.div>

				{/* Letter Section */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
					className="my-10 sm:my-12"
				>
					<TypewriterLetter text={letterText} />
				</motion.div>

				{/* Compliment Generator */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
					className="my-10 sm:my-12"
				>
					<hr className="border-neutral-700/50 my-8 sm:my-16" />
					<h2 className="text-xl sm:text-3xl font-serif text-center text-blush mb-6 sm:mb-8 tracking-wider">
						A Reminder For You
					</h2>
					<ComplimentGenerator compliments={compliments} />
				</motion.div>

				{/* Dark Humor Generator */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
					className="my-10 sm:my-12"
				>
					<hr className="border-neutral-700/50 my-8 sm:my-16" />
					<DarkHumorGenerator />
				</motion.div>

				{/* Footer */}
				<motion.footer
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
					className="mt-10 sm:mt-24 pt-8 border-t border-neutral-700/50 text-center text-xs sm:text-sm text-neutral-400"
				>
					<p>Made with love for Amy, by Austin 💛</p>
					<p className="mt-2">© {new Date().getFullYear()}</p>
				</motion.footer>
			</div>
		</main>
	);
}
