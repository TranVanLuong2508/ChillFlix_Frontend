"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCheck, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CopyButton = () => {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);


  const onCopy = () => {
    if (!pathname) return;

    setIsCopied(true);
    const host = process.env.HOST || 'http://localhost:3000';
    navigator.clipboard.writeText(`${host}/${pathname}`);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!pathname || isCopied}
      variant={"ghost"}
      size={"sm"}
      className="hover:bg-amber-400 hover:text-black"
    >
      <Icon size={4} />
      <span className="text-sm">Chia sẻ</span>
    </Button>
  )
}
