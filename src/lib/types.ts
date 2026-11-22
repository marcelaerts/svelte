export type MovieActor = {
  character: string;
  credit_id: string;
  name: string;
  profile_path: string | null;
};

export type MovieVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
};

export type MovieCredits = {
  cast: MovieActor[];
};

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieVideos = {
  results: MovieVideo[];
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
  credits: MovieCredits;
  genres: MovieGenre[];
  runtime: number | null;
  videos: MovieVideos;
};

export type MovieListResponse = {
  results: Movie[];
};
