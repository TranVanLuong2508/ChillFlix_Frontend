
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



export const metadata = {
  title: "ChillFlix | Xem phim trực tuyến",
  description: "Xem phim chất lượng cao, tốc độ cao, không quảng cáo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans ">
        <div className={"flex-1"}>
          {children}
        </div>
      </body>
    </html>
  );
}
