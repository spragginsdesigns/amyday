"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type Message = {
	role: "user" | "assistant";
	content: string;
	timestamp: string;
};

export default function AIChat() {
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "assistant",
			content:
				"Well hello there, Amy. Austin has told me so many great things about you. Austin programmed me to be your digital companion with a sense of humor as dark as your coffee. I'm here to provide twisted jokes and surprisingly deep insights—the emotional equivalent of finding designer jeans at a thrift store. What's on your wonderfully chaotic mind today?",
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// Focus input on load
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMessage: Message = {
			role: "user",
			content: input,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: [...messages, userMessage].map(({ role, content }) => ({
						role,
						content,
					})),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const data = await response.json();

			// Simulate typing effect
			setIsLoading(false);
			setIsTyping(true);

			// Add the message after a small delay to simulate typing
			setTimeout(() => {
				setMessages((prev) => [
					...prev,
					{
						role: "assistant" as const,
						content: data.message,
						timestamp: new Date().toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						}),
					},
				]);
				setIsTyping(false);
			}, Math.min(1000, data.message.length * 15)); // Dynamic delay based on message length
		} catch (error) {
			console.error("Error:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant" as const,
					content:
						"Sorry, I'm feeling particularly morbid today. Try again? Or don't. Entropy claims us all eventually.",
					timestamp: new Date().toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				},
			]);
			setIsLoading(false);
		}
	};

	const clearConversation = () => {
		setMessages([
			{
				role: "assistant",
				content:
					"Fresh start, clean slate. Just like therapy, but without the copay. What would you like to talk about now?",
				timestamp: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		]);
	};

	// Generate message bubble classes based on role
	const getMessageClasses = (role: "user" | "assistant") => {
		return twMerge(
			"max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-lg shadow-lg transition-all",
			"text-sm sm:text-base border",
			role === "user"
				? "bg-blush/30 text-ivory border-blush/40 rounded-tr-none ml-auto"
				: "bg-neutral-800/90 text-neutral-100 border-neutral-700 rounded-tl-none"
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className="flex flex-col h-[85vh] sm:h-[700px] max-h-[800px] bg-neutral-800/50 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-neutral-700 transition-all"
			aria-label="Chat with Dark Amy AI"
		>
			<div className="p-3 sm:p-4 bg-neutral-800/80 backdrop-blur-sm border-b border-neutral-700 flex justify-between items-center">
				<div className="flex items-center space-x-2.5">
					<div className="relative">
						<div className="w-3 h-3 bg-green-500 rounded-full absolute right-1 bottom-1 z-10"></div>
						<div className="w-3 h-3 bg-green-500 rounded-full absolute right-1 bottom-1 animate-ping opacity-75"></div>
						<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-blush/50 shadow-lg">
							<Image
								src="/Dark_Amy_Avatar_Circle.png"
								alt="Dark Amy Avatar"
								width={96}
								height={96}
								className="w-full h-full"
								priority
							/>
						</div>
					</div>
					<div>
						<h3 className="text-lg sm:text-xl font-medium text-blush">
							Dark Amy
						</h3>
						<p className="text-xs sm:text-sm text-neutral-400">
							Your Morbid AI Companion
						</p>
					</div>
				</div>
				<button
					onClick={clearConversation}
					className="text-xs sm:text-sm bg-rose-600/20 hover:bg-rose-600/30 border border-rose-600/40 text-rose-100 py-1.5 px-3 sm:px-4 rounded-md transition-all duration-150 ease-in-out shadow-md hover:shadow-rose-500/30 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
					aria-label="Clear chat history"
				>
					Clear Chat
				</button>
			</div>

			<div
				ref={chatContainerRef}
				className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-gradient-to-b from-neutral-800/30 to-neutral-900/30"
			>
				<AnimatePresence initial={false}>
					{messages.map((message, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.3 }}
							className={`flex ${
								message.role === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div className={getMessageClasses(message.role)}>
								<p className="whitespace-pre-wrap leading-relaxed">
									{message.content}
								</p>
								<div className="text-right mt-2 flex justify-end items-center space-x-1.5">
									{message.role === "assistant" && (
										<span className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-neutral-700/50 text-neutral-300 rounded">
											Dark Amy AI
										</span>
									)}
									<span className="text-[10px] sm:text-xs text-neutral-400/80">
										{message.timestamp}
									</span>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>

				{(isLoading || isTyping) && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="flex justify-start"
					>
						<div className="max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-lg bg-neutral-800/90 rounded-tl-none shadow-lg border border-neutral-700">
							<div className="flex space-x-2 items-center h-6">
								{isLoading ? (
									<>
										<div className="w-2 h-2 rounded-full bg-blush/70 animate-pulse"></div>
										<div className="w-2 h-2 rounded-full bg-blush/70 animate-pulse delay-150"></div>
										<div className="w-2 h-2 rounded-full bg-blush/70 animate-pulse delay-300"></div>
									</>
								) : (
									<div className="flex items-center space-x-2">
										<div className="flex space-x-1">
											<div className="w-1.5 h-1.5 rounded-full bg-blush/70 animate-pulse"></div>
											<div className="w-1.5 h-1.5 rounded-full bg-blush/70 animate-pulse delay-150"></div>
											<div className="w-1.5 h-1.5 rounded-full bg-blush/70 animate-pulse delay-300"></div>
										</div>
										<span className="text-xs sm:text-sm text-neutral-300">
											Dark Amy is typing...
										</span>
									</div>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</div>

			<form
				onSubmit={handleSubmit}
				className="p-3 sm:p-4 border-t border-neutral-700 bg-neutral-800/80 backdrop-blur-sm"
			>
				<div className="relative flex items-center">
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Say something to Dark Amy AI..."
						className="w-full pr-[100px] sm:pr-[120px] p-3 sm:p-4 bg-neutral-900/70 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush/50 text-neutral-200 placeholder-neutral-500 text-sm sm:text-base shadow-inner"
						disabled={isLoading || isTyping}
						aria-label="Message input"
					/>
					<button
						type="submit"
						disabled={isLoading || isTyping || !input.trim()}
						className="absolute right-2 bg-gradient-to-br from-blush to-lilac text-neutral-900 font-medium py-2 px-4 rounded-md transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base shadow-md hover:shadow-blush/20 focus:outline-none focus:ring-2 focus:ring-blush/50 focus:ring-offset-1 focus:ring-offset-neutral-800"
						aria-label="Send message"
					>
						{isLoading || isTyping ? (
							<div className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin"></div>
						) : (
							"Send"
						)}
					</button>
				</div>
			</form>
		</motion.div>
	);
}
