"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection: React.FC = () => {
	return (
		<section className="py-20 text-center">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 1.2,
					ease: "easeOut",
				}}
			>
				<motion.h1
					className="text-5xl font-dancing-script text-blush mb-6 tracking-wider"
					initial={{ opacity: 0, filter: "blur(8px)" }}
					animate={{ opacity: 1, filter: "blur(0px)" }}
					transition={{
						duration: 2.5,
						ease: "easeOut",
						delay: 0.3,
					}}
					style={{
						fontFamily: "var(--font-dancing-script)",
						textShadow: "0 0 15px rgba(212, 137, 168, 0.3)",
					}}
				>
					My Lovely Sweet Amy
				</motion.h1>

				<motion.div
					className="mt-6 flex justify-center"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 1,
						ease: "easeOut",
						delay: 1.5,
					}}
				>
					<span className="inline-block px-4 py-1 rounded-full bg-card-bg/30 backdrop-blur-sm text-muted-rose text-sm">
						✨ A living tribute ✨
					</span>
				</motion.div>

				{/* Amy's Cartoonized Image */}
				<motion.div
					className="mt-8 flex justify-center"
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{
						duration: 1.2,
						ease: "easeOut",
						delay: 2.0,
					}}
				>
					<Image
						src="/Amy-Cartoonized.png"
						alt="Amy - A loving tribute"
						width={200}
						height={200}
						className="rounded-full shadow-xl border-4 border-blush/30 object-cover w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
						priority
					/>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default HeroSection;
