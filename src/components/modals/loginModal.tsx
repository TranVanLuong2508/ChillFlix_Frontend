"use client";

import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import modalVariants from "@/constants/modalVariants";
import Atropos from "atropos/react";
import "atropos/css";
import { useLoginModal } from "@/contexts/LoginModalContext";
import { toast } from "sonner";

export default function LoginModal() {
  const { isOpen, closeModal } = useLoginModal();

  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeModal}
        >
          {/* Modal Box */}
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[600px] bg-[#1a1f2e]/95 backdrop-blur-md 
                       rounded-2xl shadow-2xl overflow-hidden flex"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition cursor-pointer"
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

            {/*Left Side: Atropos 3D Card */}
            <div className="hidden md:flex w-1/2 bg-[#151a25] items-center justify-center relative">
              <Atropos
                className="my-atropos w-[85%] h-[85%] rounded-2xl shadow-2xl bg-white overflow-hidden"
                activeOffset={40}
                shadowScale={1.05}
                highlight={true}
                rotateTouch="scroll-y"
                shadow={true}
                style={{ backgroundColor: "#0f1419" }}
              >
                <div className="relative w-full h-full">
                  <img
                    data-atropos-offset="-5"
                    src="/images/login_poster.webp"
                    alt="Cinematic scene"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    data-atropos-offset="10"
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-white"
                  ></div>
                  <div
                    data-atropos-offset="15"
                    className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold drop-shadow-[0_0_8px_rgba(255,100,0,0.6)]
                      text-white rounded-full shadow-[0_0_10px_rgba(255,0,128,0.6)]
                      bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-500"
                  >
                    HOT
                  </div>
                </div>
              </Atropos>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-white text-3xl font-bold mb-2">Đăng nhập</h2>
              <p className="text-gray-400 mb-6">
                Nếu bạn chưa có tài khoản,{" "}
                <span className="text-yellow-400 cursor-pointer hover:underline">
                  đăng ký ngay
                </span>
              </p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#252d3d] border-[#2a3040] text-white placeholder:text-gray-500 h-12
                             focus-visible:outline-none focus-visible:ring-0 focus-visible:border-yellow-400"
                />
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full bg-[#252d3d] border-[#2a3040] text-white placeholder:text-gray-500 h-12
                             focus-visible:outline-none focus-visible:ring-0 focus-visible:border-yellow-400"
                />

                <button
                  onClick={() => {
                    toast.success("Event has been created", {});
                  }}
                  type="button"
                  className=" cursor-pointer w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0f1419] font-bold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all"
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
                    <div className="w-full border-t border-[#2a3040]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1f2e] text-gray-400">
                      Hoặc
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-white text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
                >
                  <span>Sign in as Trần Văn</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    tranvanluong032020@gmail.com
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
