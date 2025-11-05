"use client";

import { useState } from "react";
import { ChevronRight, MessageSquare, Reply, Send, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";

export default function Comment() {
    const [comment, setComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<{ parentId: number; replyId?: number; replyToName?: string } | null>(null);
    const [replyText, setReplyText] = useState("");
    const [comments, setComments] = useState<
        {
            id: number;
            name: string;
            text: string;
            replies: { id: number; name: string; text: string; replyToName?: string }[];
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

    const handleReplySend = (parentId: number, replyId?: number, replyToName?: string) => {
        if (replyText.trim() === "") return;
        const newReply = {
            id: Date.now(),
            name: "Bảo Trân",
            text: replyText,
            replyToName,
        };

        const updatedComments = comments.map((cmt) =>
            cmt.id === parentId ? { ...cmt, replies: [...cmt.replies, newReply] } : cmt
        );

        setComments(updatedComments);
        setReplyText("");
        setReplyingTo(null);
    };

    const handleDeleteComment = (commentId: number) => {
        setComments(comments.filter((cmt) => cmt.id !== commentId));
    };

    return (
        <div id="comment-section" className="mt-2">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    Bình luận
                </h3>
            </div>

            <div className="bg-[#191B24] p-6 rounded-xl border border-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12">
                        <img
                            src="/images/monkey.jpg"
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Bình luận với tên</p>
                        <p className="text-white font-semibold">An Nguyễn</p>
                    </div>
                </div>

                <div className="bg-zinc-800/70 border border-zinc-800 rounded-lg p-4">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={2000}
                        rows={5}
                        placeholder="Viết bình luận..."
                        className="w-full bg-zinc-800/70 text-gray-200 placeholder-gray-500 resize-none outline-none text-sm p-3 rounded-xl text-left align-top"
                    />

                    <div className="flex justify-between items-center mt-3">
                        <span className="text-gray-500 text-xs">{comment.length} / 2000</span>
                        <button
                            onClick={handleSend}
                            className="flex items-center gap-2 font-semibold text-yellow-400 hover:text-yellow-300 transition"
                        >
                            Gửi <Send size={18} className="text-yellow-400" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {comments.length === 0 ? (
                    <div className="bg-zinc-800/70 rounded-2xl border border-zinc-800 py-12 flex flex-col items-center justify-center text-gray-400">
                        <MessageSquare size={40} className="mb-3 opacity-70" />
                        <p className="text-sm">Chưa có bình luận nào</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {comments.map((cmt) => (
                            <div key={cmt.id} className="flex flex-col gap-3 border-b border-zinc-800 pb-4">
                                <div className="flex items-start gap-3">
                                    <div className="relative w-12 h-12">
                                        <img
                                            src="/images/monkey.jpg"
                                            alt="avatar"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-white">{cmt.name}</p>
                                            <p className="text-xs text-gray-500">8 giờ trước</p>
                                        </div>
                                        <p className="text-gray-300 text-sm mt-1 leading-relaxed">{cmt.text}</p>

                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                            <button
                                                onClick={() =>
                                                    setReplyingTo(
                                                        replyingTo?.parentId === cmt.id && !replyingTo?.replyId
                                                            ? null
                                                            : { parentId: cmt.id, replyToName: cmt.name }
                                                    )
                                                }
                                                className="flex items-center gap-2 hover:text-yellow-400 transition"
                                            >
                                                <Reply size={16} /> Trả lời
                                            </button>
                                            <button
                                                onClick={() => { }}
                                                className="flex items-center gap-2 hover:text-yellow-400 transition">
                                                <ThumbsUp size={16} />
                                            </button>
                                            <button
                                                onClick={() => { }}
                                                className="flex items-center gap-2 hover:text-yellow-400 transition">
                                                <ThumbsDown size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComment(cmt.id)}
                                                className="flex items-center gap-2 hover:text-red-400 transition"
                                            >
                                                <Trash2 size={16} /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {replyingTo?.parentId === cmt.id && !replyingTo.replyId && (
                                    <div className="ml-12 mt-2 w-[60%] bg-[#1E202A] border border-zinc-800 rounded-xl p-3 shadow-inner">
                                        <p className="text-xs text-gray-400 mb-1">
                                            Đang trả lời <span className="text-yellow-400">{replyingTo.replyToName}</span>
                                        </p>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            rows={2}
                                            placeholder="Viết phản hồi..."
                                            className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm rounded-md px-2 py-1"
                                        />
                                        <div className="flex items-center justify-between mt-2">
                                            <button
                                                onClick={() => handleReplySend(cmt.id, undefined, replyingTo.replyToName)}
                                                className="flex items-center gap-1 font-semibold text-yellow-400 hover:text-yellow-300 transition text-sm"
                                            >
                                                Gửi <Send size={14} className="text-yellow-400" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {cmt.replies.length > 0 && (
                                    <div className="ml-12 mt-3 space-y-3">
                                        {cmt.replies.map((rep) => (
                                            <div key={rep.id} className="flex flex-col">
                                                <div className="flex items-start gap-3">
                                                    <div className="relative w-12 h-12">
                                                        <img
                                                            src="/images/monkey.jpg"
                                                            alt="avatar"
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-semibold text-white">{rep.name}</p>
                                                            {rep.replyToName && (
                                                                <div className="flex items-center text-sm text-gray-400 gap-1">
                                                                    <ChevronRight size={13} className="relative top-[1px]" />
                                                                    <span>{rep.replyToName}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <p className="text-gray-300 text-sm mt-1 leading-relaxed">{rep.text}</p>

                                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                                            <button
                                                                onClick={() =>
                                                                    setReplyingTo(
                                                                        replyingTo?.replyId === rep.id
                                                                            ? null
                                                                            : { parentId: cmt.id, replyId: rep.id, replyToName: rep.name }
                                                                    )
                                                                }
                                                                className="flex items-center gap-2 hover:text-yellow-400 transition"
                                                            >
                                                                <Reply size={16} /> Trả lời
                                                            </button>
                                                            <button
                                                                onClick={() => { }}
                                                                className="flex items-center gap-2 hover:text-yellow-400 transition">
                                                                <ThumbsUp size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => { }}
                                                                className="flex items-center gap-2 hover:text-yellow-400 transition">
                                                                <ThumbsDown size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteComment(cmt.id)}
                                                                className="flex items-center gap-2 hover:text-red-400 transition"
                                                            >
                                                                <Trash2 size={16} /> Xóa
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {replyingTo?.parentId === cmt.id &&
                                                    replyingTo.replyId === rep.id && (
                                                        <div className="ml-12 mt-2 w-[80%] bg-[#1E202A] border border-zinc-800 rounded-xl p-3 shadow-inner">
                                                            <p className="text-xs text-gray-400 mb-1">
                                                                Đang trả lời <span className="text-yellow-400">{replyingTo.replyToName}</span>
                                                            </p>
                                                            <textarea
                                                                value={replyText}
                                                                onChange={(e) => setReplyText(e.target.value)}
                                                                rows={2}
                                                                placeholder={`Phản hồi ${replyingTo.replyToName}...`}
                                                                className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm rounded-md px-2 py-1"
                                                            />
                                                            <div className="flex items-center justify-between mt-2">
                                                                <button
                                                                    onClick={() => handleReplySend(cmt.id, rep.id, replyingTo.replyToName)}
                                                                    className="flex items-center gap-1 font-semibold text-yellow-400 hover:text-yellow-300 transition text-sm"
                                                                >
                                                                    Gửi <Send size={14} className="text-yellow-400" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
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
