"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative p-8 rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-black/40 to-yellow-900/10 shadow-xl flex flex-col items-center gap-6 text-center animate-fadeIn">
        <div className="relative flex items-center justify-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]" />
        </div>

        <div>
          <h1 className="text-yellow-300 font-extrabold text-3xl drop-shadow-[0_0_10px_rgba(255,215,0,0.7)] tracking-wide">
            Không tìm thấy trang
          </h1>
          <p className="text-gray-300 mt-2 max-w-sm">
            Có vẻ như bạn đã đi lạc vào một góc tối nào đó của ChillFlix.
          </p>
        </div>

        <Button
          onClick={() => router.push("/")}
          className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all hover:scale-105"
        >
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );
}
