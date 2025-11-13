import { Action } from "@/components/co_watching/action"
import { Background } from "@/components/co_watching/background"
import { List } from "@/components/co_watching/list"

const Co_WatchingPage = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-400px)]">
      <Background />
      <div className="relative z-10 pt-[250px]">
        <Action />
        <List />
      </div>
    </div>
  )
}

export default Co_WatchingPage