import { Film, ListVideo } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFilmStore } from "@/stores/filmStore";
import { cn } from "@/lib/utils";

interface PlayerInfoProps {
  episodeTitle: string;
  partTitle: string;

  onOpenChange: (open: boolean) => void;
}

const StreamInfo = ({
  episodeTitle,
  partTitle,
  onOpenChange,
}: PlayerInfoProps) => {
  const { filmData } = useFilmStore();
  const title = `${partTitle} - ${episodeTitle}`

  return (
    <div className="absolute w-full px-6 py-6 z-100 text-white bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center gap-2 font-semibold">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 text-center p-0.5 px-1.5 rounded-md uppercase text[10px] border border-background font-semibold tracking-wide"
            >
              • live
            </div>
            <p className="text-lg">{"Xem phim Huyền thoại la tiểu hắc 2 nhé"}</p>
          </div>
          <p>
            {"Huyền thoại la tiểu hắc"}
          </p>
        </div>
        <Button
          variant={"ghost"}
          className="flex gap-2 justify-center cursor-pointer hover:bg-amber-400"
          onClick={() => onOpenChange(true)}
        >
          <Film />
          <p>Thông tin film</p>
        </Button>
      </div>
    </div>
  );
};
export default StreamInfo;
