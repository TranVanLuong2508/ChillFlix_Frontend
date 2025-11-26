"use client";

import { useEffect, useState } from "react";
import PlaylistSidebar from "@/components/users/sidebar";
import ProfileRight from "@/components/users/profile-right";
import { useAuthStore } from "@/stores/authStore";

export default function ProfilePage() {
  const { authUser, isAuthenticated } = useAuthStore();
  // const [userData, setUserData] = useState({
  //   fullName: "User",
  //   email: "user@example.com",
  // });
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    if (!isAuthenticated || !authUser) return;

    setUserEmail(authUser.email);
    setUserFullName(authUser.fullName);
    setAvatarUrl(authUser.avatarUrl || "");

  }, [authUser]);

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#1a1d24" }}>
      <div className="flex gap-12 max-w-7xl mx-auto">
        <PlaylistSidebar userName={userFullName} userEmail={userEmail} />
        <ProfileRight />
      </div>
    </div>
  );
}
