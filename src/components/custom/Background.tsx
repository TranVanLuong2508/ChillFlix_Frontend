import { cn } from "@/lib/utils";

interface PosterProps {
  backdropUrl: string;
}

export default function Background({ backdropUrl }: PosterProps) {
  return (
    <div className={
      cn(
        "relative w-full h-[800px] overflow-hidden",
        "before:content-[''] before:absolute before:inset-0 before:opacity-20 before:z-[1]",
        "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[200px] after:z-[3] after:bg-[linear-gradient(0deg,rgba(25,27,36,1),rgba(25,27,36,0))]"
      )
    }>
      <img
        // src={backdropUrl}
        src={"https://static.nutscdn.com/vimg/1920-0/2a21bf93486dc39ea44f4d3e9597d96b.webp"}
        alt="Poster phim"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.5))] pointer-events-none"></div>
    </div>
  );
}
