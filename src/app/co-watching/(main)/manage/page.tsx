"use client";

import NotFound from "@/app/not-found";
import { List } from "@/components/co_watching/list"
import { useAuthStore } from "@/stores/authStore";
import { ListVideo } from "lucide-react"

const ManagePage = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return (
      <NotFound />
    );
  }

  const query = {
    hostId: authUser.userId ?? undefined,
  }

  return (
    <div className="pt-40 px-[20px] text-white">
      <div className="flex items-center gap-2">
        <ListVideo className="size-8" />
        <h2 className="text-xl font-semibold">Quản lý</h2>
      </div>
      <List query={query} />
    </div>
  )
}
export default ManagePage