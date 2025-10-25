export default function CastInfoFilm() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg">
                    <img
                        src="/images/small.jpg"
                        alt="Poster nhỏ"
                        className="w-full h-full object-cover"
                    />
                </div>

                <a
                    href="/"
                    className="mt-3 text-sm md:text-base text-white hover:text-yellow-400 transition-colors whitespace-nowrap"
                >
                    Park Ji-hu
                </a>
            </div>
        </div>
    );
}
