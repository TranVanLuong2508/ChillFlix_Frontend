import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { X } from "lucide-react";
import { PartDetail } from "@/types/part.type";
import { useFilmStore } from "@/stores/filmStore";
import { useEffect, useState } from "react";
import { EpisodeDetail } from "@/types/episode.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePlayerStore } from "@/stores/playerStore";
import { FilmCard } from "../../create/filmCard";

interface PlayListNavProps {
  open: boolean;
  // currentPart: string;
  // currentEpisode: string;

  onOpenChange: (open: boolean) => void;
}

const DetailNav = ({
  // currentPart,
  // currentEpisode,
  open,
  onOpenChange
}: PlayListNavProps) => {

  return (
    <div
      className={cn("absolute inset-0 z-1000", !open && "pointer-events-none")}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={() => onOpenChange(false)}
      ></div>
      <div
        className={cn(
          "bg-zinc-500/20 backdrop-blur-md text-white flex flex-col gap-4 transition ease-in-out absolute",
          "inset-y-0 right-0 w-3/4 sm:max-w-md px-6 py-8 my-6 mr-6 rounded-2xl overflow-hidden",
          "transform transition-all duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
          open ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="bg-[#212a56] rounded-xl overflow-hidden">
          <FilmCard />
        </div>
      </div>
    </div>
  );
};
export default DetailNav;
