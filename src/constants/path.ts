export const userPath = {
  HOME: "/",
  UPGRADE_VIP: "/user/upgrade_vip",
  CONTINUE_WATCHING: "/user/continue-watching",
  FAVORITE: "/user/favorites",
  NOTIFICATION: "/user/notifications",
  PLAYLIST: "/user/playlists",
  PROFILE: "/user/profile",
};
export const filmPath = {
  ACTOR_DETAIL: (id: number | string) => `/actor-detail/${id}`,
  DIRECTOR_DETAIL: (id: number | string) => `/director-detail/${id}`,
  FILM_DETAIL: (slug: string) => `/film-detail/${slug}`,
  PLAYER_DETAIL: (filmSlug: string, part: string, episode: string) => `/play/${filmSlug}?p=${part}&ep=${episode}`
};

export const playPath = {
  WATCHNOW: (id: string) => `/play/${id}`,
};

export const co_watchingPath = {
  CREATE: () => `/co-watching/create`,
  PLAY: (id: string) => `/co-watching/${id}`
}