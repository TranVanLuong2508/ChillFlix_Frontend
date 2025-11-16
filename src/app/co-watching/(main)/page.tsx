import { List } from "@/components/co_watching/list"
import { ListVideo } from "lucide-react"

const Co_WatchingPage = () => {
  const query = {}

  return (
    <div className="pt-40 px-[20px] text-white">
      <div className="flex items-center gap-2">
        <ListVideo className="size-8" />
        <h2 className="text-xl font-semibold">Danh sách xem chung</h2>
      </div>
      <List query={query} />
    </div>
  )
}

export default Co_WatchingPage