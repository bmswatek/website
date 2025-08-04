import { Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar"; // Importing Navbar component

// Metadata for the website
export const metadata = {
  title: "My Portfolio",
  description: "Welcome to the terminal. Explore my work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#0a0a0a] text-[#00ffcc] antialiased`}
      >
        {/* <div className="noise-overlay" /> */}

        <Navbar />
        {children}

        {/* Footer - terminal-style links */}
        <footer className="fixed bottom-1 w-full px-6 py-2 border-t border-[#222] text-sm text-[#00ffcc] text-center">
          <p className="mb-1">
            
            <a
              href="https://github.com/bmswatek"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-[#66ffff]"
            >
              {">"} github{" "}
            </a>
          </p>
          <p>
            <a
              href="https://linkedin.com/in/bartek-swatek-b78382238/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-[#66ffff]"
            >
              {">"} linkedin {" "}
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}


