"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface partEpisodeDialogProps {
  open: boolean;
  part: string;
  episode: string;
  setOpen: (open: boolean) => void;
  setPart: (part: string) => void;
  setEpisode: (part: string) => void;
}

export const PartEpisodeDialog = ({
  open,
  part,
  episode,
  setOpen,
  setPart,
  setEpisode,
}: partEpisodeDialogProps) => {
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
          <Select value={part} onValueChange={setPart}>
            <SelectTrigger className="w-[120px] border-amber-300">
              <SelectValue placeholder="Chọn phần" />
            </SelectTrigger>
            <SelectContent className="z-10000 bg-[#282b3a]/50 backdrop-blur-sm  border-0 text-white ring-1 ring-amber-400/50">
              <SelectGroup>
                {[...Array(2)].map((p, index) => (
                  <SelectItem
                    key={index}
                    // value={(p.partNumber).toString()}
                    value={(index + 1).toString()}
                    className="focus:bg-amber-400"
                  >
                    {/* {p.title} */}
                    {index + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>


          <div className="flex items-center flex-wrap gap-4 mt-4 pt-4 border-t border-zinc-100">
            {[...Array(12)].map((_, i) => {
              // const isSelected = episode.episodeNumber === +currentEpisode && isActive;
              // console.log(">>>>> Check: ", isSelected, episode.episodeNumber === +currentEpisode, isActive)
              return (
                <div
                  key={i}
                  onClick={() => setEpisode((i + 1).toString())}
                  className={cn(
                    "w-18 h-8 flex items-center justify-center rounded-md bg-zinc-500 text-white font-normal text-xs cursor-pointer",
                    "hover:bg-amber-400 hover:text-black transition-all duration-200 ease",
                    (i + 1).toString() === episode && "bg-amber-400 text-black"
                  )
                  }
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
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}