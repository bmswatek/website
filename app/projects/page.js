"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Projects() {
  const projectLines = [
    "> personal projects",
    "{ chaoticcrafter }",
    "{ farfetch'd }"
  ];

  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    if (currentLineIndex < projectLines.length) {
      const line = projectLines[currentLineIndex];

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

  // Link mappings
  const linkMap = {
    "DND Bot": "/projects/dnd-bot",
    "POGO Bot": "/projects/pogo-bot"
  };

  return (
    <main className="min-h-screen px-6 pt-10 text-left font-mono text-[#00ffcc]">
      <div className="mb-4 text-[#888]">~$ myprojects</div>

      <pre className="pl-4 whitespace-pre-wrap">
        {typedLines.map((line, idx) => {
          // Check if line contains { ... }
          const match = line.match(/\{(.+?)\}/);
          if (match) {
            const innerText = match[1].trim();
            const linkHref = linkMap[innerText];
            return (
              <div key={idx}>
                {"{ "}
                <Link href={linkHref} className="underline hover:text-[#00ffaa]">
                  {innerText}
                </Link>
                {" }"}
              </div>
            );
          } else {
            return <div key={idx}>{line}</div>;
          }
        })}

        {doneTyping ? (
          <div className="mt-2">
            <span className="text-[#888]">~$</span>{" "}
            <span className="animate-pulse">█</span>
          </div>
        ) : (
          <span className="animate-pulse">█</span>
        )}
      </pre>
    </main>
  );
}
