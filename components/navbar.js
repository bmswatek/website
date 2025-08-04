import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="pt-safe p-4">
      <div className="flex flex-wrap justify-center gap-4 text-[#00ffcc] text-lg">
        <Link href="/" className="hover:text-green-400 transition">{'{ home }'}</Link>
        <Link href="/about" className="hover:text-green-400 transition">{'{ about }'}</Link>
        <Link href="/projects" className="hover:text-green-400 transition">{'{ projects }'}</Link>
        <Link href="/contact" className="hover:text-green-400 transition">{'{ contact }'}</Link>
      </div>
    </nav>
  );
}
