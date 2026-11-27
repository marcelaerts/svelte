export type Actor = {
  character: string;
  credit_id: string;
  name: string;
  profile_path: string | null;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
};

export type Credits = {
  cast: Actor[];
};

export type Genre = {
  id: number;
  name: string;
};

export type GenreListResponse = {
  genres: Genre[];
};

export type Videos = {
  results: Video[];
};

export type Movie = {
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
};

export type MovieDetails = Movie & {
  credits: Credits;
  genres: Genre[];
  runtime: number | null;
  videos: Videos;
};

export type MovieListResponse = {
  results: Movie[];
};

export type Serie = {
  backdrop_path: string | null;
  first_air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
};

export type SerieDetails = Serie & {
  credits: Credits;
  genres: Genre[];
  number_of_seasons: number;
  videos: Videos;
};

export type SerieListResponse = {
  results: Serie[];
};

export type MovieSearchResult = Movie & {
  media_type: 'movie';
};

export type SerieSearchResult = Serie & {
  media_type: 'tv';
};

export type PersonSearchResult = {
  media_type: 'person';
};

export type SearchListResponse = {
  results: (MovieSearchResult | SerieSearchResult | PersonSearchResult)[];
};
