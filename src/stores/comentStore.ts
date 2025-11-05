import {create} from "zustand";



interface CommentStore {
    activeTab: "comments" | "ratings";
    setActiveTab: (tab: "comments" | "ratings") => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
    activeTab: "comments",
    setActiveTab: (tab) => set({ activeTab: tab }),
}))