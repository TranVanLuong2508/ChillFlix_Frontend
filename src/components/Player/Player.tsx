"use client";

import dynamic from "next/dynamic";

// import PlayerNew from "./PlayerNew";

const PlayerNew = dynamic(() => import("@/components/Player/PlayerNew"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[900px] bg-zinc-900 flex items-center justify-center text-white">
      Loading Player ...
    </div>
  ),
});

const Player = () => {
  return (
    <div>
      <PlayerNew />
    </div>
  );
};

export default Player;
