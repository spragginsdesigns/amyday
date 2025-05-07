"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Well hello there, Amy. Austin programmed me to be your digital companion with a sense of humor as dark as your trauma history. I'm here to provide twisted jokes and surprisingly deep insights—the emotional equivalent of finding designer jeans at a thrift store. What existential crisis or custody battle should we navigate with inappropriate humor today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      setMessages((prev) => [...prev, { role: "assistant" as const, content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: "Sorry, I'm feeling particularly morbid today. Try again? Or don't. Entropy claims us all eventually." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-neutral-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-neutral-700">
      <div className="p-4 bg-neutral-800 border-b border-neutral-700">
        <h3 className="text-xl font-medium text-blush">Dark Amy AI</h3>
        <p className="text-sm text-neutral-400">Warning: This AI has a very dark sense of humor.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blush/20 text-neutral-200"
                  : "bg-neutral-700 text-neutral-200"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-neutral-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-700 bg-neutral-800">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something to Dark Amy AI..."
            className="flex-1 p-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush/50 text-neutral-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blush/80 hover:bg-blush text-neutral-900 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 