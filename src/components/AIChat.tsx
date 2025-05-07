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
      content: "Well hello there, Amy. Austin has told me so many great things about you. Austin programmed me to be your digital companion with a sense of humor as dark as your coffee. I'm here to provide twisted jokes and surprisingly deep insights—the emotional equivalent of finding designer jeans at a thrift store. What's on your wonderfully chaotic mind today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

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
      
      // Simulate typing effect
      setIsLoading(false);
      setIsTyping(true);
      
      // Add the message after a small delay to simulate typing
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant" as const, content: data.message }]);
        setIsTyping(false);
      }, Math.min(1000, data.message.length * 15)); // Dynamic delay based on message length
      
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: "Sorry, I'm feeling particularly morbid today. Try again? Or don't. Entropy claims us all eventually." },
      ]);
      setIsLoading(false);
    }
  };
  
  const clearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: "Fresh start, clean slate. Just like therapy, but without the copay. What would you like to talk about now?"
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[550px] bg-neutral-800/50 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-neutral-700 transition-all">
      <div className="p-4 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-blush">Dark Amy AI</h3>
          <p className="text-sm text-neutral-400">Your Morbid AI Companion</p>
        </div>
        <button 
          onClick={clearConversation}
          className="text-xs bg-neutral-700 hover:bg-neutral-600 text-neutral-300 py-1 px-2 rounded transition-colors"
        >
          Clear chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-neutral-800/30 to-neutral-900/30">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg shadow-md ${
                message.role === "user"
                  ? "bg-blush/20 text-neutral-200 rounded-tr-none"
                  : "bg-neutral-700 text-neutral-200 rounded-tl-none"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className="text-right mt-1">
                <span className="text-[10px] text-neutral-400">
                  {message.role === "user" ? "you" : "Dark Amy AI"} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
        {(isLoading || isTyping) && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-3 rounded-lg bg-neutral-700 rounded-tl-none">
              <div className="flex space-x-2 items-center h-6">
                {isLoading ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse delay-300"></div>
                  </>
                ) : (
                  <span className="text-sm text-neutral-400">Dark Amy AI is typing...</span>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-700 bg-neutral-800">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something to Dark Amy AI..."
            className="flex-1 p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush/50 text-neutral-200"
            disabled={isLoading || isTyping}
          />
          <button
            type="submit"
            disabled={isLoading || isTyping || !input.trim()}
            className="bg-blush/80 hover:bg-blush text-neutral-900 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 min-w-[80px]"
          >
            {isLoading || isTyping ? "Wait..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
} 