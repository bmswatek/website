"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function weatherbot() {
  const aboutLines = [
    "> weatherbot",
    "Working towards intergrating a Weather API into a Discord bot", 
    "which can be utilised as a personalised Weather Forecast assistant within the Discord platform.", 
    "The Bot is a collaborative effort between myself and a good friend of mine. All the information about this project can be", 
    "found on my github page.",
    "{ github }"  // <-- Add GitHub as a typed line
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
      <div className="mb-4 text-[#888]">~$ weatherbot</div>

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
                  href="https://github.com/bmswatek/discord-bot-collab" // <-- Replace with your link
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
