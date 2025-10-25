import CastInfoFilm from "./CastInfoFilm";


export default function FilmInfo() {
    return (
        <div className="flex flex-col gap-4 -mt-55 px-6">

            <img
                src="/images/small.jpg"
                alt="Poster nhỏ"
                className="w-40 md:w-45 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />

            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white">Trăm Dặm Tử Thần</h1>
                <h2 className="text-sm text-gray-400 italic">The Long Walk</h2>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="bg-[#facc15] text-black px-2 py-0.5 rounded font-semibold">
                        IMDb 7.1
                    </span>
                    <span className="bg-[#27272a] text-gray-200 px-2 py-0.5 rounded border-1">2025</span>
                    <span className="bg-[#27272a] text-gray-200 px-2 py-0.5 rounded border-1">1h 48m</span>
                </div>

                <div className="flex items-center  gap-2 text-sm text-gray-300 mt-2">
                    <a href="/" className="bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 px-2 py-0.5 rounded transition-colors">
                        Hành động
                    </a>
                    <a href="/" className="bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 px-2 py-0.5 rounded transition-colors">
                        Phiêu lưu
                    </a>
                    <a href="/" className="bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 px-2 py-0.5 rounded transition-colors">
                        Viễn tưởng
                    </a>
                </div>
                <div className="mt-4">
                    <h3 className="text-base font-semibold text-white mb-1">Giới thiệu:</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Trăm Dặm Tử Thần là một bộ phim kinh dị tâm lý, xoay quanh hành trình
                        của một nhóm người phải đối mặt với những nỗi sợ hãi sâu thẳm nhất của
                        chính mình.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    <div>
                        <h3 className="text-sm font-semibold text-white">Thời lượng:</h3>
                        <p className="text-sm text-gray-400">1 giờ 48 phút</p>
                    </div>
                    <div className="sm: col-span-2 ">
                        <h3 className="text-sm font-semibold text-white">Quốc gia:</h3>
                        <p className="text-sm text-gray-400">Mỹ</p>
                    </div>
                    <div className="sm:col-span-2">
                        <h3 className="text-sm font-semibold text-white">Đạo diễn:</h3>
                        <p className="text-sm text-gray-400">Stephen King</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Diễn viên</h2>
                </div>
                <div>
                    <CastInfoFilm />
                </div>
            </div>
        </div>
    );
}
