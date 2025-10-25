"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import AvatarUser from "./AvartarUser";

export default function Ratings() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState<
        { id: number; name: string; rating: number; text: string }[]
    >([]);

    const handleSend = () => {
        if (comment.trim() === "" || rating === 0) return;
        const newReview = {
            id: Date.now(),
            name: "An Nguyễn",
            rating,
            text: comment,
        };
        setReviews([newReview, ...reviews]);
        setComment("");
        setRating(0);
    };

    return (
        <div id="rating-section" className="mt-10 text-center">
            <h3 className="text-lg font-semibold mb-4">Đánh giá phim</h3>


            <div className="flex justify-center mb-4 gap-3">
                {[...Array(5)].map((_, i) => {
                    const val = i + 1;
                    return (
                        <Star
                            key={i}
                            size={34}
                            onClick={() => setRating(val)}
                            onMouseEnter={() => setHover(val)}
                            onMouseLeave={() => setHover(0)}
                            className={`cursor-pointer transition-transform ${val <= (hover || rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-500"
                                }`}
                        />
                    );
                })}
            </div>


            <textarea
                placeholder="Viết nhận xét về phim (tuỳ chọn)"
                className="w-full p-3 rounded-lg bg-zinc-900 text-gray-300 text-sm focus:outline-none resize-none h-24 mb-4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <div className="flex justify-center gap-3">
                <button
                    onClick={handleSend}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg"
                >
                    Gửi đánh giá
                </button>
                <button
                    onClick={() => {
                        setRating(0);
                        setComment("");
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg"
                >
                    Xoá
                </button>
            </div>


            <div className="mt-6">
                {reviews.length === 0 ? (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 py-12 flex flex-col items-center justify-center text-gray-400">
                        <Star size={40} className="mb-3 opacity-70" />
                        <p className="text-sm">Chưa có đánh giá nào</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((rev) => (
                            <div
                                key={rev.id}
                                className="flex flex-col gap-3 border-b border-zinc-800 pb-4"
                            >
                                <div className="flex items-start gap-3">
                                    <AvatarUser />
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-white">
                                                {rev.name}
                                            </p>
                                            <p className="text-xs text-gray-500">Vừa xong</p>
                                        </div>


                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={`${i < rev.rating
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-600"
                                                        }`}
                                                />
                                            ))}
                                        </div>


                                        <p className="text-gray-300 text-sm mt-1 break-words whitespace-pre-wrap leading-relaxed">
                                            {rev.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
