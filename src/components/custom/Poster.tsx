export default function Poster() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <img
        src="/images/poster.jpg"
        alt="Movie Poster"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent"></div>

      <div className="absolute bottom-10 left-8 md:left-16 text-white z-10">

      </div>
    </div>
  );
}
