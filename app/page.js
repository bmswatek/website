"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [ascii, setAscii] = useState("");
  const [asciiTyped, setAsciiTyped] = useState("");
  const [asciiCharIndex, setAsciiCharIndex] = useState(0);
  const [asciiDone, setAsciiDone] = useState(false);

  const [typedLines, setTypedLines] = useState([]);
  const fullLines = [
    "> establishing secure connection...",
    "> access granted.",
    "> welcome, user.",
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

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

  useEffect(() => {
    if (!ascii) return;
    if (asciiCharIndex < ascii.length) {
      const timeout = setTimeout(() => {
        setAsciiTyped((prev) => prev + ascii[asciiCharIndex]);
        setAsciiCharIndex((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timeout);
    } else {
      setAsciiDone(true);
    }
  }, [asciiCharIndex, ascii]);

  useEffect(() => {
    if (!asciiDone) return;

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
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-6 bg-[#0a0a0a] text-[#00ffcc] text-sm leading-relaxed relative">
      {/* ASCII Skull */}
      <div
        className="relative w-full flex justify-center items-center"
        style={{ height: "240px" }}
      >
        <pre
          className="absolute top-0 text-left whitespace-pre leading-none"
          style={{ width: "30ch" }}
        >
          {asciiTyped}
        </pre>
      </div>
      <div style={{ display: "none" }}>
        password = 1002200120232024 
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

      {/* Discrete "?" Link above bottom navbar */}
      <div
        onClick={() => router.push("/locked")}
        className="fixed bottom-16 right-2 text-[#00ffcc] cursor-pointer select-none z-50"
        title="Go to locked page"
      >
        ?
      </div>
    </main>
  );
}
