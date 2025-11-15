"use client";

import { useRouter } from "next/navigation";
import { CircleChevronLeft } from "lucide-react";

export function ExitButton() {
  const router = useRouter();

  const handleExit = () => {
    router.push("/co-watching");
  };

  return (
    <button
      className="py-6 pl-10 flex items-center gap-2 cursor-pointer"
      onClick={handleExit}
    >
      <CircleChevronLeft />
      <h1 className="text-lg font-semibold">Thoát phòng live</h1>
    </button>
  );
}
