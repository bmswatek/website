"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function About() {
  const aboutLines = [
    "> farfetch'd",
    "Built a robust real-time Pokémon GO event-tracking Discord bot using Node.js, JavaScript, and JSON.",
    "Hosted 24/7 on a Raspberry Pi, it integrates external APIs with async operations and comprehensive error handling.", 
    "The bot supports server-specific settings via custom commands, delivering seamless, real-time event notifications",
    "and interactions with users through discord.js.",
    "{ github }"
  ];

  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    if (currentLineIndex < aboutLines.length) {
      const line = aboutLines[currentLineIndex];

      if (currentCharIndex < line.length) {
        const timeout = setTimeout(() => {
          const updated = [...typedLines];
          updated[currentLineIndex] =
            (updated[currentLineIndex] || "") + line[currentCharIndex];
          setTypedLines(updated);
          setCurrentCharIndex((prev) => prev + 1);
        }, 10);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      setDoneTyping(true);
    }
  }, [currentCharIndex, currentLineIndex, typedLines]);

  return (
    <main className="min-h-screen px-6 pt-10 text-left font-mono text-[#00ffcc]">
      <div className="mb-4 text-[#888]">~$ pogobot</div>

      <pre className="pl-4 whitespace-pre-wrap">
        {typedLines.map((line, idx) => {
          // Detect if line is { GitHub } and render as link
          const match = line.match(/\{(.+?)\}/);
          if (match) {
            const innerText = match[1].trim();
            return (
              <div key={idx}>
                {"{ "}
                <a
                  href="https://github.com/YourUsername/chaoticcrafter" // <-- Replace with your link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#00ffaa]"
                >
                  {innerText}
                </a>
                {" }"}
              </div>
            );
          } else {
            return <div key={idx}>{line}</div>;
          }
        })}

        <div className="mt-2">
          <span className="text-[#888]">~$</span>{" "}
          <span className="animate-pulse">█</span>
        </div>
      </pre>
    </main>
  );
}
