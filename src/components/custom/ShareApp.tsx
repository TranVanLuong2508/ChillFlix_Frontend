"use client";
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    RedditShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    RedditIcon,
} from "react-share";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface SharePopoverProps {
    filmTitle: string;
    filmUrl?: string;
}

export default function SharePopover({ filmTitle, filmUrl }: SharePopoverProps) {
    const currentUrl =
        filmUrl || (typeof window !== "undefined" ? window.location.href : "");

    const handleCopy = async () => {
        await navigator.clipboard.writeText(currentUrl);
        toast.success("Đã sao chép liên kết", {
            description: "Bạn có thể gửi link này cho bạn bè!",
            duration: 2500,
            position: "bottom-right",
            style: {
                background: "#27272a",
                fontWeight: 500,
                borderRadius: "10px",
            },
            className:
                "bg-zinc-900/90 text-yellow-400 border border-yellow-500/30 rounded-xl px-5 py-4 shadow-[0_0_25px_rgba(250,204,21,0.25)]",
        });
    };

    return (
        <div className="flex justify-center gap-4">

            <FacebookShareButton url={currentUrl} hashtag="#ChillFlix">
                <FacebookIcon size={30} round />
            </FacebookShareButton>

            <TwitterShareButton url={currentUrl} title={filmTitle}>
                <TwitterIcon size={30} round />
            </TwitterShareButton>

            <TelegramShareButton url={currentUrl} title={filmTitle}>
                <TelegramIcon size={30} round />
            </TelegramShareButton>

            <RedditShareButton url={currentUrl} title={filmTitle}>
                <RedditIcon size={30} round />
            </RedditShareButton>

            <button
                onClick={handleCopy}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center 
                   hover:scale-110 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-transform"
            >
                <Copy size={16} className="text-black" />
            </button>
        </div>
    );
}
