"use client";

import { Button } from "@/components/ui/button"
import { CirclePlus, DoorOpen, Radio } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

export const Action = () => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="flex mx-auto items-center justify-center gap-x-8">
        {
          pathname.endsWith("/manage") ? (
            <Link
              href={`/co-watching`}
            >
              <Button
                variant={"outline"}
                className="rounded-full h-15 w-40 px-7 cursor-pointer hover:bg-amber-400 hover:border-amber-400 transition-all ease duration-150"
              >
                <DoorOpen className="size-5" />
                <p className="text-lg">Xem chung</p>
              </Button>
            </Link>
          ) : (
            <Link
              href={`${pathname}/manage`}
            >
              <Button
                variant={"outline"}
                className="rounded-full h-15 w-40 px-7 cursor-pointer hover:bg-amber-400 hover:border-amber-400 transition-all ease duration-150"
              >
                <Radio className="size-5" />
                <p className="text-lg">Quản lý</p>
              </Button>
            </Link>
          )
        }

        <Link
          href={`${pathname}/create`}
        >
          <Button
            variant={"ghost"}
            className="rounded-full h-15 w-40 px-7 border border-white text-white cursor-pointer hover:bg-transparent hover:text-amber-400 hover:border-amber-400 transition-all ease duration-150"
          >
            <CirclePlus className="size-5" />
            <p className="text-lg">Tạo mới</p>
          </Button>
        </Link>
      </div>
    </div>
  )
}