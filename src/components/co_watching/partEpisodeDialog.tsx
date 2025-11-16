"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface partEpisodeDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PartEpisodeDialog = ({
  open,
  setOpen,
}: partEpisodeDialogProps) => {
  const [selectedPart, setSelectedPart] = useState('1');


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl bg-[#282b3a] border-0 text-white">
        <DialogHeader>
          <DialogTitle>Chọn thông tin phim</DialogTitle>
          <DialogDescription>
            Xin vui lòng chọn <strong className="text-amber-400">phần</strong> và <strong className="text-amber-400">tập</strong> để bắt đầu tạo phòng xem chung!
          </DialogDescription>
        </DialogHeader>
        <div>
          <Select value={selectedPart} onValueChange={setSelectedPart}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn phần" />
            </SelectTrigger>
            <SelectContent className="z-10000 bg-[#282b3a]/50 backdrop-blur-sm  border-0 text-white ring-1 ring-zinc-400">
              <SelectGroup>
                {[...Array(2)].map((p, index) => (
                  <SelectItem
                    key={index}
                    // value={(p.partNumber).toString()}
                    value={(index + 1).toString()}
                  >
                    {/* {p.title} */}
                    {index + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>


          <div className="flex items-center flex-wrap gap-4 mt-4 pt-4 border-t border-zinc-100">
            {[...Array(12)].map((episode, i) => {
              // const isSelected = episode.episodeNumber === +currentEpisode && isActive;
              // console.log(">>>>> Check: ", isSelected, episode.episodeNumber === +currentEpisode, isActive)
              return (
                <div
                  key={i}
                  // onClick={() => handlePlayEpisode(episode.episodeNumber)}
                  className={cn(
                    "w-18 h-8 flex items-center justify-center rounded-md bg-zinc-500 text-white font-normal text-xs cursor-pointer",
                    "hover:bg-amber-400 hover:text-black transition-all duration-200 ease"
                  )}
                >
                  {/* {episode.title !== "" ? episode.title : `Tập ${episode.episodeNumber}`} */}
                  Tập {i + 1}
                </div>
              )
            })}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size={"sm"}
              className="text-black hover:shadow-[0px_0px_10px_0px_#d4d4d8] transition-all ease duration-200"
            >
              Hủy
            </Button>
          </DialogClose>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="bg-amber-400 text-black hover:bg-amber-400 hover:shadow-[0px_0px_10px_0px_#ffd230] transition-all ease duration-200"
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}