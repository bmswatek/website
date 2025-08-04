"use client";

import { useEffect, useState } from "react";

export default function About() {
  const aboutLines = [
    "> about me",
    "I'm a developer who builds immersive, accessible, and secure digital experiences with a focus on interaction, clarity, and edge-tech stacks."
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
        }, 8);
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
      <div className="mb-4 text-[#888]">~$ whoami</div>

      <pre className="pl-4 whitespace-pre-wrap">
        {typedLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}

        {doneTyping ? (
          // After typing is done, render a fresh terminal prompt
          <div className="mt-2">
            <span className="text-[#888]">~$</span>{" "}
            <span className="animate-pulse">█</span>
          </div>
        ) : (
          // While still typing, show blinking cursor inline
          <span className="animate-pulse">█</span>
        )}
      </pre>
    </main>
  );
}
