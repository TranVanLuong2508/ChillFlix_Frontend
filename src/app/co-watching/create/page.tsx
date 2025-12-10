"use client";

import { ChevronLeft } from "lucide-react"

import Link from "next/link"
import { Form } from "./_components/form";
import { useCoWatchingStore } from "@/stores/co-watchingStore";

const CreateCo_WatchingPage = () => {
  const { dataRoom } = useCoWatchingStore();
  console.log("Check has: ", dataRoom);
  return (
    <div className="py-10 pt-[100px] max-w-[1000px] mx-auto">
      <Link href={'/co-watching'} className="flex items-center gap-2 text-white cursor-pointer">
        <ChevronLeft className="size-8 border border-zinc-100 rounded-full p-1" />
        <h1 className="text-2xl font-semibold">Tạo phòng xem chung</h1>
      </Link>
      <Form />
    </div>
  )
}
export default CreateCo_WatchingPage