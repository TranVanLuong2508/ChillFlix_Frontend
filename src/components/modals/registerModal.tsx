"use client";

import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import modalVariants from "@/constants/modalVariants";
import Atropos from "atropos/react";
import "atropos/css";
import { useLoginModal } from "@/contexts/LoginModalContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/services";
import { AuthenticationsMessage } from "@/constants/message";
import { useAuthStore } from "@/stores/authStore";
import { RegisterInput } from "@/types/authen.type";
import { useModalStore } from "@/stores/authModalStore";

export default function RegisterModal() {
  const { isRegisterModalOpen, closeRegisterModal } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<RegisterInput>({
    mode: "onSubmit",
  });

  const handleRegister = async (data: RegisterInput) => {
    try {
      const res = await authService.callRegister(data);
      if (res && res.EC === 1) {
        toast.success(AuthenticationsMessage.registerSucess);
        reset();
        closeRegisterModal();
      }
    } catch (error) {
      console.log("register error:", error);
      toast.error("Đăng ký thất bại, vui lòng thử lại.");
    }
  };

  const handleClose = () => {
    closeRegisterModal();
    setShowPassword(false);
  };

  useEffect(() => {
    if (!isRegisterModalOpen) clearErrors();
  }, [isRegisterModalOpen, clearErrors]);

  return (
    <AnimatePresence>
      {isRegisterModalOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[600px] bg-[#1a1f2e]/95 backdrop-blur-md 
                       rounded-2xl shadow-2xl overflow-hidden flex"
          >
            {/* Close */}
            <button
              onClick={handleClose}
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

            {/* Left Poster */}
            <div className="hidden md:flex w-1/2 bg-[#151a25] items-center justify-center">
              <Atropos
                className="my-atropos w-[85%] h-[85%] rounded-2xl overflow-hidden"
                activeOffset={40}
              >
                <img
                  src="/images/login_poster.webp"
                  className="w-full h-full object-cover"
                />
              </Atropos>
            </div>

            {/* Form */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-white text-3xl font-bold mb-2">Đăng ký</h2>
              <p className="text-gray-400 mb-6">Tạo tài khoản để tiếp tục</p>

              <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-4"
              >
                <Input
                  {...register("fullName", { required: "Tên là bắt buộc" })}
                  placeholder="Tên người dùng"
                  className="input-login"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs">
                    {errors.fullName.message}
                  </p>
                )}

                <Input
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  placeholder="Email"
                  className="input-login"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    className="input-login pr-10"
                    {...register("password", {
                      required: "Mật khẩu là bắt buộc",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có it nhất 6 ký tự",
                      },
                    })}
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-yellow-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs">
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
