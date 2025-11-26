"use client";

import { useEffect, useState } from "react";
import PlaylistSidebar from "@/components/users/sidebar";
import { useAuthStore } from "@/stores/authStore";
import { userPlaylistStore } from "@/stores/playlistStore";
import PlaylistContent from "@/components/users/playlists/PlayListContent";
export default function ProfilePage() {
  const { authUser, isAuthenticated } = useAuthStore();
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const { userPlaylists, fetchPlaylists, isLoadingPlaylist } =
    userPlaylistStore();

  useEffect(() => {
    if (!isAuthenticated || !authUser) return;

    setUserEmail(authUser.email);
    setUserFullName(authUser.fullName);

    fetchPlaylists();
  }, [authUser]);

  return (
    <div
      className="min-h-screen p-8 pt-[80px]"
      style={{ backgroundColor: "#1a1d24" }}
    >
      <div className="flex gap-8 max-w-7xl mx-auto">
        <PlaylistSidebar userName={userFullName} userEmail={userEmail} />{" "}
        <PlaylistContent
          userPlaylists={userPlaylists}
          fetchPlaylists={fetchPlaylists}
          isLoadingPlaylist={isLoadingPlaylist}
        />
      </div>
    </div>
  );
}
