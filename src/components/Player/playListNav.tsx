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

interface PlayListNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Header = ({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">Thủy Long Ngâm</p>
        <button
          className="rounded-full bg-zinc-800 ring-1 p-1 cursor-pointer hover:bg-zinc-700"
          onClick={() => onOpenChange(false)}
        >
          <X size={12} />
        </button>
      </div>
      <Select defaultValue="p-1">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Chọn phần" />
        </SelectTrigger>
        <SelectContent className="z-10000">
          <SelectGroup>
            <SelectItem value="p-1">Phần 1</SelectItem>
            <SelectItem value="p-2">Phần 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const Content = () => {
  return (
    <>
      <Separator />
      <ScrollArea className="h-full w-full rounded-md overflow-y-auto no-scrollbar">
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-center px-3 py-2 rounded-md bg-zinc-800 text-white font-normal text-xs cursor-pointer ",
                  i === 1 && "border-3 border-amber-500 text-amber-500",
                  "hover:shadow-[0_3px_3px_rgba(253,153,0,1)] transition-all duration-200 ease"
                )}
              >
                Tập {i + 1}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

const PlayListNav = ({ open, onOpenChange }: PlayListNavProps) => {
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
          "bg-zinc-900/70 backdrop-blur-md text-white flex flex-col gap-4 transition ease-in-out absolute",
          "inset-y-0 right-0 w-3/4 sm:max-w-sm px-6 py-8 my-6 mr-6 rounded-2xl overflow-hidden",
          "transform transition-all duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
          open ? "opacity-100" : "opacity-0"
        )}
      >
        <Header onOpenChange={onOpenChange} />
        <Content />
      </div>
    </div>
  );
};
export default PlayListNav;
