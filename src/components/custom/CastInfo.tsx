export default function CastInfo() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative flex flex-col items-center text-center">
                <div className="relative">
                    <img
                        src="/images/small.jpg"
                        alt="Poster nhỏ"
                        className="w-36 md:w-48 md:h-48 object-cover rounded-xl shadow-lg "
                    />
                    <div className="absolute bottom-0 left-0 right-0  bg-opacity-60 py-1 rounded-b-xl">
                        <a href="/" className="text- md:text-base text-white hover:text-chillflix-yellow transition-colors">
                            Park Ji-hu
                        </a>
                    </div>
                </div>
                <span className="mt-2 text-xs text-pink-300 italic">Nam On-jo</span>
            </div>
        </div>
    );
}