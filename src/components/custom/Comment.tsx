"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ChevronRight,
  MessageSquare,
  Reply,
  Send,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

import { useFilmStore } from "@/stores/filmStore";
import { useCommentStore } from "@/stores/comentStore";
import { useAuthStore } from "@/stores/authStore";
import { useAuthModalStore } from "@/stores/authModalStore";
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
import { formatTimeFromNowVN } from "@/lib/dateFomat";

export default function CommentSection() {
  const { filmData } = useFilmStore();
  const { authUser } = useAuthStore();
  const { fullName } = authUser || {};
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useAuthModalStore();
  const filmId = filmData?.film?.filmId ?? "";

  const {
    comments,
    replyingTo,
    setReplyingTo,
    fetchComments,
    createComment,
    deleteComment,
    reactComment,
    countComments,
    totalComments,
  } = useCommentStore();

  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (filmId) {
      fetchComments(filmId, 1, 10);
      countComments(filmId);
    }
  }, [filmId, fetchComments, countComments, isAuthenticated]);

  const handleSend = async () => {
    if (!filmId || !commentText.trim()) return;

    await createComment({
      content: commentText,
      filmId,
    });
    setCommentText("");
    countComments(filmId);
  };

  const handleReplySend = async () => {
    if (!filmId || !replyText.trim() || !replyingTo?.parentId) return;

    await createComment({
      content: replyText,
      filmId,
      parentId: replyingTo.parentId,
    });
    countComments(filmId);
    setReplyText("");
    setReplyingTo(null);
  };
  
  const handleReact = (commentId: string, type: "LIKE" | "DISLIKE") => {
    reactComment(commentId, type);
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    countComments(filmId);
  };

  const countReplies = (replies: any[]): number => {
    if (!replies || replies.length === 0) return 0;
    let count = replies.length;
    replies.forEach((rep) => {
      if (rep.replies && rep.replies.length > 0) {
        count += countReplies(rep.replies);
      }
    });
    return count;
  };

  const renderReplies = (replies: any[], parent: any, level: number = 1) => {
    if (!replies || replies.length === 0) return null;
    const maxLevel = 2;
    const sortedReplies = [...replies].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    if (level >= maxLevel) {
      const flattenedReplies: any[] = [];
      const flatten = (reps: any[]) => {
        reps.forEach((r) => {
          flattenedReplies.push(r);
          if (r.replies && r.replies.length > 0) {
            flatten(r.replies);
          }
        });
      };
      flatten(sortedReplies);
      const allSorted = flattenedReplies.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return (
        <div className="mt-3 space-y-3" style={{ marginLeft: 48 }}>
          {allSorted.map((rep, index) => {
            const isLast = index === allSorted.length - 1;
            return (
              <div
                key={`${rep.id}-${index}`}
                id={`comment-${rep.id}`}
                className="flex flex-col relative"
              >
                {/* Đường dọc - dừng ở comment cuối */}
                <div 
                  className="absolute left-[-36px] top-0 w-[2px] bg-gray-700/50"
                  style={{
                    height: isLast ? '20px' : '100%'
                  }}
                />
                {/* Đường ngang nối vào avatar */}
                <div className="absolute left-[-36px] top-[20px] w-[24px] h-[2px] bg-gray-700/50" />

                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 z-10">
                    <img
                      src={rep.user.avatar || "/images/monkey.jpg"}
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover border-2 border-[#0a0b0e]"
                    />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-baseline gap-2">
                      <p className="text-sm font-semibold text-white">
                        {rep.user.name}
                      </p>

                      <div className="flex items-baseline text-sm text-gray-400 gap-1">
                        <ChevronRight size={13} className="relative top-[2px]" />
                        <span>{rep.parent?.user?.name || parent.user.name}</span>
                      </div>

                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(rep.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </p>
                    </div>

                    <p className="text-gray-300 text-sm mt-1 leading-relaxed break-words overflow-wrap-anywhere">
                      {rep.content}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <button
                        onClick={() =>
                          setReplyingTo(
                            replyingTo?.replyId === rep.id
                              ? null
                              : {
                                  parentId: rep.id,
                                  replyId: rep.id,
                                  replyToName: rep.user.name,
                                }
                          )
                        }
                        className="flex items-center gap-2 hover:text-yellow-400 transition"
                      >
                        <Reply size={16} /> Trả lời
                      </button>

                      <button
                        onClick={() => handleReact(rep.id, "LIKE")}
                        className="flex items-center gap-1 hover:text-yellow-400 transition"
                      >
                        <ThumbsUp
                          size={16}
                          className={
                            rep.currentUserReaction === "LIKE"
                              ? "text-yellow-400 fill-yellow-400"
                              : ""
                          }
                        />
                        <span>{rep.totalLike}</span>
                      </button>

                      <button
                        onClick={() => handleReact(rep.id, "DISLIKE")}
                        className="flex items-center gap-1 hover:text-red-400 transition"
                      >
                        <ThumbsDown
                          size={16}
                          className={
                            rep.currentUserReaction === "DISLIKE"
                              ? "text-red-400 fill-red-500"
                              : ""
                          }
                        />
                        <span>{rep.totalDislike}</span>
                      </button>

                      {authUser?.userId === rep.user.id && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="flex items-center gap-2 hover:text-red-400 transition"
                              type="button"
                            >
                              <Trash2 size={16} /> Xóa
                            </button>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="bg-[#191B24] border-zinc-800 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <AlertTriangle
                                  size={20}
                                  className="text-yellow-400"
                                />
                                Xác nhận xóa bình luận?
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
                                onClick={() => handleDeleteComment(rep.id)}
                                className="bg-red-600 hover:bg-red-500 text-white"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>

                    {replyingTo?.parentId === rep.id && (
                      <div className="ml-10 mt-2 w-[60%] bg-[#1E202A] border border-zinc-800 rounded-xl p-3 shadow-inner">
                        <p className="text-xs text-gray-400 mb-1">
                          Đang trả lời{" "}
                          <span className="text-yellow-400">
                            {replyingTo?.replyToName}
                          </span>
                        </p>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleReplySend();
                            }
                          }}
                          rows={2}
                          placeholder="Viết phản hồi..."
                          className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm rounded-md px-2 py-1"
                        />
                        <div className="flex items-center justify-between mt-2">
                          <button
                            onClick={handleReplySend}
                            className="flex items-center gap-1 font-semibold text-yellow-400 hover:text-yellow-300 transition text-sm"
                          >
                            Gửi <Send size={14} className="text-yellow-400" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Level 1: render normally with nested structure
    return (
      <div className="mt-3 space-y-4" style={{ marginLeft: 48 }}>
        {sortedReplies.map((rep, index) => {
          const isLast = index === sortedReplies.length - 1;
          const hasNestedReplies = rep.replies && rep.replies.length > 0;
          
          return (
            <div
              key={`${rep.id}-${index}`}
              id={`comment-${rep.id}`}
              className="flex flex-col relative"
            >
              {/* Đường dọc cho level 1 */}
              <div 
                className="absolute left-[-36px] top-0 w-[2px] bg-gray-700/50"
                style={{
                  // Nếu là comment cuối và không có reply con thì dừng ở avatar
                  // Nếu có reply con thì kéo dài để nối với reply con
                  height: (isLast && !hasNestedReplies) ? '20px' : '100%'
                }}
              />
              {/* Đường ngang nối vào avatar */}
              <div className="absolute left-[-36px] top-[20px] w-[24px] h-[2px] bg-gray-700/50" />

              <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 z-10">
                  <img
                    src={rep.user.avatar || "/images/monkey.jpg"}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover border-2 border-[#0a0b0e]"
                  />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-semibold text-white">
                      {rep.user.name}
                    </p>

                    <div className="flex items-baseline text-sm text-gray-400 gap-1">
                      <ChevronRight size={13} className="relative top-[2px]" />
                      <span>{rep.parent?.user?.name || parent.user.name}</span>
                    </div>

                    <p className="text-xs text-gray-500">
                      {formatTimeFromNowVN(rep.createdAt)}
                    </p>
                  </div>

                  <p className="text-gray-300 text-sm mt-1 leading-relaxed break-words overflow-wrap-anywhere">
                    {rep.content}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <button
                      onClick={() =>
                        setReplyingTo(
                          replyingTo?.replyId === rep.id
                            ? null
                            : {
                                parentId: rep.id,
                                replyId: rep.id,
                                replyToName: rep.user.name,
                              }
                        )
                      }
                      className="flex items-center gap-2 hover:text-yellow-400 transition"
                    >
                      <Reply size={16} /> Trả lời
                    </button>

                    <button
                      onClick={() => handleReact(rep.id, "LIKE")}
                      className="flex items-center gap-1 hover:text-yellow-400 transition"
                    >
                      <ThumbsUp
                        size={16}
                        className={
                          rep.currentUserReaction === "LIKE"
                            ? "text-yellow-400 fill-yellow-400"
                            : ""
                        }
                      />
                      <span>{rep.totalLike}</span>
                    </button>

                    <button
                      onClick={() => handleReact(rep.id, "DISLIKE")}
                      className="flex items-center gap-1 hover:text-red-400 transition"
                    >
                      <ThumbsDown
                        size={16}
                        className={
                          rep.currentUserReaction === "DISLIKE"
                            ? "text-red-400 fill-red-500"
                            : ""
                        }
                      />
                      <span>{rep.totalDislike}</span>
                    </button>

                    {authUser?.userId === rep.user.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="flex items-center gap-2 hover:text-red-400 transition"
                            type="button"
                          >
                            <Trash2 size={16} /> Xóa
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-[#191B24] border-zinc-800 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle
                                size={20}
                                className="text-yellow-400"
                              />
                              Xác nhận xóa bình luận?
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
                              onClick={() => handleDeleteComment(rep.id)}
                              className="bg-red-600 hover:bg-red-500 text-white"
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>

                  {replyingTo?.parentId === rep.id && (
                    <div className="ml-10 mt-2 w-[60%] bg-[#1E202A] border border-zinc-800 rounded-xl p-3 shadow-inner">
                      <p className="text-xs text-gray-400 mb-1">
                        Đang trả lời{" "}
                        <span className="text-yellow-400">
                          {replyingTo?.replyToName}
                        </span>
                      </p>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleReplySend();
                          }
                        }}
                        rows={2}
                        placeholder="Viết phản hồi..."
                        className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm rounded-md px-2 py-1"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={handleReplySend}
                          className="flex items-center gap-1 font-semibold text-yellow-400 hover:text-yellow-300 transition text-sm"
                        >
                          Gửi <Send size={14} className="text-yellow-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Render nested replies of this reply */}
              {hasNestedReplies && renderReplies(rep.replies, rep, level + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div id="comment-section" className="mt-2">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
          Bình luận ({totalComments})
        </h3>
      </div>

      <div className="bg-[#191B24] p-6 rounded-xl border border-zinc-800 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          {isAuthenticated ? (
            <>
              <div className="relative w-12 h-12">
                <img
                  src="/images/monkey.jpg"
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-400">Bình luận với tên</p>
                <p className="text-white font-semibold">{fullName}</p>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                openLoginModal();
              }}
              className="text-sm font-semibold text-gray-300 transition"
            >
              Bạn cần{" "}
              <span className="text-yellow-400 hover:text-yellow-300 underline">
                đăng nhập
              </span>{" "}
              để bình luận.
            </button>
          )}
        </div>

        <div className="bg-zinc-800/70 border border-zinc-800 rounded-lg p-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            maxLength={2000}
            rows={5}
            placeholder="Viết bình luận..."
            className="w-full bg-zinc-800/70 text-gray-200 placeholder-gray-500 resize-none outline-none text-sm p-3 rounded-xl text-left align-top"
          />

          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-500 text-xs">
              {commentText.length} / 2000
            </span>
            <button
              onClick={handleSend}
              className="flex items-center gap-2 font-semibold text-yellow-400 hover:text-yellow-300 transition"
            >
              Gửi <Send size={18} className="text-yellow-400" />
            </button>
          </div>
        </div>
      </div>

      {/* list comment */}
      <div className="mt-6">
        {comments.length === 0 ? (
          <div className="bg-zinc-800/70 rounded-2xl border border-zinc-800 py-12 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare size={40} className="mb-3 opacity-70" />
            <p className="text-sm">Chưa có bình luận nào</p>
          </div>
        ) : (
          <div className="space-y-6">
            {[...comments]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((cmt, index) => (
                <div
                  key={`${cmt.id}-${index}`}
                  id={`comment-${cmt.id}`}
                  className="flex flex-col gap-3 border-b border-zinc-800 pb-4"
                >
                  {/* comment gốc */}
                  <div className="flex items-start gap-3">
                    <div className="relative w-10 h-10">
                      <img
                        src={cmt.user.avatar || "/images/monkey.jpg"}
                        alt="avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">
                          {cmt.user.name}
                        </p>
                        <p className="text-xs text-gray-500 relative top-[1px]">
                          {formatTimeFromNowVN(cmt.createdAt)}
                        </p>
                      </div>
                      <p className="text-gray-300 text-sm mt-1 leading-relaxed break-words overflow-wrap-anywhere">
                        {cmt.content}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <button
                          onClick={() =>
                            setReplyingTo(
                              replyingTo?.parentId === cmt.id &&
                                !replyingTo?.replyId
                                ? null
                                : {
                                    parentId: cmt.id,
                                    replyToName: cmt.user.name,
                                  }
                            )
                          }
                          className="flex items-center gap-2 hover:text-yellow-400 transition"
                        >
                          <Reply size={16} />
                          <span>
                            Trả lời{" "}
                            {countReplies(cmt.replies || []) > 0 &&
                              `(${countReplies(cmt.replies || [])})`}
                          </span>
                        </button>

                        <button
                          onClick={() => handleReact(cmt.id, "LIKE")}
                          className="flex items-center gap-1 hover:text-yellow-400 transition"
                        >
                          <ThumbsUp
                            size={16}
                            className={
                              cmt.currentUserReaction === "LIKE"
                                ? "text-yellow-400 fill-yellow-400"
                                : ""
                            }
                          />
                          <span>{cmt.totalLike}</span>
                        </button>

                        <button
                          onClick={() => handleReact(cmt.id, "DISLIKE")}
                          className="flex items-center gap-1 hover:text-red-400 transition"
                        >
                          <ThumbsDown
                            size={16}
                            className={
                              cmt.currentUserReaction === "DISLIKE"
                                ? "text-red-400 fill-red-500"
                                : ""
                            }
                          />
                          <span>{cmt.totalDislike}</span>
                        </button>

                        {authUser?.userId === cmt.user.id && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="flex items-center gap-2 hover:text-red-400 transition"
                                type="button"
                              >
                                <Trash2 size={16} /> Xóa
                              </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="bg-[#191B24] border-zinc-800 text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                  <AlertTriangle
                                    size={20}
                                    className="text-yellow-400"
                                  />
                                  Xác nhận xóa bình luận?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Hành động này không thể hoàn tác. Bạn chắc
                                  chắn muốn tiếp tục?
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-gray-200 hover:bg-zinc-700">
                                  Hủy
                                </AlertDialogCancel>

                                <AlertDialogAction
                                  onClick={() => handleDeleteComment(cmt.id)}
                                  className="bg-red-600 hover:bg-red-500 text-white"
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ô nhập reply cho comment gốc */}
                  {replyingTo?.parentId === cmt.id && !replyingTo.replyId && (
                    <div className="ml-12 mt-2 w-[60%] bg-[#1E202A] border border-zinc-800 rounded-xl p-3 shadow-inner">
                      <p className="text-xs text-gray-400 mb-1">
                        Đang trả lời{" "}
                        <span className="text-yellow-400">
                          {replyingTo.replyToName}
                        </span>
                      </p>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key == "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleReplySend();
                          }
                        }}
                        rows={2}
                        placeholder="Viết phản hồi..."
                        className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm rounded-md px-2 py-1"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={handleReplySend}
                          className="flex items-center gap-1 font-semibold text-yellow-400 hover:text-yellow-300 transition text-sm"
                        >
                          Gửi <Send size={14} className="text-yellow-400" />
                        </button>
                      </div>
                    </div>
                  )}
                  {renderReplies(cmt.replies, cmt, 1)}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}