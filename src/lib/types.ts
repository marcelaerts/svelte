export type Movie = {
  id: number;
  overview: string;
  poster_path: string | null;
  title: string;
  vote_average: number;
};

export type MovieListResponse = {
  results: Movie[];
};
