import Link from "next/link"

const SuggestList = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold pb-4">Phim đề xuất</h1>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((item, index) => (
          <Link
            key={index}
            href="/xem-video/shin-cau-be-but-chi-63edef863005e93c8c761fdf"
            className="flex items-stretch gap-4 cursor-pointer ease-out duration-300 hover:bg-eerie-black rounded-[12px]"
          >
            <div className="relative w-[128px] min-w-[128px] xl:w-[200px] xl:min-w-[200px] rounded-[8px] xl:rounded-[12px] overflow-hidden">
              <div className="w-full pb-[56.25%] relative">
                <img
                  className="min-w-full min-h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[8px] xl:rounded-[12px]"
                  alt="Shin - Cậu Bé Bút Chì"
                  title=""
                  width=""
                  height=""
                  original-src="https://images.fptplay53.net/media/OTT/VOD/2023/04/11/shin---cau-be-but-chi-phan-1-fpt-play-1681180166663_Landscape.jpg?w=150&amp;c=0&amp;fmt=webp"
                  src="https://images.fptplay53.net/media/OTT/VOD/2023/04/11/shin---cau-be-but-chi-phan-1-fpt-play-1681180166663_Landscape.jpg?w=150&amp;c=0&amp;fmt=webp"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 pr-4 flex flex-col justify-center">
              <h3 className="text-white-smoke font-medium text-[16px] leading-[150%] tracking-[0.32px] mb-2 line-clamp-2">
                Shin - Cậu Bé Bút Chì
              </h3>
              <p className="text-spanish-gray text-[16px] leading-[150%] tracking-[0.32px]">
                2019 • T16 • 300/300 tập • Nhật Bản
              </p>
            </div>
          </Link>
        ))}
      </div>

    </>
  )
}

export default SuggestList