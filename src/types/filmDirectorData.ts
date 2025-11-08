import { FilmData } from "./backend.type";
import { Director } from "./director.type";
import { Film } from "./film.type";

export interface FilmDirectorRes {
  film: Film;
  director: Director;
  result: FilmData[];
}
