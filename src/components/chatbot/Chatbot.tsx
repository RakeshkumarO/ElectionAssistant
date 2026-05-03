"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Election Assistant. I can help answer questions about voter eligibility, polling booth rules, and the general election process. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Optimistically add user message
    const newMessage: Message = { id: Date.now().toString(), role: "user", content: userMessage };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: data.message }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now().toString(), 
          role: "error", 
          content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="my-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-6 border border-indigo-500/20">
            <Bot className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">
            AI Election Assistant
          </h2>
          <p className="text-neutral-400 mb-6">
            Have questions about the election process? Our AI is trained to provide accurate, non-partisan information about voting procedures.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-neutral-300">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Guidelines
            </h4>
            <ul className="list-disc list-inside space-y-1 opacity-80">
              <li>Ask about eligibility</li>
              <li>Ask about polling locations</li>
              <li>Ask about required IDs</li>
              <li>No partisan questions allowed</li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="bg-[#111111] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[500px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-medium text-sm text-neutral-200">Assistant is online</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1
                        ${msg.role === "user" ? "bg-indigo-600" : msg.role === "error" ? "bg-red-500/20 text-red-400" : "bg-neutral-800 border border-white/10"}
                      `}>
                        {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : 
                         msg.role === "error" ? <AlertCircle className="w-4 h-4" /> :
                         <Bot className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <div className={`p-4 rounded-2xl leading-relaxed
                        ${msg.role === "user" 
                          ? "bg-indigo-600 text-white rounded-tr-sm" 
                          : msg.role === "error"
                          ? "bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-sm"
                          : "bg-neutral-800 text-neutral-200 border border-white/5 rounded-tl-sm"}
                      `}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center mt-1">
                      <Bot className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-800 border border-white/5 rounded-tl-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                      <span className="text-sm text-neutral-400">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about the election..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  disabled={isLoading}
                  aria-label="Chat input"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
