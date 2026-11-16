export type Movie = {
  id: number;
  overview: string;
  title: string;
  vote_average: number;
};

export type MovieListResponse = {
  results: Movie[];
};
