import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"

import { FormCreateRoom } from "@/components/co_watching/formCreateRoom"
import { FilmCard } from "./filmCard"

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
          <FilmCard />
        </div>
        <div className="col-span-7 rounded-3xl">
          <FormCreateRoom />
        </div>
      </div>
    </div>
  )
}
export default CreateCo_WatchingPage