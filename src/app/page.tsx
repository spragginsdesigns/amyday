"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

import HeroSection from "@/components/HeroSection";
import TypewriterLetter from "@/components/TypewriterLetter";
import HoldToRevealMessage from "@/components/HoldToRevealMessage";
import ComplimentGenerator from "@/components/ComplimentGenerator";
import DarkHumorGenerator from "@/components/DarkHumorGenerator";
import AIChat from "@/components/AIChat";
import ScrollIndicator from "@/components/ScrollIndicator";

import { letterText, hiddenMessage } from "@/lib/messages";
import { compliments } from "@/lib/compliments";

const sectionVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

export default function Home() {
	// Ensure page starts at the top on load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="bg-gradient-to-br from-dark-bg via-black to-neutral-900 text-neutral-200">
			{/* 1. Hero Section */}
			<section id="hero" className="fullscreen-section">
				<div className="section-bg-shimmer" />
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={sectionVariants}
					viewport={{ once: false, amount: 0.8 }}
					className="container max-w-4xl"
				>
					<HeroSection />
				</motion.div>
				<ScrollIndicator />
			</section>

			{/* 2. Special Gift - Hidden Message */}
			<section className="fullscreen-section">
				<div className="section-bg-shimmer" />
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={sectionVariants}
					viewport={{ once: false, amount: 0.8 }}
					className="container max-w-4xl"
				>
					<h2 className="text-xl sm:text-3xl font-serif text-center text-blush mb-6 sm:mb-8 tracking-wider">
						A Special Gift For You
					</h2>
					<HoldToRevealMessage hiddenMessage={hiddenMessage} />
				</motion.div>
				<ScrollIndicator />
			</section>

			{/* 3. Letter Section */}
			<section className="fullscreen-section">
				<div className="section-bg-shimmer" />
				<div className="container max-w-4xl w-full">
					<TypewriterLetter text={letterText} />
				</div>
				<ScrollIndicator />
			</section>

			{/* 4. Reminder For You - Compliment Generator */}
			<section className="fullscreen-section">
				<div className="section-bg-shimmer" />
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={sectionVariants}
					viewport={{ once: false, amount: 0.8 }}
					className="container max-w-4xl"
				>
					<h2 className="text-xl sm:text-3xl font-serif text-center text-blush mb-6 sm:mb-8 tracking-wider">
						A Reminder For You
					</h2>
					<ComplimentGenerator compliments={compliments} />
				</motion.div>
				<ScrollIndicator />
			</section>

			{/* 5. Dark Humor */}
			<section className="fullscreen-section">
				<div className="section-bg-shimmer" />
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={sectionVariants}
					viewport={{ once: false, amount: 0.8 }}
					className="container max-w-4xl"
				>
					<DarkHumorGenerator />
				</motion.div>
				<ScrollIndicator />
			</section>

			{/* 6. Dark Amy AI */}
			<section className="fullscreen-section">
				<div className="section-bg-shimmer" />
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={sectionVariants}
					viewport={{ once: false, amount: 0.8 }}
					className="container max-w-4xl"
				>
					<div className="relative">
						<h2 className="text-xl sm:text-3xl font-serif text-center text-blush mb-3 sm:mb-4 tracking-wider">
							Meet &quot;Dark Amy&quot;
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
					</div>
				</motion.div>
				<ScrollIndicator />
			</section>

			{/* 7. Footer */}
			<section className="fullscreen-section">
				<div className="section-bg-shimmer" />
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={sectionVariants}
					viewport={{ once: false, amount: 0.8 }}
					className="container max-w-4xl"
				>
					<footer className="text-center text-neutral-400">
						<div className="sm:max-w-lg mx-auto px-4 py-8 rounded-lg glassmorphism">
							<h2 className="text-xl sm:text-3xl font-serif text-blush mb-4 tracking-wider">
								From Austin, With Love
							</h2>
							<p className="mb-6 text-sm sm:text-base">
								Every pixel of this site was crafted with you in mind. You
								deserve all the love and light in the world, Amy. I hope this
								digital gift brings you a smile today and always.
							</p>
							<div className="pt-4 border-t border-neutral-700/50">
								<p>Made with love for Amy, by Austin 💛</p>
								<p className="mt-2 text-sm">© {new Date().getFullYear()}</p>
							</div>
						</div>
					</footer>
				</motion.div>
				<ScrollIndicator isLastSection={true} />
			</section>
		</main>
	);
}
