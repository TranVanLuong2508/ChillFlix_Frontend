"use client";

import { useState } from "react";
import roomServices from "@/services/co-watching/roomService";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { co_watchingPath } from "@/constants/path";

export const FormCreateRoom = () => {
  const router = useRouter();

  const { authUser } = useAuthStore();
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authUser.userId) {
      toast.error("Vui lòng đăng nhập lại để tạo phòng!");
      return;
    }

    const data = {
      name: roomName,
      isPrivate: isPrivate,
      hostId: authUser.userId,
      videoId: "1c452c46-2c66-4683-a30c-c71414552257",
      thumbUrl: "/co-watching/thumbUrl.png"
    }

    const res = await roomServices.createRoom(data);
    if (res.EC !== 0 || !res.data) {
      toast.error(res.EM);
      return;
    }
    toast.success("Vui lòng đợi vài giây để chuyển sang phòng LIVE")

    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push(co_watchingPath.PLAY(res.data.roomId))
  }

  return (
    <form onSubmit={createRoom}>
      <div className="space-y-4">
        <div className="p-8 pt-6 text-white bg-[#282b3a] rounded-3xl">
          <Label
            htmlFor="room-name"
            className="text-xl font-semibold pb-4"
          >
            Tên phòng
          </Label>
          <Input
            type="text"
            id="room-name"
            placeholder="Nhập tên phòng"
            className="!text-lg text-white caret-amber-400 active:text-white py-6 px-4 border-zinc-500 active:border-zinc-500 active:ring-0 focus-visible:ring-0 selection:bg-amber-400 selection:text-black"
            onChange={(evt) => setRoomName(evt.target.value)}
          />
        </div>
        <div className="p-8 pt-6 text-white bg-[#282b3a] rounded-3xl">
          <div className="flex items-center justify-between ">
            <h3 className="text-xl font-semibold pb-2">Bạn chỉ muốn xem với bạn bè?</h3>
            <Switch
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>
          <p className="text-zinc-200/80">Nếu bật, chỉ có thành viên có link mới được xem phòng này</p>
        </div>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-7">
            <button
              className="w-full bg-amber-300 py-4 rounded-2xl cursor-pointer text-lg font-semibold hover:shadow-[0px_0px_10px_0px_#ffd230] transition-all ease duration-200"
              type="submit"
            >
              Tạo phòng
            </button>
          </div>
          <div className="col-span-3">
            <button
              className="w-full bg-zinc-300 py-4 rounded-2xl cursor-pointer text-lg font-semibold hover:shadow-[0px_0px_10px_0px_#d4d4d8] transition-all ease duration-200"
              type="button"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}