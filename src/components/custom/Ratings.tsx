"use client";
import { useEffect, useState } from "react";
import { Star, Trash2, Flag, AlertTriangle } from "lucide-react";
import { useFilmStore } from "@/stores/filmStore";
import { useAuthStore } from "@/stores/authStore";
import { useAuthModalStore } from "@/stores/authModalStore";
import { useRatingStore } from "@/stores/ratingStore";
import { socket } from "@/lib/socket";
import { toast } from "sonner";
import { formatTimeFromNowVN } from "@/lib/dateFomat";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ratingService } from "@/services/ratingService";

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
    const [reportContent, setReportContent] = useState("");
    const [reportingRatingId, setReportingRatingId] = useState<string | null>(null);
    const [reportReason, setReportReason] = useState("");
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);

    const REPORT_REASONS = [
        "Ngôn từ thô tục, xúc phạm",
        "Phát tán thông tin sai sự thật",
        "Quảng cáo, spam, lừa đảo",
        "Kích động bạo lực, thù ghét",
        "Nội dung khiêu dâm, đồi trụy",
        "Tiết lộ thông tin cá nhân",
        "Bắt nạt, quấy rối người khác",
        "Vi phạm pháp luật, bản quyền",
        "Nội dung không liên quan đến phim",
        "Khác (vui lòng ghi rõ)"
    ];

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

        const handleRatingHidden = (data: any) => {
            if (data.isHidden) {
                deleteRatingRealtime(data.ratingId);
            } else {
                fetchRatings(filmId);
            }
        };

        socket.on('ratingUpdated', handleRatingUpdated);
        socket.on('ratingDeleted', handleRatingDeleted);
        socket.on('hideRating', handleRatingHidden);

        return () => {
            socket.off('ratingUpdated', handleRatingUpdated);
            socket.off('ratingDeleted', handleRatingDeleted);
            socket.off('hideRating', handleRatingHidden);
        };
    }, [filmId, updateRatingRealtime, deleteRatingRealtime]);

    const handleSend = async () => {
        if (!isAuthenticated) {
            toast.warning("Bạn cần đăng nhập để đánh giá phim.");
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

    const handleSendReport = async () => {
        setIsSubmittingReport(true);

        if (!reportReason) {
            toast.warning("Vui lòng chọn lý do báo cáo.");
            setIsSubmittingReport(false);
            return;
        }

        if (reportReason === REPORT_REASONS[9] && !reportContent.trim()) {
            toast.warning("Vui lòng nhập nội dung báo cáo chi tiết.");
            setIsSubmittingReport(false);
            return;
        }

        if (!reportingRatingId) {
            toast.error("Không tìm thấy đánh giá cần báo cáo.");
            setIsSubmittingReport(false);
            return;
        }

        try {
            const description = reportReason === REPORT_REASONS[9]
                ? reportContent
                : reportReason;

            const res = await ratingService.reportRating(
                reportingRatingId,
                reportReason,
                description
            );

            if (res.EC === 1) {
                toast.success("Báo cáo của bạn đã được gửi. Cảm ơn bạn!");
                setReportingRatingId(null);
                setReportReason("");
                setReportContent("");
            } else {
                toast.error(res.EM || "Gửi báo cáo thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.");
        } finally {
            setIsSubmittingReport(false);
        }
    };

    return (
        <div id="rating-section" className="mt-2 text-center">
            <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Đánh giá</h3>
                {totalRatings > 0 && (
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                        <Star size={20} className="fill-yellow-400" />
                        <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
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
                                                    {formatTimeFromNowVN(rev.createdAt)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {authUser?.userId === rev.user?.id ? (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <button
                                                                type="button"
                                                                className="text-red-400 hover:text-red-300 transition"
                                                                title="Xóa"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-[#191B24] border-zinc-800 text-white">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle className="flex items-center gap-2">
                                                                    <AlertTriangle size={20} className="text-yellow-400" />
                                                                    Xác nhận xóa đánh giá?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription className="text-gray-400">
                                                                    Hành động này không thể hoàn tác.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-gray-200 hover:bg-zinc-700">
                                                                    Hủy
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(rev.ratingId)}
                                                                    className="bg-red-600 hover:bg-red-500 text-white"
                                                                >
                                                                    Xóa
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (!isAuthenticated) {
                                                                toast.warning("Bạn cần đăng nhập để báo cáo đánh giá.");
                                                                return;
                                                            }
                                                            setReportingRatingId(rev.ratingId);
                                                            setReportReason("");
                                                            setReportContent("");
                                                        }}
                                                        className="text-gray-400 hover:text-red-400 transition"
                                                        title="Báo cáo"
                                                    >
                                                        <Flag size={16} />
                                                    </button>
                                                )}
                                            </div>
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

            {/* Report Dialog */}
            <Dialog open={!!reportingRatingId} onOpenChange={(open) => {
                if (!open) {
                    setReportingRatingId(null);
                    setReportReason("");
                    setReportContent("");
                }
            }}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-red-500 text-lg flex items-center gap-2">
                            <AlertTriangle size={20} className="text-yellow-400" />
                            Báo cáo đánh giá tiêu cực
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Vui lòng chọn lý do báo cáo:
                        </DialogDescription>
                    </DialogHeader>

                    <RadioGroup value={reportReason} onValueChange={setReportReason}>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {REPORT_REASONS.map((reason) => (
                                <div key={reason} className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value={reason}
                                        id={reason}
                                        className="border-gray-600 text-yellow-400"
                                    />
                                    <Label
                                        htmlFor={reason}
                                        className="text-sm text-gray-300 cursor-pointer flex-1"
                                    >
                                        {reason}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>

                    {reportReason === REPORT_REASONS[9] && (
                        <Textarea
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            placeholder="Nhập nội dung báo cáo chi tiết..."
                            className="bg-zinc-800 border-zinc-700 text-white placeholder-gray-500 min-h-[100px]"
                        />
                    )}

                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setReportingRatingId(null);
                                setReportReason("");
                                setReportContent("");
                            }}
                            disabled={isSubmittingReport}
                            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSendReport}
                            disabled={isSubmittingReport || !reportReason}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isSubmittingReport ? "Đang gửi..." : "Gửi báo cáo"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
