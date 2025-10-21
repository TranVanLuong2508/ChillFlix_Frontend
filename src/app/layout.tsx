
import "./globals.css";

export const metadata = {
  title: "ChillFlix | Xem phim trực tuyến",
  description: "Xem phim chất lượng cao, tốc độ cao, không quảng cáo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-zinc-950 text-white font-sans">
        {children}
        <footer className="text-center py-6 text-gray-500 text-sm border-t border-zinc-800 mt-10">
          © 2025 ChillFlix Clone – Giao diện học tập
        </footer>
      </body>
    </html>
  );
}
