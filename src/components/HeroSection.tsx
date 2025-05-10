"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Utility: Confetti animation for Mother's Day (mobile-friendly)
function launchConfetti() {
	if (typeof window === "undefined") return;
	// @ts-ignore: No type declarations for canvas-confetti
	import("canvas-confetti")
		.then((confetti) => {
			confetti.default({
				particleCount: 80,
				spread: 70,
				origin: { y: 0.6 },
				colors: ["#eab1d5", "#f9c2ff", "#f7e1ff", "#fbb6ce", "#fcd34d"],
			});
		})
		.catch(() => {});
}

const HeroSection: React.FC = () => {
	useEffect(() => {
		launchConfetti();
	}, []);

	return (
		<section className="min-h-[90vh] flex flex-col justify-center items-center py-10 sm:py-20 text-center relative">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
				className="w-full"
			>
				<motion.h1
					className="text-4xl sm:text-5xl md:text-6xl font-dancing-script text-blush mb-4 sm:mb-6 tracking-wider drop-shadow-lg"
					initial={{ opacity: 0, filter: "blur(8px)" }}
					animate={{ opacity: 1, filter: "blur(0px)" }}
					transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
					style={{
						fontFamily: "var(--font-dancing-script)",
						textShadow: "0 0 15px rgba(212, 137, 168, 0.3)",
					}}
				>
					Happy Mother&apos;s Day, Amy!
				</motion.h1>
				<motion.div
					className="mt-2 sm:mt-6 flex justify-center"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
				>
					<span className="inline-block px-4 py-1 rounded-full bg-card-bg/30 backdrop-blur-sm text-muted-rose text-base sm:text-lg">
						✨ A living tribute ✨
					</span>
				</motion.div>
				<motion.p
					className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-300 font-serif animate-pulse"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 2 }}
				>
					A gift from Austin, made just for you.
				</motion.p>
				<motion.div
					className="mt-8 flex justify-center"
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 1.2, ease: "easeOut", delay: 2.0 }}
				>
					<Image
						src="/Amy-Cartoonized.png"
						alt="Amy - A loving tribute"
						width={220}
						height={220}
						className="rounded-full shadow-xl border-4 border-blush/30 object-cover w-[140px] h-[140px] sm:w-[200px] sm:h-[200px]"
						priority
					/>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default HeroSection;
