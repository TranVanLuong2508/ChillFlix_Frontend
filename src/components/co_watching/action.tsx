"use client";

import { Button } from "@/components/ui/button"
import { CirclePlus, Radio } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

export const Action = () => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="flex mx-auto items-center justify-center gap-x-8">
        <Link
          href={`${pathname}/manage`}
        >
          <Button
            variant={"outline"}
            className="rounded-full h-15 w-40 px-7 hover:opacity-90 cursor-pointer"
          >
            <Radio className="size-5" />
            <p className="text-lg">Quản lý</p>
          </Button>
        </Link>
        <Link
          href={`${pathname}/create`}
        >
          <Button
            variant={"ghost"}
            className="rounded-full h-15 w-40 px-7 border border-white text-white hover:opacity-90 cursor-pointer hover:bg-transparent hover:text-white"
          >
            <CirclePlus className="size-5" />
            <p className="text-lg">Tạo mới</p>
          </Button>
        </Link>
      </div>
    </div>
  )
}