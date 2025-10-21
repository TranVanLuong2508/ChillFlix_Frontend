
import "./globals.css";

export const metadata = {
  title: "ChillFlix | Xem phim trực tuyến",
  description: "Xem phim chất lượng cao, tốc độ cao, không quảng cáo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-zinc-950 text-white font-sans min-h-screen flex flex-col transition-opacity duration-700 opacity-0 animate-[fadeIn_0.7s_ease-in-out_forwards]">
        {children}
        <footer className="text-center py-6 text-gray-500 text-sm border-t border-zinc-800 mt-10">
          © 2025 ChillFlix Clone – Giao diện học tập
        </footer>
      </body>
    </html>
  );
}
