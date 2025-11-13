import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import Link from "next/link"

export const Card = () => {
  return (
    <Link href={'/'} className="pt-4">
      <div className="rounded-xl overflow-hidden">
        <div className=" relative">
          <img
            src="https://static.nutscdn.com/vimg/1920-0/58b656f1ed72290d63c9cd2ebd67fd83.webp"
            alt="thumbURL"
            className="object-cover object-center"
          />
          <div className="absolute top-0 right-0 p-4">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="bg-red-600/85 hover:bg-red-600/80 hover:text-white"
            >
              LIVE
            </Button>
          </div>
          <div className="absolute bottom-0 right-0 p-4">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="border border-zinc-400 hover:text-white hover:bg-transparent text-zinc-400"
            >
              <p className="font-semibold">100</p>
              <EyeIcon className="size-4" />
            </Button>
          </div>
        </div>

      </div>
      <div className="pt-2 flex items-center gap-4">
        <div className="size-14 rounded-full overflow-hidden">
          <img
            src="https://static.nutscdn.com/vimg/300-0/d551d3a7f93e4d6214a78456bc80cce9.jpg"
            alt="avatar"
            className="w-full h-auto object-cover object-center"
          />
        </div>
        <div>
          <h3 className="text-xl">Xem phim cùng mình nhé</h3>
          <h3 className="text-lg font-semibold text-white/50 italic">Huyền Thoại La Tiểu Hắc 2</h3>
          <p className="text-white/50">Quan dep trai • 2 giờ trước</p>
        </div>
      </div>
    </Link>
  )
}