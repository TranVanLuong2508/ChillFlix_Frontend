import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Chillflix | Cùng xem phim Chill",
  description: "Website Watching Films",
  generator: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
