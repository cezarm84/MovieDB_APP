export interface Movie {
  title: string;
  imdbid: string;
  poster: string;
  trailer_link: string;
  is_favorite: boolean;
}
export type MovieInput = Omit<Movie, 'imdbid' | 'is_favorite'>;