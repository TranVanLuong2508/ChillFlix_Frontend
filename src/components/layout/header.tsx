"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { allCodeServie } from "@/services";
import type { AllCodeRow } from "@/types/allcodeType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ALL_CODE_TYPES } from "@/constants/allCode";

export default function Header() {
  const [genresList, setGenresList] = useState<AllCodeRow[]>([]);
  const [countriesList, setCountriesList] = useState<AllCodeRow[]>([]);

  useEffect(() => {
    fetchGenresList();
    fetchCountriesList();
  }, []);

  const fetchGenresList = async () => {
    const res = await allCodeServie.getByType(ALL_CODE_TYPES.GENRE);
    setGenresList(res?.data?.GENRE);
  };

  const fetchCountriesList = async () => {
    const res = await allCodeServie.getByType(ALL_CODE_TYPES.COUNTRY);
    setCountriesList(res?.data?.COUNTRY);
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
          <nav className="hidden lg:flex items-center gap-0">
            <button className="text-gray-300 hover:text-white hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Phim Lẻ
            </button>
            <button className="text-gray-300 hover:text-white hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Phim Bộ
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white hover:bg-[#1a1f2e] transition px-3 py-2 rounded-md cursor-pointer">
                  Thể loại
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                // className="bg-[#1a1f2e] border-[#2a3040] w-max p-4 rounded-xl shadow-lg"
                className="bg-[#1a1f2e]/70 backdrop-blur-md border border-[#2a3040]/50 
                            w-max p-4 rounded-xl shadow-lg 
                            transition-all duration-300 ease-out 
                            transform origin-top scale-95 opacity-0 
                            data-[state=open]:scale-100 data-[state=open]:opacity-100"
              >
                <div className="flex  flex-col flex-wrap gap-x-0  max-h-[592px] overflow-hidden">
                  {genresList.map((genre, index) => (
                    <button
                      key={`${index}-${genre.id}`}
                      className="text-gray-300 hover:text-[#d4af37] transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                    >
                      {genre.valueVi}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white hover:bg-[#1a1f2e] transition px-3 py-2 rounded-md cursor-pointer">
                  Quốc gia
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-[#1a1f2e]/70 backdrop-blur-md border border-[#2a3040]/50 
                            w-max p-4 rounded-xl shadow-lg 
                            transition-all duration-300 ease-out 
                            transform origin-top scale-95 opacity-0 
                            data-[state=open]:scale-100 data-[state=open]:opacity-100"
              >
                <div className="flex  flex-col flex-wrap gap-x-0  max-h-[592px] overflow-hidden">
                  {countriesList.map((country, index) => (
                    <button
                      key={`${index}-${country.id}`}
                      className="text-gray-300 hover:text-[#d4af37] transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                    >
                      {country.valueVi}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="text-gray-300 hover:text-white hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Xem Chung
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-white hover:bg-[#1a1f2e] transition px-3 py-2 rounded-md cursor-pointer">
                  Thêm
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-[#1a1f2e]/70 backdrop-blur-md border border-[#2a3040]/50 
                          w-max p-4 rounded-xl shadow-lg 
                          transition-all duration-300 ease-out 
                          transform origin-top scale-95 opacity-0 
                          data-[state=open]:scale-100 data-[state=open]:opacity-100"
              >
                <div className="flex  flex-col flex-wrap gap-x-0  max-h-[592px] overflow-hidden">
                  <button
                    className="text-gray-300 hover:text-[#d4af37] transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                  >
                    Mới cập nhật
                  </button>
                  <button
                    className="text-gray-300 hover:text-[#d4af37] transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                  >
                    Phổ biến
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="text-gray-300 hover:text-white hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Phim VIP
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:bg-[#1a1f2e] cursor-pointer bg-transparent border-none transition px-3 py-2 rounded-md">
              <span>Chat với FlixAI</span>
            </Button>
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
