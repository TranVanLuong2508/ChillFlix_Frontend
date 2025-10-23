"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0f1419] border-b border-[#1a1f2e]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#0f1419] rounded-full flex items-center justify-center">
                <span className="text-[#d4af37] font-bold text-lg">▶</span>
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">ChillFlix</h1>
              <p className="text-gray-400 text-xs">
                Cảm xúc điện ảnh, chill từng phút giây
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Tìm kiếm phim, diễn viên"
                className="pl-10 bg-[#1a1f2e] border-[#2a3040] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition">
              Phim Lẻ
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              Phim Bộ
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition">
                  Thể loại
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1f2e] border-[#2a3040]">
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Hành động
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Tình cảm
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Hài hước
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition">
                  Quốc gia
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1f2e] border-[#2a3040]">
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Việt Nam
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Hàn Quốc
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Trung Quốc
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#" className="text-gray-300 hover:text-white transition">
              Xem Chung
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition">
                  Thêm
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1f2e] border-[#2a3040]">
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Mới cập nhật
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white">
                  Phổ biến
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="bg-[#d4af37] text-[#0f1419] px-2 py-1 rounded text-xs font-bold">
              NEW
            </span>
            <a href="#" className="text-gray-300 hover:text-white transition">
              Rổ Bông
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-[#1a1f2e]"
            >
              <span className="text-sm">🎧</span>
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>Tải ứng dụng</span>
              <span>ChillFlix</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-[#1a1f2e]"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex-shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}
