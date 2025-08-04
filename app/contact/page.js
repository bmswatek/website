"use client";

import { useState } from "react";

export default function Contact() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!from.trim() || !subject.trim() || !message.trim()) return;

    setLoading(true);

    const res = await fetch("https://formspree.io/f/xgvzzjqy", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        subject,
        message,
      }),
    });

    const result = await res.json();
    setLoading(false);

    if (result.ok || res.status === 200) {
      setSent(true);
      setFrom("");
      setSubject("");
      setMessage("");
    } else {
      alert("❌ Failed to send message.");
    }
  };

  return (
    <main className="min-h-screen px-6 pt-10 font-mono text-[#00ffcc]">
      <div className="mb-4 text-[#888]">~$ contactme</div>

      <div className="pl-4 max-w-xl">
        {sent ? (
          <p className="text-green-400">✔ Message sent successfully!</p>
        ) : (
          <>
            <div className="mb-4">
              <p className="mb-2">
                {"> From: "}
                <input
                  type="email"
                  className="bg-transparent border-b border-[#00ffcc] focus:outline-none w-full"
                  placeholder="your@email.com"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
              </p>
              <p className="mb-2">
                {"> Subject: "}
                <input
                  type="text"
                  className="bg-transparent border-b border-[#00ffcc] focus:outline-none w-full"
                  placeholder="Type subject here..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </p>
              <p>{"> Message:"}</p>
            </div>

            <textarea
              className="w-full h-40 bg-[#1a1a1a] border border-[#00ffcc] text-[#00ffcc] p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="mt-4 flex gap-4 text-sm text-[#888]">
              <button
                onClick={handleSend}
                className="hover:text-[#00ffcc] transition"
                disabled={loading || !message.trim() || !subject.trim() || !from.trim()}
              >
                [ CTRL+S to send ]
              </button>
              <button
                onClick={() => {
                  setFrom("");
                  setSubject("");
                  setMessage("");
                }}
                className="hover:text-[#ff6666] transition"
              >
                [ CTRL+X to cancel ]
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
