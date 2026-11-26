import { error } from '@sveltejs/kit';
import { TMDB_TOKEN } from '$app/env/private';
import type { GenreRow, MediaItem } from '#lib/types/media.ts';
import type {
  GenreListResponse,
  Movie,
  MovieListResponse,
  Serie,
  SerieListResponse
} from '#lib/types/tmdb.ts';

const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};

export const movieToMediaItem = (movie: Movie): MediaItem => ({
  backdropPath: movie.backdrop_path,
  id: movie.id,
  overview: movie.overview,
  posterPath: movie.poster_path,
  title: movie.title,
  type: 'movie',
  voteAverage: movie.vote_average
});

export const serieToMediaItem = (serie: Serie): MediaItem => ({
  backdropPath: serie.backdrop_path,
  id: serie.id,
  overview: serie.overview,
  posterPath: serie.poster_path,
  title: serie.name,
  type: 'serie',
  voteAverage: serie.vote_average
});

export const tmdbApi = async <T>(
  endpoint: string,
  queryParams: Record<string, string> = {}
): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.set(key, value);
  }

  url.searchParams.set('language', 'nl-NL');

  const response = await fetch(url, options);
  if (!response.ok) {
    console.error(response.status, `Failed to fetch TMDB API: ${endpoint}`);
    error(response.status, 'Het ophalen van de gegevens is mislukt.');
  }
  return response.json();
};

export const getGenreRows = async (type: 'movie' | 'tv'): Promise<GenreRow[]> => {
  const { genres } = await tmdbApi<GenreListResponse>(`/genre/${type}/list`);
  return Promise.all(
    genres.slice(0, 5).map(async (genre) => {
      if (type === 'tv') {
        const series = await tmdbApi<SerieListResponse>(`/discover/${type}`, {
          with_genres: String(genre.id)
        });
        return { id: genre.id, title: genre.name, items: series.results.map(serieToMediaItem) };
      }

      const movies = await tmdbApi<MovieListResponse>(`/discover/${type}`, {
        with_genres: String(genre.id)
      });
      return { id: genre.id, title: genre.name, items: movies.results.map(movieToMediaItem) };
    })
  );
};
