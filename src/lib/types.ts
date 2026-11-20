export type MovieGenre = {
  id: number;
  name: string;
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
  genres: MovieGenre[];
  runtime: number | null;
};

export type MovieListResponse = {
  results: Movie[];
};
