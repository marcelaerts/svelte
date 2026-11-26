export type MediaItem = {
  backdropPath: string | null;
  id: number;
  overview: string;
  posterPath: string | null;
  title: string;
  type: 'movie' | 'serie';
  voteAverage: number;
};

export type GenreRow = {
  id: number;
  items: MediaItem[];
  title: string;
};
