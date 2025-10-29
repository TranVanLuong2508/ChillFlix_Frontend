import { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { LoginModalProvider } from "@/contexts/LoginModalContext";
import Header from "@/components/layout/header";
import LoginModal from "@/components/modals/loginModal";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "ChillFlix",
    template: "%s | ChillFlix",
  },
  description: "Xem phim chất lượng cao cùng ChillFlix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased text-white bg-[#191B24] m-0 p-0`}>
        <LoginModalProvider>
          <Header />
          {children}
          <Footer />
          <LoginModal />
          <Toaster />
        </LoginModalProvider>
      </body>
    </html>
  );
}
