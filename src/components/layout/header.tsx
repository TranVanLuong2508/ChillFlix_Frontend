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
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { allCodeServie, authService } from "@/services";
import type { AllCodeRow } from "@/types/allcode.type";
import { IBackendRes } from "@/types/backend.type";
import { FilmDetailRes } from "@/types/film.type";
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
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useAuthModalStore } from "@/stores/authModalStore";
import { AuthenticationsMessage } from "@/constants/messages/user.message";
import { useChatDrawerStore } from "@/stores/chatDrawerStore";
import { socket } from "@/lib/socket";
import { useCommentStore } from "@/stores/comentStore";
import { useRatingStore } from "@/stores/ratingStore";
import SearchDropdown from "./header/search-dropdown";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  NewCommentData,
  ReplyCommentData,
  ReplyNotificationData,
  ReactionNotificationData,
  DeleteCommentData,
  CountCommentsData,
} from "@/types/socket.type";

export default function Header() {
  const [genresList, setGenresList] = useState<AllCodeRow[]>([]);
  const [countriesList, setCountriesList] = useState<AllCodeRow[]>([]);
  const [activeTab, setActiveTab] = useState("film");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { openLoginModal } = useAuthModalStore();

  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showAllReadNotifications, setShowAllReadNotifications] =
    useState(false);

  const {
    goHome,
    goProfile,
    goPlaylist,
    goFavorite,
    goUpgradeVip,
    goSingleFilms,
    goSeriesFilms,
    goGenre,
    goCountry,
    goMostViewed,
    goLatestUpdate,
    goCoWatching,
    goFilmVip,
  } = useAppRouter();
  const { openDrawer } = useChatDrawerStore();

  const { logOutAction, isAuthenticated, isLoading, authUser } = useAuthStore();

  const {
    removeCommentRealtime,
    createCommentRealtime,
    replyCommentRealtime,
    countCommentsRealtime,
    reactCommentRealtime,
    hideCommentRealtime,
    unhideCommentRealtime,
  } = useCommentStore();

  const { hideRatingRealtime } = useRatingStore();

  const {
    notifications,
    unreadCount,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    deleteNotification,
    reset: resetNotifications,
  } = useNotificationStore();

  useEffect(() => {
    fetchGenresList();
    fetchCountriesList();
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      if (authUser?.userId) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        await Promise.all([fetchNotifications(1, 20), fetchUnreadCount()]);
      } else {
        resetNotifications();
      }
    };

    fetchData();
  }, [
    authUser?.userId,
    isAuthenticated,
    fetchNotifications,
    fetchUnreadCount,
    resetNotifications,
  ]);

  useEffect(() => {
    const userId = authUser?.userId;
    if (userId) {
      socket.emit("register", { userId });
    }
  }, [authUser?.userId]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchGenresList = async () => {
    const res = await allCodeServie.getGenresList();
    if (res && res.EC === 1) {
      setGenresList(res.data?.GENRE || []);
    } else {
      setGenresList([]);
    }
  };

  const fetchCountriesList = async () => {
    const res = await allCodeServie.getCountriesList();
    if (res && res.EC === 1) {
      setCountriesList(res.data?.COUNTRY || []);
    } else {
      setCountriesList([]);
    }
  };

  const haneleLogOut = async () => {
    try {
      const res = await authService.callLogout();

      if (res && res.EC === 1) {
        goHome();
        toast.success(AuthenticationsMessage.logoutSucess);
        logOutAction();
      }
    } catch (_error) {
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  const refreshNotifications = async () => {
    await Promise.all([fetchNotifications(1, 20), fetchUnreadCount()]);
  };

  useEffect(() => {
    const handleConnect = () => {
      if (authUser?.userId) {
        socket.emit("register", { userId: authUser.userId });
      }
    };

    const handleNewComment = (data: NewCommentData) => {
      if (data.user?.userId === authUser?.userId || data?.parent) return;
      createCommentRealtime(data);
    };

    const handleReplyComment = (data: ReplyCommentData) => {
      if (data.replyComment?.user?.userId === authUser?.userId) return;
      replyCommentRealtime({
        parentId: data.parentId,
        comment: data.replyComment,
      });
    };

    const handleReplyNotification = async (data: ReplyNotificationData) => {
      if (!authUser || String(data.targetUserId) !== String(authUser.userId)) {
        return;
      }

      const message = `${data.replyComment.user.fullName} đã trả lời bình luận của bạn: "${data.replyComment.content}"`;

      await refreshNotifications();
      toast.success(message);
    };

    const handleReactionNotification = async (
      data: ReactionNotificationData
    ) => {
      if (!authUser || String(data.targetUserId) !== String(authUser.userId)) {
        return;
      }

      const reactionText =
        data.reactionType === "LIKE" ? "thích" : "không thích";
      const message = `${data.reactionUser.fullName} đã ${reactionText} bình luận của bạn`;

      await refreshNotifications();
      toast.success(message);
    };

    const handleDeleteComment = ({ commentId }: DeleteCommentData) => {
      removeCommentRealtime(commentId);
    };

    const handleCountComments = ({ filmId, total }: CountCommentsData) => {
      countCommentsRealtime(filmId, total);
    };

    socket.on("connect", handleConnect);
    socket.on("newComment", handleNewComment);
    socket.on("replyComment", handleReplyComment);
    socket.on("replyNotification", handleReplyNotification);
    socket.on("reactionNotification", handleReactionNotification);
    socket.on("deleteComment", handleDeleteComment);
    socket.on("countComments", handleCountComments);
    socket.on("reactComment", reactCommentRealtime);
    socket.on("hideComment", ({ commentId, isHidden }) => {
      hideCommentRealtime(commentId, isHidden);
    });
    socket.on("unhideComment", (comment) => {
      unhideCommentRealtime(comment);
    });
    socket.on('hiddenCommentNotification', async (data) => {
      toast.warning(data.message);
      await refreshNotifications();
    });
    socket.on('warningNotification', async (data) => {
      toast.warning(data.message, {
        duration: 5000,
      });
      await refreshNotifications();
    });
    socket.on('infoNotification', async (data) => {
      toast.success(data.message, {
        duration: 5000,
      });
      await refreshNotifications();
    });
    socket.on('hideRating', ({ ratingId, isHidden, filmId }) => {
      hideRatingRealtime(ratingId, isHidden, filmId);
    });
    return () => {
      socket.off("connect", handleConnect);
      socket.off("newComment", handleNewComment);
      socket.off("replyComment", handleReplyComment);
      socket.off("replyNotification", handleReplyNotification);
      socket.off("reactionNotification", handleReactionNotification);
      socket.off("deleteComment", handleDeleteComment);
      socket.off("countComments", handleCountComments);
      socket.off("reactComment", reactCommentRealtime);
      socket.off("hideComment");
      socket.off("unhideComment");
      socket.off("hiddenCommentNotification");
      socket.off("warningNotification");
      socket.off("infoNotification");
      socket.off("hideRating");
    };
  }, [
    authUser?.userId,
    createCommentRealtime,
    replyCommentRealtime,
    removeCommentRealtime,
    countCommentsRealtime,
    reactCommentRealtime,
    hideCommentRealtime,
    unhideCommentRealtime,
    hideRatingRealtime,
    refreshNotifications,
  ]);

  return (
    <header
      className={`
    fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out
    ${isScrolled
          ? "bg-[#0f1419]/80 backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }
  `}
    >
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4 lg:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"} transition p-2 rounded-md`}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-[#0f1419] rounded-full flex items-center justify-center">
                <span
                  onClick={goHome}
                  className="text-[#d4af37] font-bold text-base md:text-lg"
                >
                  ▶
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-base md:text-lg">ChillFlix</h1>
            </div>
          </div>

          {/* Search Bar */}
          <SearchDropdown isScrolled={isScrolled} />

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-0">
            <button
              className={`text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                } transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md`}
              onClick={() => {
                goSingleFilms();
              }}
            >
              Phim Lẻ
            </button>
            <button
              className={`text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                } transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md`}
              onClick={() => {
                goSeriesFilms();
              }}
            >
              Phim Bộ
            </button>

            {/* Thể loại */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 text-white hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                    } transition px-3 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none`}
                >
                  Thể loại
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
                <div className="flex flex-col flex-wrap gap-x-0 max-h-[592px] overflow-hidden">
                  {genresList.map((genre, index) => (
                    <button
                      key={`${index}-${genre.id}`}
                      className="text-gray-300 hover:text-yellow-400 transition text-sm whitespace-nowrap cursor-pointer text-left
                        w-[140px] h-[40px] px-3 py-[3px] rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                      onClick={() => {
                        goGenre(genre.valueEn as string);
                      }}
                    >
                      {genre.valueVi}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quốc gia */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                    } transition px-3 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none`}
                >
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
                <div className="flex flex-col flex-wrap gap-x-0 max-h-[592px] overflow-hidden">
                  {countriesList.map((country, index) => (
                    <button
                      key={`${index}-${country.id}`}
                      className="text-gray-300 hover:text-yellow-400 transition text-sm whitespace-nowrap cursor-pointer text-left
                        w-[140px] h-[40px] px-3 py-[3px] rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                      onClick={() => {
                        goCountry(country.valueEn as string);
                      }}
                    >
                      {country.valueVi}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className={`text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                } transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md`}
              onClick={goCoWatching}
            >
              Xem Chung
            </button>

            {/* Thêm */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                    } transition px-3 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none`}
                >
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
                    onClick={() => {
                      goLatestUpdate();
                    }}
                  >
                    Mới cập nhật
                  </button>
                  <button
                    className="text-gray-300 hover:text-yellow-400 transition text-sm whitespace-nowrap cursor-pointer text-left
                       w-[140px] h-[40px] px-3 py-[3px]  rounded-md hover:bg-[#2a3040] text-[13px] overflow-hidden"
                    onClick={() => {
                      goMostViewed();
                    }}
                  >
                    Phổ biến
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className={`text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                } transition bg-transparent border-none cursor-pointer px-3 py-2 rounded-md`}
              onClick={goFilmVip}
            >
              Phim VIP
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={openDrawer}
              className={`hidden md:flex items-center gap-2 text-[16px] text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                } cursor-pointer bg-transparent border-none transition px-3 py-2 rounded-md`}
            >
              <span>Chat với FlixAI</span>
            </button>

            {/* Bell + Notifications */}
            <DropdownMenu
              onOpenChange={(open) => {
                if (!open) {
                  setShowAllNotifications(false);
                  setShowAllReadNotifications(false);
                }
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-gray-300 hover:text-yellow-400 ${isScrolled ? "hover:bg-[#1a1f2e]" : "hover:bg-transparent"
                    } relative cursor-pointer transition-all duration-200 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none`}
                >
                  <Bell className="w-8 h-8" strokeWidth={2.6} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-[#1a1f2e]/70 backdrop-blur-md text-gray-300 border border-[#2a3040]/60 
                  rounded-2xl w-80 p-0 shadow-xl overflow-hidden mt-2
                  transition-all duration-300 ease-out
                  transform origin-top-right scale-95 opacity-0 
                  data-[state=open]:scale-100 data-[state=open]:opacity-100"
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => {
                    setActiveTab(value);
                    setShowAllNotifications(false);
                    setShowAllReadNotifications(false);
                  }}
                >
                  {/* Header Tabs */}
                  <div className="relative overflow-hidden border-b border-[#2a3040]">
                    <TabsList className="relative flex w-full justify-start bg-transparent text-sm font-medium">
                      {["film", "community", "read"].map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                          <TabsTrigger
                            key={tab}
                            value={tab}
                            className={`relative flex-1 cursor-pointer rounded-none py-2 transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:text-yellow-400 
                              ${isActive
                                ? "text-yellow-400 font-semibold scale-[1.03]"
                                : "text-gray-400 hover:text-yellow-300"
                              }`}
                          >
                            {tab === "film" && "Phim"}
                            {tab === "community" && "Cộng đồng"}
                            {tab === "read" && "Đã đọc"}

                            <span
                              className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ${isActive
                                ? "w-full opacity-100"
                                : "w-0 opacity-0"
                                }`}
                            />
                            {tab === "community" && unreadCount > 0 && (
                              <span className="absolute top-3 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                            )}
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </div>

                  {/* TAB: film */}
                  <TabsContent
                    value="film"
                    className="p-4 text-center text-sm text-gray-400"
                  >
                    Không có thông báo phim nào
                  </TabsContent>

                  {/* TAB: community (chưa đọc) */}
                  <TabsContent
                    value="community"
                    className={`p-4 text-left text-sm text-gray-300 ${showAllNotifications
                      ? "max-h-[500px] overflow-y-auto"
                      : ""
                      }`}
                  >
                    {notifications.filter((n) => !n.isRead).length === 0 ? (
                      <div className="text-center text-gray-500">
                        Không có thông báo chưa đọc
                      </div>
                    ) : (
                      <>
                        <ul className="space-y-3">
                          {notifications
                            .filter((n) => !n.isRead)
                            .slice(0, showAllNotifications ? undefined : 3)
                            .map((n) => (
                              <li
                                key={n.notificationId}
                                className="cursor-pointer rounded-lg border border-[#2a3040]/60 bg-[#1a1f2e]/60 p-3 transition-all hover:bg-[#2a3040]/60"
                                onClick={async () => {
                                  try {
                                    if (n.notificationId > 0 && !n.isRead) {
                                      await markAsRead(n.notificationId);
                                      refreshNotifications();
                                    }
                                    if (!n.result?.filmId && !n.result?.slug) return;

                                    const isHiddenType = ['hidden_comment', 'violation_warning'].includes(n.type);
                                    const commentId = isHiddenType ? null : (n.result.commentId || n.result.parentId);

                                    const currentPath =
                                      window.location.pathname;
                                    const isOnSameFilm =
                                      n.result?.slug &&
                                      (currentPath.includes(
                                        `/film-detail/${n.result.slug}`
                                      ) ||
                                        currentPath.includes(
                                          `/play/${n.result.slug}`
                                        ));
                                    if (isOnSameFilm) {
                                      const { eventBus } = await import(
                                        "@/lib/eventBus"
                                      );
                                      eventBus.emit("switchTab", "comments");

                                      if (commentId) {
                                        const url = new URL(window.location.href);
                                        url.searchParams.set(
                                          "commentId",
                                          String(commentId)
                                        );
                                        url.searchParams.set(
                                          "t",
                                          Date.now().toString()
                                        );
                                        window.history.replaceState(
                                          null,
                                          "",
                                          url.toString()
                                        );
                                      }
                                      return;
                                    }
                                    if (n.result?.slug) {
                                      if (commentId) {
                                        router.push(
                                          `/film-detail/${n.result.slug}?commentId=${commentId}&t=${Date.now()}`
                                        );
                                      } else {
                                        router.push(`/film-detail/${n.result.slug}`);
                                      }
                                    } else {
                                      try {
                                        const filmServices = (
                                          await import("@/services/filmService")
                                        ).default;
                                        const filmData =
                                          (await filmServices.getFilmById(
                                            String(n.result.filmId)
                                          )) as IBackendRes<FilmDetailRes>;
                                        const slug =
                                          filmData?.data?.film?.slug ||
                                          filmData?.data?.film.slug;
                                        if (filmData?.EC === 1 && slug) {
                                          if (commentId) {
                                            router.push(
                                              `/film-detail/${slug}?commentId=${commentId}&t=${Date.now()}`
                                            );
                                          } else {
                                            router.push(`/film-detail/${slug}`);
                                          }
                                        } else {
                                          toast.error(
                                            "Không tìm thấy thông tin. Vui lòng thử lại sau."
                                          );
                                        }
                                      } catch {
                                        toast.error(
                                          "Không thể tải thông tin phim. Vui lòng thử lại sau."
                                        );
                                      }
                                    }
                                  } catch {
                                    toast.error(
                                      "Không thể xử lý thông báo. Vui lòng thử lại."
                                    );
                                  }
                                }}
                              >
                                <div className="flex items-start gap-2">
                                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                                  <div className="min-w-0 flex-1">
                                    <div className="whitespace-normal break-words text-[13px]">
                                      {n.message}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                      {new Date(n.createdAt).toLocaleTimeString(
                                        "vi-VN"
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (n.notificationId > 0) {
                                        deleteNotification(
                                          n.notificationId
                                        ).catch(() => {
                                          toast.error(
                                            "Không thể xóa thông báo. Vui lòng thử lại."
                                          );
                                        });
                                      }
                                    }}
                                    className="flex-shrink-0 p-1 text-gray-400 transition-colors hover:text-red-400"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              </li>
                            ))}
                        </ul>
                        {notifications.filter((n) => !n.isRead).length > 3 && (
                          <button
                            onClick={() =>
                              setShowAllNotifications(!showAllNotifications)
                            }
                            className="mt-3 w-full py-2 text-center text-sm font-medium text-yellow-400 transition-colors hover:text-yellow-300"
                          >
                            {showAllNotifications
                              ? "Thu gọn"
                              : `Xem tất cả (${notifications.filter((n) => !n.isRead).length
                              } thông báo)`}
                          </button>
                        )}
                      </>
                    )}
                  </TabsContent>

                  {/* TAB: read (đã đọc) */}
                  <TabsContent
                    value="read"
                    className={`p-4 text-left text-sm text-gray-300 ${showAllReadNotifications
                      ? "max-h-[500px] overflow-y-auto"
                      : ""
                      }`}
                  >
                    {notifications.filter((n) => n.isRead).length === 0 ? (
                      <div className="text-center text-gray-500">
                        Chưa có thông báo đã đọc
                      </div>
                    ) : (
                      <>
                        <ul className="space-y-3">
                          {notifications
                            .filter((n) => n.isRead)
                            .slice(0, showAllReadNotifications ? undefined : 3)
                            .map((n) => (
                              <li
                                key={n.notificationId}
                                className="cursor-pointer rounded-lg border border-[#2a3040]/60 bg-[#1a1f2e]/60 p-3 opacity-70 transition-all hover:bg-[#2a3040]/60"
                                onClick={async () => {
                                  if (!n.result?.filmId) return;

                                  const isHiddenType = ['hidden_comment', 'violation_warning'].includes(n.type);
                                  const commentId = isHiddenType ? null : (n.result.commentId || n.result.parentId);
                                  const currentPath = window.location.pathname;
                                  const isOnSameFilm =
                                    n.result?.slug &&
                                    (currentPath.includes(
                                      `/film-detail/${n.result.slug}`
                                    ) ||
                                      currentPath.includes(
                                        `/play/${n.result.slug}`
                                      ));

                                  if (isOnSameFilm) {
                                    const { eventBus } = await import(
                                      "@/lib/eventBus"
                                    );
                                    eventBus.emit("switchTab", "comments");
                                    if (commentId) {
                                      const url = new URL(window.location.href);
                                      url.searchParams.set(
                                        "commentId",
                                        String(commentId)
                                      );
                                      url.searchParams.set(
                                        "t",
                                        Date.now().toString()
                                      );
                                      window.history.replaceState(
                                        null,
                                        "",
                                        url.toString()
                                      );
                                    }
                                    return;
                                  } else if (n.result?.slug) {
                                    if (commentId) {
                                      router.push(
                                        `/film-detail/${n.result.slug
                                        }?commentId=${commentId}&t=${Date.now()}`
                                      );
                                    } else {
                                      router.push(
                                        `/film-detail/${n.result.slug}`
                                      );
                                    }
                                  }
                                }}
                              >
                                <div className="flex items-start gap-2">
                                  <div className="mt-1.5 h-2 w-2 rounded-full" />
                                  <div className="min-w-0 flex-1">
                                    <div className="whitespace-normal break-words text-[13px]">
                                      {n.message}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                      {new Date(n.createdAt).toLocaleTimeString(
                                        "vi-VN"
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (n.notificationId > 0) {
                                        deleteNotification(
                                          n.notificationId
                                        ).catch(() => {
                                          toast.error(
                                            "Không thể xóa thông báo. Vui lòng thử lại."
                                          );
                                        });
                                      }
                                    }}
                                    className="flex-shrink-0 p-1 text-gray-400 transition-colors hover:text-red-400"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              </li>
                            ))}
                        </ul>

                        {notifications.filter((n) => n.isRead).length > 3 && (
                          <button
                            onClick={() =>
                              setShowAllReadNotifications(
                                !showAllReadNotifications
                              )
                            }
                            className="mt-3 w-full py-2 text-center text-sm font-medium text-yellow-400 transition-colors hover:text-yellow-300"
                          >
                            {showAllReadNotifications
                              ? "Thu gọn"
                              : `Xem tất cả (${notifications.filter((n) => n.isRead).length
                              } thông báo)`}
                          </button>
                        )}
                      </>
                    )}
                  </TabsContent>
                </Tabs>

                <DropdownMenuSeparator className="bg-[#2a3040] p-0 m-0" />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu Dropdown */}
            <div className="flex justify-end">
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
                    <DropdownMenu
                      open={isUserMenuOpen}
                      onOpenChange={setIsUserMenuOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none focus:ring-0 flex items-center cursor-pointer">
                          <Image
                            src={authUser.avatarUrl || "/images/vn_flag.svg"}
                            alt="User Avatar"
                            width={30}
                            height={30}
                            className="w-10 h-10 rounded-full border-2 border-yellow-400/50"
                          />
                        </button>
                      </DropdownMenuTrigger>
                      {/* menu content */}
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#1a1f2e]/70 backdrop-blur-md border border-[#2a3040]/50 
                        w-64 md:w-64 p-0 rounded-2xl shadow-xl overflow-hidden mt-2
                        transition-all duration-300 ease-out
                        transform origin-top-right scale-95 opacity-0 
                        data-[state=open]:scale-100 data-[state=open]:opacity-100"
                      >
                        {/* User Info Section */}
                        <div className="p-4 border-b border-[#2a3040]/50">
                          <div className="flex items-center gap-3 mb-3">
                            <Image
                              src={authUser.avatarUrl || "/images/vn_flag.svg"}
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
                                {isAuthenticated && authUser.isVip
                                  ? "Bạn đang là thành viên VIP"
                                  : " Nâng cấp tài khoản ChillFlix để có trải nghiệm đẳng cấp hơn."}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              goUpgradeVip();
                            }}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0f1419] font-semibold py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all cursor-pointer"
                          >
                            {isAuthenticated && authUser.isVip
                              ? "Xem thông tin VIP"
                              : "Nâng cấp ngay"}
                          </button>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={goFavorite}
                            className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a3040]/50 transition text-sm"
                          >
                            <span className="text-lg">
                              <Heart />
                            </span>
                            <span>Yêu thích</span>
                          </button>
                          <button
                            onClick={goPlaylist}
                            className="w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a3040]/50 transition text-sm"
                          >
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
                          <button
                            onClick={() => {
                              goProfile();
                            }}
                            className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a3040]/50 transition text-sm"
                          >
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
                          className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-[#2a3040]/60 hover:text-yellow-400 text-gray-300 transition text-sm hover:shadow-[0_0_10px_rgba(245,213,71,0.2)]"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#0f1419] border-r border-[#2a3040] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2a3040]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#0f1419] rounded-full flex items-center justify-center">
                  <span className="text-[#d4af37] font-bold text-sm">▶</span>
                </div>
              </div>
              <h2 className="text-white font-bold text-lg">Menu</h2>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col">
              <button
                className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-6 py-3 text-center"
                onClick={goSingleFilms}
              >
                Phim Lẻ
              </button>
              <button
                className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-6 py-3 text-center"
                onClick={goSeriesFilms}
              >
                Phim Bộ
              </button>

              {/* Thể loại - Mobile */}
              <div className="border-t border-[#2a3040] my-2" />
              <div className="px-6 py-2">
                <h3 className="text-yellow-400 font-semibold text-sm mb-2 text-center">Thể loại</h3>
                <div className="grid grid-cols-2 gap-2">
                  {genresList.map((genre, index) => (
                    <button
                      key={`${index}-${genre.id}`}
                      className="text-gray-300 hover:text-yellow-400 transition text-sm text-center px-3 py-2 rounded-md hover:bg-[#1a1f2e]"
                      onClick={() => goGenre(genre.valueEn as string)}
                    >
                      {genre.valueVi}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quốc gia - Mobile */}
              <div className="border-t border-[#2a3040] my-2" />
              <div className="px-6 py-2">
                <h3 className="text-yellow-400 font-semibold text-sm mb-2 text-center">Quốc gia</h3>
                <div className="grid grid-cols-2 gap-2">
                  {countriesList.map((country, index) => (
                    <button
                      key={`${index}-${country.id}`}
                      className="text-gray-300 hover:text-yellow-400 transition text-sm text-center px-3 py-2 rounded-md hover:bg-[#1a1f2e]"
                      onClick={() => goCountry(country.valueEn as string)}
                    >
                      {country.valueVi}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#2a3040] my-2" />
              <button
                className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-6 py-3 text-center"
                onClick={goCoWatching}
              >
                Xem Chung
              </button>

              <div className="border-t border-[#2a3040] my-2" />
              <button
                className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-6 py-3 text-center"
                onClick={goLatestUpdate}
              >
                Mới cập nhật
              </button>
              <button
                className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-6 py-3 text-center"
                onClick={goMostViewed}
              >
                Phổ biến
              </button>

              <div className="border-t border-[#2a3040] my-2" />
              <button className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-6 py-3 text-center">
                Phim VIP
              </button>

              <div className="border-t border-[#2a3040] my-2" />
              <button
                onClick={openDrawer}
                className="text-gray-300 hover:text-yellow-400 hover:bg-[#1a1f2e] transition px-6 py-3 text-center md:hidden"
              >
                Chat với FlixAI
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
