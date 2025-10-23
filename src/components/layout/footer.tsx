"use client";

import Image from "next/image";
import { Mail, Send, Gamepad2, Eye, Instagram } from "lucide-react";
import { footerDescriptionContent, partners } from "@/data/footerData";

export default function Footer() {
  return (
    <footer className="bg-[#0f1419] border-t border-[#1a1f2e] mt-20  left-0 w-full flex flex-col pt-4">
      {/* Vietnam Flag Banner */}
      <div className="   px-4 py-3 flex items-center gap-2  justify-center ">
        <div className="bg-[#75140F] flex items-center px-4 py-2 rounded-3xl gap-2">
          <div className="flag-vn">
            <Image
              src="/images/vn_flag.svg"
              width={30}
              height={30}
              alt="Viet Nam"
            />
          </div>
          <span className="text-white font-semibold ">
            Hoàng Sa & Trường Sa là của Việt Nam!
          </span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className=" mx-auto  py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 px-4">
          {/* Brand Section */}
          <div className="space-y-4 ">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-[#0f1419] rounded-full flex items-center justify-center">
                  <span className="text-[#d4af37] font-bold">▶</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">ChillFlix</h3>
                <p className="text-gray-400 text-xs">
                  Cảm xúc điện ảnh, chill từng phút giây
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              {[Send, Gamepad2, Eye, Mail, Eye, Instagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 bg-[#1a1f2e] rounded-full flex items-center justify-center text-gray-400 hover:text-[#d4af37] hover:bg-[#2a3040] transition"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold ">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#d4af37] transition"
                >
                  Hỏi Đáp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#d4af37] transition"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#d4af37] transition"
                >
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Về Chúng Tôi</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#d4af37] transition"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#d4af37] transition"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Đối Tác</h4>
            <ul className="space-y-2">
              {partners.map((partner, index) => {
                return (
                  <li key={index}>
                    <a
                      href={partner.href}
                      className="text-gray-400 hover:text-[#d4af37] transition"
                    >
                      {partner.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-[#1a1f2e] pt-8 w-full px-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            {footerDescriptionContent}
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1a1f2e] mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 ChillFlix - Dự án chỉ cho mục đích học tập
          </p>
        </div>
      </div>
    </footer>
  );
}
