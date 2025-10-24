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
import { useEffect, useState } from "react";
import { allCodeServie } from "@/services";

const genres = [
  ["Anime", "Bí Ẩn", "Chiến Tranh", "Chiều Rạp"],
  ["Chuyên Thể", "Chính Kịch", "Chính Luận", "Chính Trị"],
  ["Chương Trình Truyền Hình", "Concert Film", "Cung Đấu", "Cuối Tuần"],
  ["Cách Mạng", "Cổ Trang", "Cổ Tích", "Có Điều"],
  ["DC", "Disney", "Gay Cấn", "Gia Đình"],
  ["Giáng Sinh", "Giả Tưởng", "Hoàng Cung", "Hoạt Hình"],
  ["Hài", "Hành Động", "Hình Sự", "Học Đường"],
  ["Khoa Học", "Kinh Dị", "Kinh Điển", "Kịch Nói"],
  ["Kỳ Ảo", "LGBT+", "Live Action", "Lãng Mạn"],
  ["Lịch Sử", "Marvel", "Miền Viễn Tây", "Nghề Nghiệp"],
  ["Người Mẫu", "Nhạc Kịch", "Phiêu Lưu", "Phép Thuật"],
  ["Siêu Anh Hùng", "Thiếu Nhi", "Thần Thoại", "Thể Thao"],
  ["Xuyên Không", "Đau Thương", "Đối Thương", "Ẩm Thực"],
];

export default function Header() {
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    fetchAllCodeDataByType("GENRE");
  }, []);

  const fetchAllCodeDataByType = async (type: string) => {
    const res = await allCodeServie.getByType(type);
    setGenresList(res.data.GENRE);
  };

  console.log("check state", genresList);
  return (
    <header className="sticky top-0 z-50 bg-[#0f1419] border-b border-[#1a1f2e]">
      <div className=" mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#0f1419] rounded-full flex items-center justify-center">
                <span className="text-[#d4af37] font-bold text-lg">▶</span>
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">ChillFlix</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Tìm kiếm phim, diễn viên"
                className="pl-10 bg-[#1a1f2e] border-[#2a3040] text-white placeholder:text-gray-500
             focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
             focus-visible:border-[#2a3040] focus:shadow-[0_0_12px_2px_rgba(59,130,246,0.5)] "
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition ">
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
              <DropdownMenuContent className="bg-[#1a1f2e] border-[#2a3040] w-auto p-4">
                <div className="grid grid-cols-4 gap-x-8 gap-y-3">
                  {genres.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-3">
                      {column.map((genre) => (
                        <button
                          key={genre}
                          className="text-gray-300 hover:text-[#d4af37] transition text-sm text-left whitespace-nowrap hover:var(--color-yellow-400)  cursor-pointer"
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
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
            {/* <span className="bg-[#d4af37] text-[#0f1419] px-2 py-1 rounded text-xs font-bold">
              NEW
            </span> */}
            <a href="#" className="text-gray-300 hover:text-white transition">
              Phim VIP
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
