import { FilmData } from "@/types/filmData";

type PosterProps = {
  film: FilmData;
};

export default function Poster({ film }: PosterProps) {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <img
        src={film?.posterUrl || "/images/poster.jpg"}
        alt="Poster phim"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent" />
    </div>
  );
}
