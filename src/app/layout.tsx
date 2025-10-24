import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";



export const metadata = {
  title: "ChillFlix | Xem phim trực tuyến",
  description: "Xem phim chất lượng cao, tốc độ cao, không quảng cáo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans ">
        <Navbar />
        <div className={"flex-1"}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
