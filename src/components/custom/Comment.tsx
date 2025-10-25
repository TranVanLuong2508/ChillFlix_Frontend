"use client";

import { useState } from "react";
import { MessageSquare, Reply, Send } from "lucide-react";
import AvatarUser from "./AvartarUser";

export default function Comment() {
    const [comment, setComment] = useState("");
    const [reveal, setReveal] = useState(false);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");
    const [comments, setComments] = useState<
        {
            id: number;
            name: string;
            text: string;
            replies: { id: number; name: string; text: string }[];
        }[]
    >([]);

    const handleSend = () => {
        if (comment.trim() === "") return;
        const newComment = {
            id: Date.now(),
            name: "An Nguyễn",
            text: comment,
            replies: [],
        };
        setComments([newComment, ...comments]);
        setComment("");
    };

    const handleReplySend = (parentId: number) => {
        if (replyText.trim() === "") return;

        const newReply = {
            id: Date.now(),
            name: "An Nguyễn",
            text: replyText,
        };

        const updatedComments = comments.map((cmt) =>
            cmt.id === parentId
                ? { ...cmt, replies: [newReply, ...cmt.replies] }
                : cmt
        );

        setComments(updatedComments);
        setReplyText("");
        setReplyingTo(null);
    };

    return (
        <div id="comment-section" className="mt-10">

            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    Bình luận
                </h2>
            </div>


            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <AvatarUser />
                    <div>
                        <p className="text-sm text-gray-400">Bình luận với tên</p>
                        <p className="text-white font-semibold">An Nguyễn</p>
                    </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={2000}
                        rows={5}
                        placeholder="Viết bình luận..."
                        className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm"
                    />
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-gray-500 text-xs">
                            {comment.length} / 2000
                        </span>
                        <button
                            onClick={handleSend}
                            className="flex items-center gap-2 font-semibold text-yellow-400 hover:text-yellow-300 transition"
                        >
                            Gửi <Send size={18} className="text-yellow-400" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={reveal}
                            onChange={() => setReveal(!reveal)}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-yellow-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                    <span className="text-sm text-gray-300">Tiết lộ?</span>
                </div>
            </div>


            <div className="mt-6">
                {comments.length === 0 ? (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 py-12 flex flex-col items-center justify-center text-gray-400">
                        <MessageSquare size={40} className="mb-3 opacity-70" />
                        <p className="text-sm">Chưa có bình luận nào</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {comments.map((cmt) => (
                            <div
                                key={cmt.id}
                                className="flex flex-col gap-3 border-b border-zinc-800 pb-4"
                            >

                                <div className="flex items-start gap-3">
                                    <AvatarUser />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-white">
                                                {cmt.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                8 giờ trước
                                            </p>
                                        </div>
                                        <p className="text-gray-300 text-sm mt-1 break-words whitespace-pre-wrap leading-relaxed">
                                            {cmt.text}
                                        </p>

                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                            <button
                                                onClick={() =>
                                                    setReplyingTo(
                                                        replyingTo === cmt.id
                                                            ? null
                                                            : cmt.id
                                                    )
                                                }
                                                className="flex items-center gap-1 hover:text-white transition"
                                            >
                                                <Reply size={14} />
                                                Trả lời
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                {replyingTo === cmt.id && (
                                    <div className="ml-12 mt-2 w-[60%] bg-zinc-950 border border-zinc-800 rounded-xl p-3 shadow-inner">
                                        <textarea
                                            value={replyText}
                                            onChange={(e) =>
                                                setReplyText(e.target.value)
                                            }
                                            maxLength={2000}
                                            rows={2}
                                            placeholder="Viết phản hồi..."
                                            className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm rounded-md px-2 py-1"
                                        />
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-gray-500 text-xs">
                                                {replyText.length} / 2000
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleReplySend(cmt.id)
                                                }
                                                className="flex items-center gap-1 font-semibold text-yellow-400 hover:text-yellow-300 transition text-sm"
                                            >
                                                Gửi{" "}
                                                <Send
                                                    size={14}
                                                    className="text-yellow-400"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {cmt.replies.length > 0 && (
                                    <div className="ml-12 mt-3 space-y-3">
                                        {cmt.replies.map((rep) => (
                                            <div
                                                key={rep.id}
                                                className="flex items-start gap-3"
                                            >
                                                <AvatarUser />
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-white">
                                                        {rep.name}
                                                    </p>
                                                    <p className="text-gray-300 text-sm mt-1 break-words whitespace-pre-wrap leading-relaxed">
                                                        {rep.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
