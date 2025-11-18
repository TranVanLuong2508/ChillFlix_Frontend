"use client";

import { useEffect, useState } from "react";
import PlaylistSidebar from "@/components/users/sidebar";
import { useAuthStore } from "@/stores/authStore";
import FavoriteFilms from "@/components/users/favorites/FavoriteFilm";
import { userFavoriteStore } from "@/stores/favoriteStore";

export default function ProfilePage() {
  const { authUser, isAuthenticated } = useAuthStore();
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const { isLoadingFavoriteList, favoriteList, fetchFavoriteList, setLoading } =
    userFavoriteStore();

  useEffect(() => {
    if (isAuthenticated && authUser) {
      setUserEmail(authUser.email);
      setUserFullName(authUser.fullName);

      fetListFistTime();
    }
  }, [authUser]);

  const fetListFistTime = async () => {
    setLoading(true);
    fetchFavoriteList();
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
  };

  // const favoriteFilms = [
  //   {
  //     filmId: "f6734a45-3da4-4ded-8da7-10254deaacba",
  //     thumbUrl:
  //       "https://phimimg.com/upload/vod/20251026-1/9c7f36633c148b21417dc4159550652c.jpg",
  //     title: "Sát Nhân Giữa Trời Đông",
  //     originalTitle: "Dead Of Winter",

  //     slug: "sat-nhan-giua-troi-dong",
  //   },
  // ];

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#1a1d24" }}>
      <div className="flex gap-8 max-w-7xl mx-auto">
        <PlaylistSidebar userName={userFullName} userEmail={userEmail} />{" "}
        <FavoriteFilms
          films={favoriteList}
          fetchFilmList={fetchFavoriteList}
          isLoading={isLoadingFavoriteList}
        />
      </div>
    </div>
  );
}
