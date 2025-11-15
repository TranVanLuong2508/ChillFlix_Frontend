import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"

import { FormCreateRoom } from "@/components/co_watching/formCreateRoom"

const CreateCo_WatchingPage = () => {
  return (
    <div className="py-20 px-[350px]">
      <div className="flex items-center gap-2 text-white">
        <ChevronLeft className="size-8 border border-zinc-100 rounded-full p-1" />
        <h1 className="text-2xl font-semibold">Tạo phòng xem chung</h1>
      </div>
      <div className="pt-8 grid grid-cols-12 gap-8">
        <div className={cn(
          "col-span-5 rounded-3xl bg-[#212a56] overflow-hidden transition-all duration-240 ease",
          "hover:shadow-[0px_0px_22px_0px_rgba(234,_179,_8,_1)] ring-1 ring-offset-transparent hover:ring-amber-400"
        )}>
          <div>
            <div className="relative overflow-hidden">
              <img
                src="https://static.nutscdn.com/vimg/500-0/55dbba41fe478c4351d82766bf3ba7f9.jpg"
                alt="poster"
                className="w-full h-auto object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#212a56] via-[#212a56]/75 to-transparent pointer-events-none"></div>
            </div>
            <div className="relative -mt-50">
              <div className="space-y-4 px-10 pb-10">
                <h1 className="text-2xl font-semibold text-white">Huyền Thoại La Tiểu Hắc 2</h1>
                <p className="font-semibold text-yellow-400 py-1/2">The Legend of Hei 2</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="py-2 px-3 text-xs font-semibold bg-white text-zinc-900 rounded-lg border border-transparent">T13</div>
                  <div className="py-2 px-3 text-xs bg-transparent text-zinc-200 rounded-lg border border-zinc-200">2025</div>
                  <div className="py-2 px-3 text-xs bg-transparent text-zinc-200 rounded-lg border border-zinc-200">1h58</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-white bg-white/10 p-1 rounded-md">Chiếu rạp</div>
                  <div className="text-white bg-white/10 p-1 rounded-md">Cổ trang</div>
                  <div className="text-white bg-white/10 p-1 rounded-md">Hoạt hình</div>
                  <div className="text-white bg-white/10 p-1 rounded-md">Kỳ ảo</div>
                  <div className="text-white bg-white/10 p-1 rounded-md">Viễn tưởng</div>
                  <div className="text-white bg-white/10 p-1 rounded-md">Phiêu lưu</div>
                </div>
                <p
                  className="text-zinc-200/90 overflow-hidden text-ellipsis"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                >
                  Tiểu Hắc cùng sư phụ sống những ngày yên bình tại một thị trấn nhỏ. Thế nhưng khi phân hội bị tấn công, sự kiện ấy đã phá vỡ nền hòa bình giữa các yêu giới được gìn giữ suốt bao năm.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-7 rounded-3xl">
          <FormCreateRoom />
        </div>
      </div>
    </div>
  )
}
export default CreateCo_WatchingPage