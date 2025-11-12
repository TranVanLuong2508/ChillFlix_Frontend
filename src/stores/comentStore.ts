import { create } from "zustand";
import { CommentServices } from "@/services/commentService";
import type {
  CommentItem,
  CommentPayload,
  CommentListData,
  BackendComment,
  CommentReactionType,
} from "@/types/comment.type";
import { useAuthStore } from "./authStore";

interface ReplyingToState {
  parentId: string;
  replyId?: string;
  replyToName?: string;
}

interface CommentStoreState {
  activeTab: "comments" | "ratings";
  comments: CommentItem[];
  totalComments: number;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  replyingTo: ReplyingToState | null;
  isLoading: boolean;
  error: string | null;
}

interface CommentStoreActions {
  fetchComments: (
    filmId: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
  countComments: (filmId: string) => Promise<void>;
  createComment: (payload: CommentPayload) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  reactComment: (commentId: string, type: CommentReactionType) => Promise<void>;
  setReplyingTo: (info: ReplyingToState | null) => void;
  setActiveTab: (tab: "comments" | "ratings") => void;
  removeCommentRealtime: (commentId: string) => void;
  createCommentRealtime: (newComment: BackendComment) => void;
  replyCommentRealtime: (data: {
    parentId: string;
    comment: BackendComment;
  }) => void;
  countCommentsRealtime: (filmId: string, total?: number) => void;
  reactCommentRealtime: (reaction: {
    commentId: string;
    userId: number | string;
    totalLike: number;
    totalDislike: number;
    userReaction?: CommentReactionType;
  }) => void;
}

const mapBackendToItem = (c: BackendComment): CommentItem => ({
  id: c.commentId,
  content: c.content,
  createdAt: c.createdAt,
  totalLike: c.totalLike,
  totalDislike: c.totalDislike,
  totalChildrenComment: c.totalChildrenComment,
  currentUserReaction: c.currentUserReaction || undefined,
  user: {
    id: c.user.userId,
    name: c.user.fullName,
    avatar: c.user.avatarUrl,
  },
  replies: [],
});

export const useCommentStore = create<CommentStoreState & CommentStoreActions>(
  (set, get) => ({
    activeTab: "comments",
    comments: [],
    meta: null,
    totalComments: 0,
    replyingTo: null,
    isLoading: false,
    error: null,

    fetchComments: async (filmId, page = 1, limit = 10) => {
      set({ isLoading: true, error: null });
      try {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        const res = isAuthenticated
          ? await CommentServices.getCommentsByFilmAuth(filmId, page, limit)
          : await CommentServices.getCommentsByFilmGuest(filmId, page, limit);

        if (res.EC !== 1 || !res.data) {
          set({
            error: res.EM || "Error fetching comments",
            isLoading: false,
          });
          return;
        }

        const data: CommentListData = res.data;
        set({
          comments: data.comments || [],
          meta: data.meta,
          isLoading: false,
        });
      } catch (error: any) {
        console.error("fetchComments error", error);
        set({
          error: error?.message || "Error fetching comments",
          isLoading: false,
        });
      }
    },

    createComment: async (payload) => {
      set({ isLoading: true, error: null });
      try {
        const res = await CommentServices.createComment(payload);
        if (res.EC !== 1 || !res.data) {
          set({
            error: res.EM || "Error creating comment",
            isLoading: false,
          });
          return;
        }

        const fullComment = res.data.fullComment as BackendComment;
        const newItem = mapBackendToItem(fullComment);

        if (payload.parentId) {
          set((state) => ({
            comments: state.comments.map((c) =>
              c.id === payload.parentId
                ? { ...c, replies: [...c.replies, newItem] }
                : c
            ),
          }));
        } else {
          set((state) => ({
            comments: [newItem, ...state.comments],
          }));
        }
      } catch (error: any) {
        console.error("createComment error", error);
        set({ error: error?.message || "Error creating comment" });
      } finally {
        set({ isLoading: false, replyingTo: null });
      }
    },

    deleteComment: async (commentId: string) => {
      set({ isLoading: true, error: null });
      try {
        const res = await CommentServices.deleteComment(commentId);
        if (res.EC !== 1) {
          set({
            error: res.EM || "Could not delete comment",
            isLoading: false,
          });
          return;
        }
        set((state) => {
          const newComments = state.comments
            .filter((c) => c.id !== commentId)
            .map((c) => ({
              ...c,
              replies: c.replies.filter((r) => r.id !== commentId),
            }));

          return { ...state, comments: newComments, isLoading: false };
        });
      } catch (error: any) {
        console.error("deleteComment error", error);
        set({
          error: error?.message || "Error deleting comment",
          isLoading: false,
        });
      }
    },

    reactComment: async (commentId, type) => {
      try {
        const res = await CommentServices.reactToComment(commentId, type);
        console.log("REACT API RESPONSE:", res);
        if (res.EC !== 1 || !res.data) {
          set({ error: res.EM || "Error reacting to comment" });
          return;
        }

        const { totalLike, totalDislike, userReaction } = res.data;

        const updateTree = (list: CommentItem[]): CommentItem[] =>
          list.map((c) => {
            const replies = c.replies || [];

            if (c.id === commentId) {
              return {
                ...c,
                totalLike,
                totalDislike,
                currentUserReaction: userReaction || undefined,
                replies: updateTree(replies),
              };
            }

            return {
              ...c,
              replies: updateTree(replies),
            };
          });

        set((state) => ({
          ...state,
          comments: updateTree(state.comments),
        }));
      } catch (error: any) {
        console.error("reactComment error", error);
        set({ error: error?.message || "Error reacting to comment" });
      }
    },

    countComments: async (filmId: string) => {
      try {
        const res = await CommentServices.countCommentsByFilm(filmId);
        if (res.EC !== 1 || !res.data) {
          set({ error: res.EM || "Error counting comments" });
          return;
        }
        set({ totalComments: res.data.totalComments });
      } catch (error: any) {
        console.error("countComments error", error);
        set({ error: error?.message || "Error counting comments" });
      }
    },

    removeCommentRealtime: (commentId: string) =>
      set((state) => {
        const updated = state.comments
          .filter((c) => c.id !== commentId)
          .map((c) => ({
            ...c,
            replies: c.replies?.filter((r) => r.id !== commentId) || [],
          }));

        return { ...state, comments: updated };
      }),

    createCommentRealtime: (newComment: BackendComment) =>
      set((state) => {
        const mappedComment = mapBackendToItem(newComment);
        const exists = state.comments.some(
          (c) =>
            c.id === mappedComment.id ||
            c.replies.some((r) => r.id === mappedComment.id)
        );
        if (exists) return state;

        if (newComment.parent) {
          const updatedComments = state.comments.map((c) =>
            c.id === newComment.parent?.commentId
              ? { ...c, replies: [...(c.replies || []), mappedComment] }
              : c
          );
          return { ...state, comments: updatedComments };
        } else {
          return { ...state, comments: [mappedComment, ...state.comments] };
        }
      }),

    replyCommentRealtime: (data) =>
      set((state) => {
        const mappedComment = mapBackendToItem(data.comment);
        const exists = state.comments.some(
          (c) =>
            c.id === mappedComment.id ||
            c.replies.some((r) => r.id === mappedComment.id)
        );
        if (exists) return state;

        const updatedComments = state.comments.map((c) =>
          c.id === data.parentId
            ? { ...c, replies: [...(c.replies || []), mappedComment] }
            : c
        );
        return { ...state, comments: updatedComments };
      }),

    countCommentsRealtime: (filmId: string, total?: number) => {
      if (!filmId) return;
      set((state) => ({
        ...state,
        totalComments:
          typeof total === "number" ? total : state.totalComments + 1,
      }));
    },

    reactCommentRealtime: (reaction) => {
      const { commentId, totalLike, totalDislike, userReaction, userId } =
        reaction;
      const currentUser = useAuthStore.getState().authUser;

      const updateTree = (list: CommentItem[]): CommentItem[] =>
        list.map((c) => {
          const replies = c.replies || [];

          if (c.id === commentId) {
            return {
              ...c,
              totalLike,
              totalDislike,
              currentUserReaction:
                currentUser?.userId === userId
                  ? userReaction || undefined
                  : c.currentUserReaction,
              replies: updateTree(replies),
            };
          }

          return {
            ...c,
            replies: updateTree(replies),
          };
        });

      set((state) => ({
        ...state,
        comments: updateTree(state.comments),
      }));
    },

    setReplyingTo: (info) => set({ replyingTo: info }),
    setActiveTab: (tab) => set({ activeTab: tab }),
  })
);
