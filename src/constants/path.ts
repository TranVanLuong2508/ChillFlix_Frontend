export const filmPath = {
  ACTOR_DETAIL: (id: number | string) => `/actor-detail/${id}`,
  DIRECTOR_DETAIL: (id: number | string) => `/director-detail/${id}`,
  FILM_DETAIL: (id: string) => `/film-detail/${id}`,
};

export const playPath = {
  WATCHNOW: (id: string) => `/play/${id}`, 
};
