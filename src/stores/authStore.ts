import { IUser } from "@/types/user.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthUser {
  userId: number | null;
  email: string;
  roleId: number | null;
  fullName: string;
  genderCode: string;
  isVip: boolean | null;
  statusCode: string;
}

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshToken: boolean;
  access_token: string;
  errorRefreshToken: string;
  authUser: IAuthUser;
}

const initialAuthState: IAuthState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  access_token: "",
  errorRefreshToken: "",
  authUser: {
    userId: null,
    email: "",
    roleId: null,
    fullName: "",
    genderCode: "",
    isVip: null,
    statusCode: "",
  },
};

type authAction = {
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  loginAction: (data: { access_token: string; user: IAuthUser }) => void;
  logOutAction: () => void;
  setRefreshTokenAction: (status: boolean, message: string) => void;
  setTokenToTestApi: () => void;
};

export const useAuthStore = create<IAuthState & authAction>()(
  persist(
    (set, get) => ({
      ...initialAuthState,

      setAuthenticated: (value) => set({ isAuthenticated: value }),

      setLoading: (value) => set({ isLoading: value }),

      loginAction: ({ access_token, user }) => {
        set((prev) => ({
          isAuthenticated: true,
          authUser: {
            ...prev.authUser,
            ...user,
          },
          access_token: access_token,
        }));
      },

      logOutAction: () => {
        set({
          access_token: "",
          isAuthenticated: false,
          authUser: {
            userId: null,
            email: "",
            roleId: null,
            fullName: "",
            genderCode: "",
            isVip: null,
            statusCode: "",
          },
        });
      },

      setRefreshTokenAction: (status, message) => {
        set({
          isRefreshToken: status,
          access_token: message,
        });
      },

      setTokenToTestApi: () => {
        set({ access_token: "" });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
