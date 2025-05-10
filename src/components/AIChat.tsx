"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

type Message = {
	role: "user" | "assistant";
	content: string;
};

export default function AIChat() {
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "assistant",
			content:
				"Well hello there, Amy. Austin has told me so many great things about you. Austin programmed me to be your digital companion with a sense of humor as dark as your coffee. I'm here to provide twisted jokes and surprisingly deep insights—the emotional equivalent of finding designer jeans at a thrift store. What's on your wonderfully chaotic mind today?",
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMessage: Message = { role: "user", content: input };
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
					messages: [...messages, userMessage],
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const data = await response.json();

			// After adding a message, manually scroll to it
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
			}, 100);

			// Simulate typing effect
			setIsLoading(false);
			setIsTyping(true);

			// Add the message after a small delay to simulate typing
			setTimeout(() => {
				setMessages((prev) => [
					...prev,
					{ role: "assistant" as const, content: data.message },
				]);
				setIsTyping(false);

				// Only scroll to new messages during active conversation
				setTimeout(() => {
					messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
				}, 100);
			}, Math.min(1000, data.message.length * 15)); // Dynamic delay based on message length
		} catch (error) {
			console.error("Error:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant" as const,
					content:
						"Sorry, I'm feeling particularly morbid today. Try again? Or don't. Entropy claims us all eventually.",
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
			},
		]);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className="flex flex-col h-[70vh] sm:h-[550px] max-h-[600px] bg-neutral-800/50 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-neutral-700 transition-all"
		>
			<div className="p-3 sm:p-4 bg-neutral-800/80 backdrop-blur-sm border-b border-neutral-700 flex justify-between items-center">
				<div>
					<h3 className="text-lg sm:text-xl font-medium text-blush">
						Dark Amy
					</h3>
					<p className="text-xs sm:text-sm text-neutral-400">
						Your Morbid AI Companion
					</p>
				</div>
				<button
					onClick={clearConversation}
					className="text-xs sm:text-sm bg-rose-500/30 hover:bg-rose-500/50 border border-rose-500/50 text-rose-100 py-1.5 px-3 sm:px-4 rounded-md transition-all duration-150 ease-in-out shadow-md hover:shadow-rose-500/30"
				>
					Clear Chat
				</button>
			</div>

			<div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-neutral-800/30 to-neutral-900/30">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex ${
							message.role === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-lg shadow-md text-sm sm:text-base ${
								message.role === "user"
									? "bg-blush/20 text-neutral-200 rounded-tr-none"
									: "bg-neutral-700 text-neutral-200 rounded-tl-none"
							}`}
						>
							<p className="whitespace-pre-wrap">{message.content}</p>
							<div className="text-right mt-1.5">
								<span className="text-[10px] sm:text-xs text-neutral-400/80">
									{message.role === "user" ? "You" : "Dark Amy AI"} •{" "}
									{new Date().toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</span>
							</div>
						</div>
					</div>
				))}
				{(isLoading || isTyping) && (
					<div className="flex justify-start">
						<div className="max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-lg bg-neutral-700 rounded-tl-none shadow-md">
							<div className="flex space-x-2 items-center h-6">
								{isLoading ? (
									<>
										<div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse"></div>
										<div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse delay-150"></div>
										<div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse delay-300"></div>
									</>
								) : (
									<span className="text-xs sm:text-sm text-neutral-400">
										Dark Amy AI is typing...
									</span>
								)}
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<form
				onSubmit={handleSubmit}
				className="p-3 sm:p-4 border-t border-neutral-700 bg-neutral-800/80 backdrop-blur-sm"
			>
				<div className="flex items-center space-x-2 sm:space-x-3">
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Say something to Dark Amy AI..."
						className="flex-1 p-2.5 sm:p-3 bg-neutral-900/70 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush/50 text-neutral-200 placeholder-neutral-500 text-sm sm:text-base"
						disabled={isLoading || isTyping}
					/>
					<button
						type="submit"
						disabled={isLoading || isTyping || !input.trim()}
						className="bg-blush/80 hover:bg-blush text-neutral-900 font-semibold py-2.5 px-3 sm:py-3 sm:px-5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[70px] sm:min-w-[80px] text-sm sm:text-base flex items-center justify-center"
					>
						{isLoading || isTyping ? (
							<div className="w-5 h-5 border-2 border-neutral-900/50 border-t-neutral-900 rounded-full animate-spin"></div>
						) : (
							"Send"
						)}
					</button>
				</div>
			</form>
		</motion.div>
	);
}
