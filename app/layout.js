import "./globals.css";
import Navbar from "../components/navbar"; // Importing Navbar component
import { Analytics } from "@vercel/analytics/next"

// Metadata for the website
export const metadata = {
  title: "bartek@portfolio:~$ _",
  description: "Access granted. Browse my coding experiments, Discord bots, and projects.",
  icons: {
    icon: '/favicon.png', // or '/favicon.ico'
  },
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
        <Analytics />
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


