interface PosterProps {
  posterUrl: string;
}

export default function Poster({ posterUrl }: PosterProps) {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <img
        src={posterUrl}
        alt="Poster phim"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent" />
    </div>
  );
}
