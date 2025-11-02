import { ListVideo } from "lucide-react";

import { Button } from "@/components/ui/button";
import { title } from "process";

interface PlayerInfoProps {
  onOpenChange: (open: boolean) => void;
  title: string;
  episodeNumber: number;
}

const PlayerInfo = ({ onOpenChange, title, episodeNumber }: PlayerInfoProps) => {
  return (
    <div className="absolute w-full px-6 py-6 z-100 text-white bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center gap-2 font-semibold">
          <p className="text-lg">{title}</p>
          <p className="text-sm">Tập {episodeNumber}</p>
        </div>
        <Button
          variant={"ghost"}
          className="flex gap-2 justify-center cursor-pointer"
          onClick={() => onOpenChange(true)}
        >
          <ListVideo />
          <p>Danh sách tập</p>
        </Button>
      </div>
    </div>
  );
};
export default PlayerInfo;
