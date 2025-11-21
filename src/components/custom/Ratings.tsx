"use client";
import { useEffect, useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useFilmStore } from "@/stores/filmStore";
import { useAuthStore } from "@/stores/authStore";
import { useAuthModalStore } from "@/stores/authModalStore";
import { useRatingStore } from "@/stores/ratingStore";
import { socket } from "@/lib/socket";
import { toast } from "sonner";

export default function Ratings() {
    const { filmData } = useFilmStore();
    const { authUser, isAuthenticated } = useAuthStore();
    const { openLoginModal } = useAuthModalStore();
    const {
        ratings,
        averageRating,
        totalRatings,
        isLoading,
        fetchRatings,
        createRating,
        deleteRating,
        updateRatingRealtime,
        deleteRatingRealtime,
    } = useRatingStore();

    const filmId = filmData?.film?.filmId ?? "";

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (filmId) {
            fetchRatings(filmId);
        }
    }, [filmId, fetchRatings]);

    useEffect(() => {
        if (!filmId) return;

        const handleRatingUpdated = (data: any) => {
            if (data.filmId === filmId) {
                updateRatingRealtime(data);
            }
        };

        const handleRatingDeleted = (data: any) => {
            if (data.filmId === filmId) {
                deleteRatingRealtime(data.ratingId);
            }
        };

        socket.on('ratingUpdated', handleRatingUpdated);
        socket.on('ratingDeleted', handleRatingDeleted);

        return () => {
            socket.off('ratingUpdated', handleRatingUpdated);
            socket.off('ratingDeleted', handleRatingDeleted);
        };
    }, [filmId, updateRatingRealtime, deleteRatingRealtime]);

    const handleSend = async () => {
        if (!isAuthenticated) {
            openLoginModal();
            return;
        }

        if (rating === 0) return;

        try {
            const response: any = await createRating({
                filmId,
                ratingValue: rating,
                content: comment.trim() || undefined,
            });
            setComment("");
            setRating(0);
            toast.success(response?.EM || "Đánh giá thành công!");
        } catch (error: any) {
            toast.error(error.message || "Không thể gửi đánh giá. Vui lòng thử lại.");
        }
    };

    const handleDelete = async (ratingId: string) => {
        if (!isAuthenticated) return;
        try {
            const response: any = await deleteRating(ratingId);
            toast.success(response?.EM || "Xóa đánh giá thành công");
        } catch (error: any) {
            toast.error(error.message || "Không thể xóa đánh giá. Vui lòng thử lại.");
        }
    };

    return (
        <div id="rating-section" className="mt-2 text-center">
            <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Đánh giá</h3>
                {totalRatings > 0 && (
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                        <Star size={20} className="fill-yellow-400" />
                        <span className="text-lg font-bold">{averageRating}</span>
                        <span className="text-sm text-gray-400">({totalRatings} đánh giá)</span>
                    </div>
                )}
            </div>

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
                className="w-full p-3 rounded-lg bg-zinc-800/70 text-gray-200 placeholder-gray-500 text-sm focus:outline-none resize-none h-24 mb-4 border border-zinc-800"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <div className="flex justify-center gap-3">
                <button
                    onClick={handleSend}
                    disabled={isLoading || rating === 0}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
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
                {ratings.length === 0 ? (
                    <div className="bg-zinc-800/70 rounded-2xl border border-zinc-800 py-12 flex flex-col items-center justify-center text-gray-400">
                        <Star size={40} className="mb-3 opacity-70" />
                        <p className="text-sm">Chưa có đánh giá nào</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {ratings.map((rev) => (
                            <div
                                key={rev.ratingId}
                                className="flex flex-col gap-3 border-b border-zinc-800 pb-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="relative w-12 h-12">
                                        <img
                                            src={rev.user?.avatar || "/images/monkey.jpg"}
                                            alt="avatar"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-semibold text-white">
                                                    {rev.user?.name || 'Anonymous'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDistanceToNow(new Date(rev.createdAt), {
                                                        addSuffix: true,
                                                        locale: vi
                                                    })}
                                                </p>
                                            </div>
                                            {authUser?.userId === rev.user?.id && (
                                                <button
                                                    onClick={() => handleDelete(rev.ratingId)}
                                                    className="text-red-400 hover:text-red-300 transition"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={`${i < rev.ratingValue
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-600"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {rev.content && (
                                            <p className="text-gray-300 text-sm mt-1 break-words whitespace-pre-wrap leading-relaxed">
                                                {rev.content}
                                            </p>
                                        )}
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
