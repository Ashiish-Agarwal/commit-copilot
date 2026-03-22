"use client";

import Link from "next/link";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-dark/75 backdrop-blur-xl border-b border-border">
      <Link href="/" className="font-mono text-base text-green tracking-tight">
        commit<span className="text-white">pilot</span>
      </Link>

      <ul className="hidden md:flex gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-xs font-semibold tracking-widest uppercase text-muted hover:text-green transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/login"
        className="font-mono text-xs font-bold tracking-widest bg-green text-dark px-5 py-2 rounded hover:opacity-85 transition-opacity"
      >
        Get Started →
      </Link>
    </nav>
  );
}