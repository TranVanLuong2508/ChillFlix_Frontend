"use client";

import {
  Search,
  Bell,
  ChevronDown,
  Heart,
  Plus,
  CircleUserRound,
  RotateCw,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { allCodeServie, authService } from "@/services";
import type { AllCodeRow } from "@/types/allcode.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { toast } from "sonner";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthStore } from "@/stores/authStore";
import { useAuthModalStore } from "@/stores/authModalStore";
import { AuthenticationsMessage } from "@/constants/messages/user.message";
import { useChatDrawerStore } from "@/stores/chatDrawerStore";
import { socket } from "@/lib/socket";
import { useCommentStore } from "@/stores/comentStore";
import SearchDropdown from "./header/search-dropdown";

export default function Header() {
  const [genresList, setGenresList] = useState<AllCodeRow[]>([]);
  const [countriesList, setCountriesList] = useState<AllCodeRow[]>([]);
  const [activeTab, setActiveTab] = useState("film");
  const { openLoginModal } = useAuthModalStore();

  const { goHome, goProfile, goUpgradeVip } = useAppRouter();
  const { openDrawer } = useChatDrawerStore();
  const { logOutAction, isAuthenticated, isLoading, authUser } = useAuthStore();
  const {
    removeCommentRealtime,
    createCommentRealtime,
    replyCommentRealtime,
    countCommentsRealtime,
  } = useCommentStore();

  useEffect(() => {
    fetchGenresList();
    fetchCountriesList();
  }, []);

  const fetchGenresList = async () => {
    const res = await allCodeServie.getGenresList();
    if (res && res.EC === 1) {
      setGenresList(res?.data?.GENRE || []);
    } else setGenresList([]);
  };

  const fetchCountriesList = async () => {
    const res = await allCodeServie.getCountriesList();
    if (res && res.EC === 1) {
      setCountriesList(res.data?.COUNTRY || []);
    } else setCountriesList([]);
  };

  const haneleLogOut = async () => {
    try {
      const res = await authService.callLogout();

      if (res && res.EC === 1) {
        goHome();
        toast.success(AuthenticationsMessage.logoutSucess);
        logOutAction();
      }
    } catch (error) {
      console.log("Error Logout: ", error);
    }
  };

  const [notifications, setNotifications] = useState<
    { id: string; type: string; message: string; createdAt: Date }[]
  >([]);

  useEffect(() => {
    socket.off("connect");
    socket.off("newComment");
    socket.off("replyComment");
    socket.off("deleteComment");

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("newComment", (data) => {
      const currentUser = useAuthStore.getState().authUser;
      if (data.user?.userId === currentUser?.userId) return;
      createCommentRealtime(data);
    });

    socket.on("replyComment", (data) => {
      const currentUser = useAuthStore.getState().authUser;
      if (data.replyComment?.user?.userId === currentUser?.userId) return;

      replyCommentRealtime({
        parentId: data.parentId,
        comment: data.replyComment,
      });

      const message = `${data.replyComment.user?.fullName} đã trả lời bình luận của ${data.replyToUser?.fullName}: "${data.replyComment.content}"`;
      setNotifications((prev) => [
        {
          id: crypto.randomUUID(),
          type: "reply",
          message,
          createdAt: new Date(),
        },
        ...prev,
      ]);
      toast.success(message);
    });

    socket.on("deleteComment", ({ commentId }) => {
      removeCommentRealtime(commentId);
      toast.warning("Một bình luận đã bị xóa");
    });
    socket.on("countComments", (data) => {
      const { filmId: eventFilmId, total } = data;
      countCommentsRealtime(eventFilmId, total);
    });

    return () => {
      socket.off("connect");
      socket.off("newComment");
      socket.off("replyComment");
      socket.off("deleteComment");
    };
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#0f1419]/70 backdrop-blur-md border-b border-[#1a1f2e]/60">
      <div className=" mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#0f1419] rounded-full flex items-center justify-center">
                <span
                  onClick={() => {
                    goHome();
                  }}
                  className="text-[#d4af37] font-bold text-lg"
                >
                  ▶
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">ChillFlix</h1>
            </div>
          </div>

          {/* Search Bar */}
          <SearchDropdown />

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-0">
            <button className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Phim Lẻ
            </button>
            <button className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Phim Bộ
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-3 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
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
                      className="text-gray-300 hover:text-yellow-400 transition text-sm whitespace-nowrap cursor-pointer text-left
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
                <button className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-3 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
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
                      className="text-gray-300 hover:text-yellow-400 transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                    >
                      {country.valueVi}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Xem Chung
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-3 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
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
                    className="text-gray-300 hover:text-yellow-400 transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                  >
                    Mới cập nhật
                  </button>
                  <button
                    className="text-gray-300 hover:text-yellow-400 transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                  >
                    Phổ biến
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md">
              Phim VIP
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={openDrawer}
              className="flex items-center gap-2 text-[16px] text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] cursor-pointer bg-transparent border-none transition px-3 py-2 rounded-md"
            >
              <span>Chat với FlixAI</span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] relative cursor-pointer transition-all duration-200 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                >
                  <Bell className="w-8 h-8" strokeWidth={2.6} />
                  {/* <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span> */}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
                    bg-[#1a1f2e]/70 backdrop-blur-md text-gray-300 border border-[#2a3040]/60 
                    rounded-2xl w-80 p-0 shadow-xl overflow-hidden mt-2
                    transition-all duration-300 ease-out
                    transform origin-top-right scale-95 opacity-0 
                    data-[state=open]:scale-100 data-[state=open]:opacity-100
                  "
              >
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* Header Tabs */}
                  <div className="border-b border-[#2a3040] relative overflow-hidden">
                    <TabsList className="bg-transparent flex text-sm font-medium w-full justify-start relative">
                      {["film", "community", "read"].map((tab) => (
                        <TabsTrigger
                          key={tab}
                          value={tab}
                          className={`relative flex-1 py-2 transition-all duration-300 rounded-none cursor-pointer data-[state=active]:bg-transparent data-[state=active]:text-yellow-400

                    ${
                      activeTab === tab
                        ? "text-yellow-400 font-semibold scale-[1.03]"
                        : "text-gray-400 hover:text-yellow-300"
                    }`}
                        >
                          {tab === "film" && "Phim"}
                          {tab === "community" && "Cộng đồng"}
                          {tab === "read" && "Đã đọc"}

                          {/* Underline animation */}
                          <span
                            className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ${
                              activeTab === tab
                                ? "w-full opacity-100"
                                : "w-0 opacity-0"
                            }`}
                          />
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {/* Nội dung từng tab */}
                  <TabsContent
                    value="film"
                    className="p-4 text-sm text-center text-gray-400"
                  >
                    Không có thông báo phim nào
                  </TabsContent>

                  <TabsContent
                    value="community"
                    className="p-4 text-sm text-gray-300 max-h-80 overflow-y-auto text-left"
                  >
                    {notifications.length === 0 ? (
                      <div className="text-center text-gray-500">
                        Không có thông báo cộng đồng nào
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {notifications.map((n) => (
                          <li
                            key={n.id}
                            className="bg-[#1a1f2e]/60 border border-[#2a3040]/60 rounded-lg p-3 hover:bg-[#2a3040]/60 transition-all"
                          >
                            <div className="text-[13px]">{n.message}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {n.createdAt.toLocaleTimeString("vi-VN")}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TabsContent>

                  <TabsContent
                    value="read"
                    className="p-4 text-sm text-center text-gray-400 "
                  >
                    Chưa có thông báo đã đọc
                  </TabsContent>
                </Tabs>

                <DropdownMenuSeparator className="bg-[#2a3040] p-0 m-0" />

                {/* Nút xem toàn bộ */}
                <div
                  className="    p-3 text-center text-sm font-medium text-yellow-400
                        cursor-pointer transition-all duration-300
                        bg-[#1a1f2e]/40 backdrop-blur-md border-t border-[#2a3040]/70
                        hover:bg-[#2a3040]/60 hover:text-yellow-300
                        hover:shadow-[0_0_10px_rgba(245,213,71,0.2)]
                        active:scale-[0.98]"
                >
                  Xem toàn bộ
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu Dropdown */}

            <div className="w-[120px] flex justify-end">
              {isLoading ? (
                <div className="w-10 h-10 rounded-full bg-[#2a3040]/60 animate-pulse" />
              ) : (
                <>
                  {!isAuthenticated ? (
                    <button
                      onClick={openLoginModal}
                      className="px-5 py-2.5 rounded-full text-[#0f1419] font-semibold text-sm
            bg-gradient-to-r from-[#f7d658] to-[#d4af37] cursor-pointer"
                    >
                      Thành viên
                    </button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none focus:ring-0 flex items-center cursor-pointer">
                          <Image
                            src="/images/vn_flag.svg"
                            alt="User Avatar"
                            width={30}
                            height={30}
                            className="w-10 h-10 rounded-full border-2 border-yellow-400/50"
                          />
                        </button>
                      </DropdownMenuTrigger>
                      {/* menu content */}{" "}
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#1a1f2e]/70 backdrop-blur-md border border-[#2a3040]/50 
                        w-64 p-0 rounded-2xl shadow-xl overflow-hidden mt-2
                        transition-all duration-300 ease-out
                        transform origin-top-right scale-95 opacity-0 
                        data-[state=open]:scale-100 data-[state=open]:opacity-100"
                      >
                        {/* User Info Section */}
                        <div className="p-4 border-b border-[#2a3040]/50">
                          <div className="flex items-center gap-3 mb-3">
                            <Image
                              src="/images/vn_flag.svg"
                              alt="User Avatar"
                              width={30}
                              height={30}
                              className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer hover:scale-105 transition-transform object-cover border-2 border-yellow-400/50"
                            />
                            <div>
                              <h3 className="text-white font-semibold flex items-center gap-1">
                                {authUser.fullName}
                              </h3>
                              <p className="text-gray-400 text-xs">
                                Nâng cấp tài khoản ChillFlix để có trải nghiệm
                                đẳng cấp hơn.
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              goUpgradeVip();
                            }}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0f1419] font-semibold py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all cursor-pointer"
                          >
                            Nâng cấp ngay
                          </button>
                        </div>
                        {/* Balance Section */}
                        {/* <div className="px-4 py-3 border-b border-[#2a3040]/50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                              <span className="text-[#0f1419] text-xs font-bold">
                                $
                              </span>
                            </div>
                            <span className="text-gray-300 text-sm">Số dư</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400 font-semibold">
                              0
                            </span>
                            <div className="w-5 h-5 bg-[#2a3040] rounded-full flex items-center justify-center">
                              <span className="text-yellow-400 text-xs font-bold">
                                ₽
                              </span>
                            </div>
                            <button className="bg-[#2a3040] text-yellow-400 text-xs font-medium px-2 py-1 rounded hover:bg-[#3a4050] transition flex items-center text-[12px]">
                              <Plus strokeWidth={1} /> Nạp
                            </button>
                          </div>
                        </div> */}
                        {/* Menu Items */}
                        <div className="py-2">
                          <button className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a3040]/50 transition text-sm">
                            <span className="text-lg">
                              <Heart />
                            </span>
                            <span>Yêu thích</span>
                          </button>
                          <button className="w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a3040]/50 transition text-sm">
                            <span className="text-lg">
                              <Plus />
                            </span>
                            <span>Danh sách</span>
                          </button>
                          <button className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a3040]/50 transition text-sm">
                            <span className="text-lg">
                              <RotateCw />
                            </span>
                            <span>Xem tiếp</span>
                          </button>
                          <button className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a3040]/50 transition text-sm">
                            <span className="text-lg">
                              <CircleUserRound />
                            </span>
                            <span>Tài khoản</span>
                          </button>
                        </div>
                        <DropdownMenuSeparator className="bg-[#2a3040]/50 m-0" />
                        {/* Logout */}
                        <button
                          onClick={() => haneleLogOut()}
                          className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-[#2a3040]/60 hover:text-yellow-400 text-gray-300 transition text-sm hover:shadow-[0_0_10px_rgba(245,213,71,0.2)] cursor-pointer"
                        >
                          <span className="text-lg">
                            <LogOut />
                          </span>
                          <span>Thoát</span>
                        </button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
