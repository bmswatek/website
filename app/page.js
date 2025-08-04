"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [ascii, setAscii] = useState("");
  const [asciiTyped, setAsciiTyped] = useState("");
  const [asciiCharIndex, setAsciiCharIndex] = useState(0);
  const [asciiDone, setAsciiDone] = useState(false); // <-- Track when skull finishes

  const [typedLines, setTypedLines] = useState([]);
  const fullLines = [
    "> establishing secure connection...",
    "> access granted.",
    "> welcome, user.",
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  // Load ASCII from txt and reset animation
  useEffect(() => {
    fetch("/ascii/skull.txt")
      .then((res) => res.text())
      .then((text) => {
        setAscii(text);
        setAsciiTyped("");
        setAsciiCharIndex(0);
        setAsciiDone(false);
      });
  }, []);

  // Animate skull typing
  useEffect(() => {
    if (!ascii) return;
    if (asciiCharIndex < ascii.length) {
      const timeout = setTimeout(() => {
        setAsciiTyped((prev) => prev + ascii[asciiCharIndex]);
        setAsciiCharIndex((prev) => prev + 1);
      }, 18); // Skull typing speed
      return () => clearTimeout(timeout);
    } else {
      setAsciiDone(true); // Skull finished typing
    }
  }, [asciiCharIndex, ascii]);

  // Animate terminal lines AFTER skull finishes
  useEffect(() => {
    if (!asciiDone) return; // Wait for ASCII skull to finish first

    if (currentLineIndex < fullLines.length) {
      const line = fullLines[currentLineIndex];

      if (currentCharIndex < line.length) {
        const timeout = setTimeout(() => {
          const updated = [...typedLines];
          updated[currentLineIndex] =
            (updated[currentLineIndex] || "") + line[currentCharIndex];
          setTypedLines(updated);
          setCurrentCharIndex((prev) => prev + 1);
        }, 30);
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
  }, [asciiDone, currentCharIndex, currentLineIndex, typedLines]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-6 bg-[#0a0a0a] text-[#00ffcc] text-sm leading-relaxed">
      {/* ASCII Skull Fixed Height Container */}
      <div
        className="relative w-full flex justify-center items-center"
        style={{ height: "240px" }}
      >
        <pre
          className={`absolute top-0 text-left whitespace-pre leading-none`} /* ${!asciiDone ? "animate-glitch-pulse" : ""} <- add to add glitch affect to skull */
          style={{ width: "30ch" }}
        >
          {asciiTyped}
        </pre>
      </div>

      {/* Terminal Typing Lines */}
      {asciiDone && (
        <pre className="text-left whitespace-pre leading-snug pl-4">
          {typedLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          {!doneTyping && <span className="animate-pulse">█</span>}
          {doneTyping && (
            <div className="mt-2">
              <span className="text-[#888]">~$</span>{" "}
              <span className="animate-pulse">█</span>
            </div>
          )}
        </pre>
      )}
    </main>
  );
}
