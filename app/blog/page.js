"use client";

import { useState, useEffect } from "react";

export default function Blog() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load messages from API on mount
  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // send message to server
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input.trim() }),
    });

    // update local state
    setMessages((prev) => [...prev, input.trim()]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#00ffcc] px-6 pt-10 font-mono">
      <h1 className="text-xl mb-4">Secret Guestbook</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black border border-[#00ffcc] text-[#00ffcc] p-2 focus:outline-none"
          placeholder='Say "I made it here"...'
        />
        <button
          type="submit"
          className="px-4 py-2 border border-[#00ffcc] hover:bg-[#00ffcc] hover:text-black transition"
        >
          Post
        </button>
      </form>

      <div className="space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="border border-[#00ffcc] p-2 rounded bg-black/50"
          >
            {msg}
          </div>
        ))}
      </div>
    </main>
  );
}
