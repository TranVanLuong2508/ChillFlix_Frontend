"use client";

import dynamic from "next/dynamic";
import { Copy, Eye, Tv } from "lucide-react";
import Artplayer from "artplayer";
import StreamInfo from "./streamInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./copy-button";
import DetailNav from "./detailFilm";
import { useState } from "react";

const ArtPlayerClient = dynamic(
  () => import("./ArtPlayerClient"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[700px] bg-zinc-900 flex items-center justify-center text-white text-3xl">
        <div className="flex">
          <div className="relative">
            <div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-80 animate-pulse"
              aria-hidden="true"
            />
            <div className="relative bg-zinc-900 rounded-full p-6">
              <Tv className="size-12 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

interface PlayerProps {
  handlePlay: () => void;
  handlePause: () => void;
  handleSeek: (time: number) => void;
  handleArtReady: (art: Artplayer) => void;
  handleManualSync: () => void;
}

const Player = ({
  handlePlay,
  handlePause,
  handleSeek,
  handleArtReady,
  handleManualSync
}: PlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-[-8px_-8px_40px_10px_rgba(0,0,0,0.3),8px_8px_40px_10px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden">
      <div className="relative group">
        <StreamInfo
          episodeTitle={"episodeDetail.title"}
          partTitle={"Test"}
          onOpenChange={setIsOpen}
        // episodeTitle={episodeDetail.title}
        // partTitle={partDetail.title}
        // onOpenChange={setIsOpen}
        />
        <DetailNav
          open={isOpen}
          onOpenChange={setIsOpen}
        />
        <div className="relative">
          <ArtPlayerClient
            src="https://stream.mux.com/4dfQi4aSj28rdrPWGBkxdzRylMw2SJXR5wBz3YQLMNQ.m3u8"
            poster="/co-watching/poster.png"
            onPlay={handlePlay}
            onPause={handlePause}
            onSeek={handleSeek}
            onReady={handleArtReady}
            handleManualSync={handleManualSync}
          />
        </div>
        <div className="p-4 bg-zinc-950">
          <div className="flex items-center justify-between ">
            <div className="pl-2 flex items-center gap-4">
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold">Quân đẹp trai</h1>
                <p className="text-sm text-zinc-400">tạo 1 ngày trước</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="hover:bg-transparent hover:text-white"
              >
                <Eye className="size-5" />
                <span className="text-lg">10</span>
              </Button>
              <CopyButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
