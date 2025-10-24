"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Phim mới", href: "/phim-moi" },
  { name: "Thể loại", href: "/the-loai" },
  { name: "Quốc gia", href: "/quoc-gia" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-2xl font-bold tracking-wide ">
          ChillFlix
        </Link>


        <div className="flex space-x-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition hover:text-chillflix-yellow ${isActive ? "text-chillflix-yellow font-semibold" : "text-gray-300"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
