"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // import router

export default function Locked() {
  const router = useRouter(); // initialize router

  const [ascii, setAscii] = useState("");
  const [asciiTyped, setAsciiTyped] = useState("");
  const [asciiCharIndex, setAsciiCharIndex] = useState(0);
  const [asciiDone, setAsciiDone] = useState(false);

  const [password, setPassword] = useState("");

  const correctPassword = "1002200120232024"; 

  // Load ASCII from txt
  useEffect(() => {
    fetch("/ascii/rat.txt")
      .then((res) => res.text())
      .then((text) => {
        setAscii(text);
        setAsciiTyped("");
        setAsciiCharIndex(0);
        setAsciiDone(false);
      });
  }, []);

  // Animate ASCII typing
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      // redirect to blog page
      router.push("/blog");
    } else {
      alert("Access Denied");
      setPassword("");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-6 bg-[#0a0a0a] text-[#00ffcc] text-sm leading-relaxed">
      {/* ASCII Art */}
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

      {/* Password Prompt */}
      {asciiDone && (
        <form onSubmit={handleSubmit} className="mt-4">
          <pre className="text-left whitespace-pre leading-snug pl-4">
            <span className="text-[#888]">~$ password:</span>{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-none outline-none font-mono text-[#00ffcc] caret-[#00ffcc]"
              autoFocus
            />
            <span className="animate-pulse">█</span>
          </pre>
        </form>
      )}
    </main>
  );
}
