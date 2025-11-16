import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import Link from "next/link"

interface CardProps {
  thumbUrl: string;
  name: string;
  duration: number;
  filmTitle: string;
  view?: number;
  hostName: string;
}

export const Card = ({
  thumbUrl,
  name,
  duration,
  filmTitle,
  view = 0,
  hostName,
}: CardProps) => {
  return (
    <Link href={'/'} className="pt-4 group">
      <div className="rounded-xl overflow-hidden group-hover:ring-1 group-hover:ring-amber-300 transition-all ease-in duration-120">
        <div className=" relative bg-zinc-700 ">
          <div className="flex items-center justify-center">
            <img
              src={thumbUrl}
              alt="thumbURL"
              className="object-cover object-center max-h-[250px] w-auto"
            />
          </div>
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
              <p className="font-semibold">{view}</p>
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
          <h3 className="text-xl">{name}</h3>
          <h3 className="text-lg font-semibold text-white/50 italic">{filmTitle}</h3>
          <p className="text-white/50">{hostName} • 2 giờ trước</p>
        </div>
      </div>
    </Link>
  )
}