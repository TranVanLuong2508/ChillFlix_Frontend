import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Heart,
  Plus,
  Send,
  MessageSquare,
  Star,
  LucideIcon,
  Copy,
} from "lucide-react";
import { useRatingStore } from "@/stores/ratingStore";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  WeiboShareButton,
} from "react-share";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { eventBus } from "@/lib/eventBus";
import { userFavoriteStore } from "@/stores/favoriteStore";
import { userServices } from "@/services";
import { useFilmStore } from "@/stores/filmStore";
import { usePlayerStore } from "@/stores/playerStore";
import { userPlaylistStore } from "@/stores/playlistStore";
import { toast } from "sonner";
import { PlayListMessage } from "@/constants/messages/user.message";
import CreatePlaylistModal from "@/components/users/playlists/CreatePlaylistModal";
import { filmPath } from "@/constants/path";
import { useRouter } from "next/navigation";


interface PlayBarProps {
  activeTab: "comments" | "ratings";
  setActiveTab: (tab: "comments" | "ratings") => void;
}

type actionType = {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
};

//luong add

const ModalAdd = ({ action }: { action: actionType }) => {
  const Icon = action.icon;

  const { filmData } = useFilmStore();
  const { userPlaylists, fetchPlaylists } = userPlaylistStore();

  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleToggleFilm = async (
    playlistId: string,
    filmId: string,
    isCheck: boolean
  ) => {
    if (!filmId || !playlistId) return;
    try {
      if (isCheck) {
        const res = await userServices.CallRemoveFilmFromPlaylist(
          playlistId,
          filmId
        );
        if (res && res?.EC === 1) {
          toast.success(PlayListMessage.deleteSucess);
        }
      } else {
        const res = await userServices.CallAddFilmToPlaylist(
          playlistId,
          filmId
        );
        if (res && res?.EC === 1) {
          toast.success(PlayListMessage.addSucess);
        }
      }
      fetchPlaylists();
    } catch (err) {
      console.log("Error toggle playlist:", err);
      toast.error("Lỗi thao tác");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center w-20 h-16 rounded-2xl text-white transition-all duration-300 ease-in-out cursor-pointer hover:text-yellow-400 hover:text-shadow-[0_0_25px_rgba(250,204,21,0.4)] focus:outline-none focus:ring-0">
            <Icon size={18} strokeWidth={2} />
            <span className="text-xs mt-1">{action.label}</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="center"
          sideOffset={0}
          className="w-60 bg-zinc-700/30 backdrop-blur-md border border-white/20 text-gray-200 rounded-2xl p-3 shadow-xl"
        >
          <DropdownMenuLabel className="flex justify-between text-xs uppercase tracking-wide text-gray-400 px-1">
            <span>Danh sách</span>
            <span className="text-gray-500 font-normal">
              {userPlaylists.length}/5
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="my-2 bg-zinc-500" />

          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
            {userPlaylists &&
              userPlaylists.map((pl) => {
                const isCheck =
                  pl.films.findIndex(
                    (item) => item === filmData?.film.filmId
                  ) !== -1
                    ? true
                    : false;
                return (
                  <div
                    key={pl.playlistId}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => {
                      if (filmData?.film.filmId) {
                        handleToggleFilm(
                          pl.playlistId,
                          filmData?.film.filmId,
                          isCheck
                        );
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isCheck}
                      readOnly
                      className="w-4 h-4 accent-yellow-400 cursor-pointer"
                    />
                    <span className="text-sm text-gray-200 group-hover:text-yellow-300 transition">
                      {pl.playlistName}
                    </span>
                  </div>
                );
              })}
          </div>

          <DropdownMenuSeparator className="my-3 bg-zinc-600" />

          <DropdownMenuItem
            onClick={() => setOpenCreate(true)}
            className="flex justify-center p-2 font-medium rounded-md cursor-pointer text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_12px_rgba(250,204,21,0.45)] focus:bg-yellow-400 focus:text-black transition-all duration-200 ease-in-out"
          >
            + Thêm mới
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreatePlaylistModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </>
  );
};

//end luong add


const ModalShare = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { filmData } = useFilmStore();
  const filmTitle = filmData?.film?.title || "";
  const filmDescription = filmData?.film?.description || "";
  let filmImage = "";
  if (filmData?.filmImages?.poster) {
    filmImage = filmData.filmImages.poster;
  }
  else if (filmData?.film?.filmImages && Array.isArray(filmData.film.filmImages)) {
    const posterObj = filmData.film.filmImages.find((img) => img.type === "poster");
    filmImage = posterObj?.url || "";
  }
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl);
    toast.success("Đã sao chép link!", {
      description: "Bạn có thể gửi cho bạn bè.",
      duration: 2500,
      position: "top-center",
      // className: "bg-zinc-900/90 text-yellow-400 border border-yellow-500/30 rounded-xl px-5 py-4 shadow-[0_0_25px_rgba(250,204,21,0.25)]",
    });
  };
  const socialItems = [
    {
      icon: <i className="fa-brands fa-facebook-f text-white text-lg"></i>,
      color: "bg-blue-600 hover:bg-blue-600/80",
      name: "Facebook",
      ButtonComponent: FacebookShareButton,
      props: {
        url: currentUrl,
        hashtag: "#ChillFlix",
        quote: filmDescription,

      },
    },
    {
      icon: <i className="fa-brands fa-x-twitter text-white text-lg"></i>,
      color: "bg-black hover:bg-zinc-950",
      name: "Twitter",
      ButtonComponent: TwitterShareButton,
      props: {
        url: currentUrl,
        title: filmTitle,

      },
    },
    {
      icon: <i className="fa-brands fa-telegram text-white text-lg"></i>,
      color: "bg-sky-500 hover:bg-sky-500/80",
      name: "Telegram",
      ButtonComponent: TelegramShareButton,
      props: {
        url: currentUrl,
        title: filmTitle,

      },
    },
    {
      icon: <i className="fa-brands fa-whatsapp text-white text-lg"></i>,
      color: "bg-green-600 hover:bg-green-600/80",
      name: "WhatsApp",
      ButtonComponent: WhatsappShareButton,
      props: {
        url: currentUrl,
        title: filmTitle,

      },
    },
    {
      icon: <i className="fa-brands fa-weibo text-white text-lg"></i>,
      color: "bg-red-600 hover:bg-red-600/80",
      name: "Weibo",
      ButtonComponent: WeiboShareButton,
      props: {
        url: currentUrl,
        title: filmTitle,
        image: filmImage,
      },
    },
    {
      icon: <Copy size={18} className="text-white" />,
      color: "bg-gray-700 hover:bg-gray-600",
      name: "Copy",
      isCopy: true,
    },
  ];


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-600/10 backdrop-blur-md border border-white/25 text-gray-200">
        <DialogHeader>
          <DialogTitle>Chia sẻ</DialogTitle>
          <DialogDescription className="text-gray-500">
            Bất kì ai có đường link đều cho thể truy cập được website.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 pt-2">
          {socialItems.map((item, index) => {
            if (item.isCopy) {
              return (
                <Button
                  key={index}
                  onClick={handleCopy}
                  variant="ghost"
                  className={cn(
                    item.color,
                    "cursor-pointer transition-transform duration-240 ease-in hover:-translate-y-1.5"
                  )}
                >
                  {item.icon}
                </Button>
              );
            } else if (item.ButtonComponent) {
              const ShareBtn = item.ButtonComponent;
              return (
                <ShareBtn key={index} {...item.props}>
                  <button
                    className={cn(
                      item.color,
                      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer hover:-translate-y-1.5 duration-240 ease-in h-9 px-3"
                    )}
                  >
                    {item.icon}
                  </button>
                </ShareBtn>
              );
            } else {
              return null;
            }
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function PlayBar({ activeTab, setActiveTab }: PlayBarProps) {
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { averageRating, totalRatings } = useRatingStore();
  const router = useRouter();
  //luong add
  const { favoriteList, fetchFavoriteList } = userFavoriteStore();
  const { filmData } = useFilmStore();

  useEffect(() => {
    fetchFavoriteList();
  }, []);

  useEffect(() => {
    let likeStatus = false;
    likeStatus =
      favoriteList.findIndex((f) => f.filmId === filmData?.film.filmId) !== -1
        ? true
        : false;

    setLiked(likeStatus);
  }, [favoriteList]);

  const hanhleToggleFavorite = async (filmId: string) => {
    await userServices.toggleFavoriteFilm(filmId);
    fetchFavoriteList();
  };
  //end luong add
  const actions: actionType[] = [
    {
      id: "like",
      label: "Yêu thích",
      icon: Heart,
      onClick: () => {
        if (filmData?.film.filmId) {
          hanhleToggleFavorite(filmData.film.filmId); //luong addd
        }
      },
    },
    {
      id: "add",
      label: "Thêm vào",
      icon: Plus,
    },
    {
      id: "share",
      label: "Chia sẻ",
      icon: Send,
      onClick: () => setShowShare(true),
    },
    {
      id: "comment",
      label: "Bình luận",
      icon: MessageSquare,
      onClick: () => {
        eventBus.emit("switchTab", "comments");
        document
          .getElementById("comment-section")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const { part, episode } = usePlayerStore();
  const p = part || "1";
  const ep = episode || "1";
  const handleFilmClick = () => {
    if (filmData?.film.slug) {
      router.push(filmPath.PLAYER_DETAIL(filmData.film.slug, p, ep));
    }
  }
  return (
    <>
      <div className="flex items-center justify-between w-full mt-4 md:px-6">
        <div className="flex items-center justify-center">
          <button
            onClick={handleFilmClick}
            className="flex items-center gap-2 px-8 py-3 font-semibold rounded-full text-black bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap min-w-fit"
          >
            <span className="inline-block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent"></span>
            Xem Ngay
          </button>

          <div className="flex items-center gap-8 justify-center px-12">
            {actions.map((action) => {
              const Icon = action.icon;
              const isLiked = action.id === "like" && liked;

              if (action.id === "add") {
                return <ModalAdd key={action.id} action={action} />;
              }

              return (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className={cn(
                    "flex flex-col items-center justify-center w-20 h-16 rounded-2xl transition-all duration-180 ease-in-out cursor-pointer",
                    isLiked
                      ? "text-yellow-400 hover:text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  )}
                >
                  <Icon
                    size={18}
                    strokeWidth={isLiked ? 0 : 2}
                    fill={isLiked ? "#facc15" : "none"}
                    className={`${isLiked ? "text-yellow-400" : ""}`}
                  />
                  <span className="text-xs mt-1">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <Button
          variant={"default"}
          className="px-3 py-4 bg-indigo-800 hover:bg-indigo-800/90 rounded-full group"
          onClick={() => {
            eventBus.emit("switchTab", "ratings");
            document
              .getElementById("rating-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p className="flex items-center justify-center gap-1">
            <Star className="text-yellow-500" />
            {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
          </p>
          <p className="relative inline-block text-xs font-normal after:content-[''] after:absolute after:left-0 after:-bottom-0.5  after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-yellow-500  after:transition-transform after:duration-200 group-hover:after:scale-x-100">
            Đánh giá {totalRatings > 0 && `(${totalRatings})`}
          </p>
        </Button>
      </div>

      {showShare && <ModalShare open={showShare} onOpenChange={setShowShare} />}
    </>
  );
}
