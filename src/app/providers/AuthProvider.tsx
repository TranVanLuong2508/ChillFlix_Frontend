"use client";

import { useEffect } from "react";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { useAppRouter } from "@/hooks/useAppRouter";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { goHome } = useAppRouter();
  const {
    fetchAccountAction,
    resetAuthAction,
    isRefreshToken,
    errorRefreshToken,
    setRefreshTokenAction,
  } = useAuthStore();
  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (isRefreshToken) {
      toast.error(errorRefreshToken);
      setRefreshTokenAction(false, "");
    }
  }, [isRefreshToken]);
  const fetchAccount = async () => {
    try {
      const res = await authService.callFetchAccount();
      if (res && res.data) {
        fetchAccountAction(res.data.user);
      } else {
        resetAuthAction();
        goHome();
      }
    } catch (errr) {
      console.log(errr);
    }
  };

  return <>{children}</>;
}
