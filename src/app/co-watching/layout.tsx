"use client";

import { NotAuthContent } from "@/components/custom/notAuthContent";
import { useAuthStore } from "@/stores/authStore";

interface Co_WatchingLayoutProps {
  children: React.ReactNode,
}

const Co_WatchingLayout = ({ children }: Co_WatchingLayoutProps) => {
  const { authUser, isLoggingIn } = useAuthStore();

  if (!isLoggingIn) {
    return (
      <NotAuthContent />
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}
export default Co_WatchingLayout