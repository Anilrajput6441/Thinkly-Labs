"use client";

import { useEffect, useState, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // for storage
  const STORAGE_KEY = "admentor_chat";

  // 👇 load initial prompt from landing
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setMessages(JSON.parse(stored));
    }

    const initial = localStorage.getItem("initialPrompt");
    if (initial) {
      sendMessage(initial);
      localStorage.removeItem("initialPrompt");
    }
  }, []);
  // Save messages whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user" as const, content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant" as const, content: data.reply },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant" as const, content: "Something went wrong" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <span className="text-lg font-semibold">AdMentor AI</span>

        <button
          onClick={() => {
            setMessages([]);
            localStorage.removeItem(STORAGE_KEY);
          }}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500">
            No messages yet. Start by asking something 👇
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl p-3 rounded-xl ${
              msg.role === "user"
                ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 ml-auto"
                : "bg-white/10"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="bg-white/10 p-3 rounded-xl w-fit">
            AdMentor is analyzing...
          </div>
        )}
      </div>
      {/*for referencing the bottom of the chat to auto-scroll */}
      <div ref={bottomRef} />

      {/* Input */}
      <div className="p-4 border-t border-white/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Paste your ad copy or ask for improvements..."
          className="flex-1 p-3 rounded-lg bg-white/10 outline-none"
        />

        <button
          onClick={() => sendMessage(input)}
          disabled={loading}
          className="px-4 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
