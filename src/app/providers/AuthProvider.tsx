"use client";

import { useEffect } from "react";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    fetchAccountAction,
    resetAuthAction,
    isRefreshToken,
    errorRefreshToken,
    setRefreshTokenAction,
    setLoading,
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
      const accessToken = useAuthStore.getState().access_token;
      if (accessToken) {
        setLoading(true);
        const res = await authService.callFetchAccount();
        if (res && res.data) {
          fetchAccountAction(res.data.user);
        } else {
          resetAuthAction();
        }
        setLoading(false);
      }
    } catch (errr) {
      console.log(errr);
      setLoading(false);
    }
  };

  return <>{children}</>;
}
