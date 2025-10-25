"use client";

import { Input } from "@/components/ui/input";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
}: LoginModalProps) {
  if (!isOpen) return null;

  const handleLogin = () => {
    onLogin();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[600px] bg-[#1a1f2e]/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Left Side - Movie Posters Background */}
        <div className="hidden md:flex w-1/2 bg-[#252d3d] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2e]/80 to-transparent z-10" />
          <div className="absolute inset-0 opacity-30">
            {/* Movie posters grid mockup */}
            <div className="grid grid-cols-3 gap-2 p-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] bg-gradient-to-br from-gray-600 to-gray-800 rounded"
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 left-8 z-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-[#0f1419] rounded-full flex items-center justify-center">
                  <span className="text-[#d4af37] font-bold text-xl">▶</span>
                </div>
              </div>
              <div>
                <h2 className="text-white font-bold text-2xl">ChillFlix</h2>
                <p className="text-gray-400 text-sm"></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-white text-3xl font-bold mb-2">Đăng nhập</h2>
          <p className="text-gray-400 mb-6">
            Nếu bạn chưa có tài khoản,{" "}
            <span className="text-yellow-400 cursor-pointer hover:underline">
              đăng ký ngay
            </span>
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Input
                type="email"
                placeholder="Email"
                className="w-full bg-[#252d3d] border-[#2a3040] text-white placeholder:text-gray-500 h-12
                focus-visible:outline-none focus-visible:ring-0 focus-visible:border-yellow-400"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Mật khẩu"
                className="w-full bg-[#252d3d] border-[#2a3040] text-white placeholder:text-gray-500 h-12
                focus-visible:outline-none focus-visible:ring-0 focus-visible:border-yellow-400"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0f1419] font-bold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all"
            >
              Đăng nhập
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-gray-400 hover:text-yellow-400 text-sm transition"
              >
                Quên mật khẩu?
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2a3040]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1f2e] text-gray-400">Hoặc</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full bg-white text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
            >
              {/* <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg> */}
              <span>Sign in as Trần Văn</span>
              <span className="text-xs text-gray-500 ml-auto">
                tranvanluong032020@gmail.com
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
