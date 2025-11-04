import { FilmData } from "@/types/backend.type";

type PosterProps = {
  film: FilmData;
};

export default function Poster({ film }: PosterProps) {
  const poster = film.filmImages?.find((img) => img.type === "poster");

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <img
        src={poster?.url || "/images/poster.jpg"}
        alt="Poster phim"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent" />
    </div>
  );
}
