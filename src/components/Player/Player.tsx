"use client";

import dynamic from "next/dynamic";

import { Flag, Heart, Plus, ListVideo, Tv } from "lucide-react";

const PlayerController = dynamic(
  () => import("@/components/Player/PlayerController"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[900px] bg-zinc-900 flex items-center justify-center text-white text-3xl">
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

// shadow-[0_0_30px_rgba(0,0,0,0.6)] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
//  shadow-[-8px_-8px_40px_10px_rgba(255,255,255,0.1),_8px_8px_40px_10px_rgba(255,255,255,0.1)]
// shadow-[-8px_-8px_40px_10px_rgba(0,0,0,0.3),_8px_8px_40px_10px_rgba(0,0,0,0.3)]

const optionList = [
  { icon: Heart, name: "Yêu thích" },
  { icon: Plus, name: "Thêm vào" },
];

const Player = () => {
  return (
    <div className="shadow-[-8px_-8px_40px_10px_rgba(0,0,0,0.3),_8px_8px_40px_10px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden">
      <div className="relative group">
        <div className="absolute w-full px-6 py-6 z-[999999] text-white bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center gap-2 font-semibold">
              <p className="text-lg">Thủy Long Ngâm</p>
              <p className="text-sm">Phần 1 - Tập 1</p>
            </div>
            <div className="flex gap-2 justify-center">
              <ListVideo />
              <p>Danh sách tập</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <PlayerController />
        </div>
      </div>
      <div className="px-8 py-6 bg-zinc-950 text-white flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          {optionList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex gap-2 items-center font-semibold"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 items-center font-semibold">
          <Flag size={20} />
          <span>Báo lỗi</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
