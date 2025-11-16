import { useState } from "react";
import { cn } from "@/lib/utils";

import { Heart, Plus, Send, MessageSquare, Star, LucideIcon } from "lucide-react";
import { useRatingStore } from "@/stores/ratingStore";

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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { eventBus } from "@/lib/eventBus";

interface PlayBarProps {
  activeTab: "comments" | "ratings";
  setActiveTab: (tab: "comments" | "ratings") => void;
}

type actionType = {
  id: string,
  label: string,
  icon: LucideIcon,
  onClick?: () => void,
}

const ModalAdd = ({ action }: { action: actionType }) => {
  const Icon = action.icon;

  return (
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
        className="w-52 bg-zinc-600/10 backdrop-blur-md border border-white/25 text-gray-200 rounded-2xl fade-in slide-in-from-bottom-2 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 duration-160 ease-in-out p-3"
      >
        <DropdownMenuLabel className="flex justify-between text-xs uppercase tracking-wide text-gray-400 px-1">
          <span>Danh sách</span>
          <span className="text-gray-500 font-normal">0/5</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 bg-zinc-500 mb-3" />

        <DropdownMenuItem className="flex justify-center p-2 font-medium rounded-md cursor-pointer text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_12px_rgba(250,204,21,0.45)] focus:bg-yellow-400 focus:text-black transition-all duration-200 ease-in-out">
          + Thêm mới
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const ModalShare = (
  {
    open,
    onOpenChange
  }: {
    open: boolean,
    onOpenChange: (open: boolean) => void
  }) => {
  const socialItems = [
    {
      icon: <i className="fa-brands fa-facebook-f text-white text-lg"></i>,
      color: "bg-blue-600 hover:bg-blue-600/80",
      name: "Facebook"
    },
    {
      icon: <i className="fa-brands fa-x-twitter text-white text-lg"></i>,
      color: "bg-black hover:bg-zinc-950",
      name: "Twitter"
    },
    {
      icon: <i className="fa-brands fa-telegram text-white text-lg"></i>,
      color: "bg-sky-500 hover:bg-sky-500/80",
      name: "Telegram"
    },
    {
      icon: <i className="fa-brands fa-reddit-alien text-white text-lg"></i>,
      color: "bg-orange-600 hover:bg-orange-600/80",
      name: "Reddit"
    },
    {
      icon: <i className="fa-solid fa-share-nodes text-white text-lg"></i>,
      color: "bg-neutral-800 hover:bg-neutral-800/80",
      name: "More..."
    },
  ]

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
            return (
              <Button key={index} variant={"ghost"} className={cn(item.color, "cursor-pointer transition-transform duration-240 ease-in hover:-translate-y-1.5")}>
                {item.icon}
              </Button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function PlayBar({ activeTab, setActiveTab }: PlayBarProps) {
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { averageRating, totalRatings } = useRatingStore();

  const actions: actionType[] = [
    {
      id: "like",
      label: "Yêu thích",
      icon: Heart,
      onClick: () => setLiked(!liked),
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
        document.getElementById("comment-section")?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between w-full mt-4 md:px-6">
        <div className="flex items-center justify-center">
          <button
            onClick={() => { }}
            className="flex items-center gap-2 px-8 py-3 font-semibold rounded-full text-black bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all duration-300 ease-in-out cursor-pointer"
          >
            <span className="inline-block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent">
            </span>
            Xem Ngay
          </button>

          <div className="flex items-center gap-8 justify-center px-12">
            {actions.map((action) => {
              const Icon = action.icon;
              const isLiked = action.id === "like" && liked;

              if (action.id === 'add') {
                return <ModalAdd key={action.id} action={action} />
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
            document.getElementById("rating-section")?.scrollIntoView({ behavior: "smooth" });
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
