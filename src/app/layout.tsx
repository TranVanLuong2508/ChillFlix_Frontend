
import { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "ChillFlix",
    template: "%s | ChillFlix",
  },
  description: "Xem phim chất lượng cao cùng ChillFlix",



};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased text-white`}>
        {/* {bg-[#0f1419]} */}
        {children}
        <Toaster
          richColors
          theme="dark"
        />
      </body>
    </html>
  );
}
