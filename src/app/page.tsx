import Player from "@/components/Player/Player";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="h-[70px] w-full"></div>
      <div className="px-[150px] 0">
        <Player />
      </div>
    </div>
  );
}
