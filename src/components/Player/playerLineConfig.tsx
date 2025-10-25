import { Flag, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const optionList = [
  { icon: Heart, name: "Yêu thích" },
  { icon: Plus, name: "Thêm vào" },
];

const PlayerLineConfig = () => {
  return (
    <div className="px-8 py-6 bg-zinc-950 text-white flex items-center justify-between text-sm">
      <div className="flex items-center gap-6">
        {optionList.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant={"ghost"}
              className={cn(
                "flex gap-2 items-center font-semibold cursor-pointer hover:bg-zinc-900/80 hover:text-white",
                "hover:shadow-2xs shadow-zinc-400"
              )}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Button>
          );
        })}
      </div>
      <Button
        variant={"ghost"}
        className={cn(
          "flex gap-2 items-center font-semibold cursor-pointer hover:bg-zinc-900/80 hover:text-white",
          "hover:shadow-2xs shadow-zinc-400"
        )}
      >
        <Flag size={20} />
        <span>Báo lỗi</span>
      </Button>
    </div>
  );
};
export default PlayerLineConfig;
