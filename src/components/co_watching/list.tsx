import { ListVideo } from "lucide-react"
import { Card } from "./card"

export const List = () => {
  return (
    <div className="pt-40 px-[20px] text-white">
      <div className="flex items-center gap-2">
        <ListVideo className="size-8" />
        <h2 className="text-xl font-semibold">Danh sách xem chung</h2>
      </div>
      <div className="grid grid-cols-4 gap-6 pt-4 pb-20">
        {
          [...Array(9)].map((_, i) => (
            <Card key={i} />
          ))
        }
      </div>
    </div>
  )
}