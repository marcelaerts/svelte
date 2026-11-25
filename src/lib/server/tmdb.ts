import { error } from '@sveltejs/kit';
import { TMDB_TOKEN } from '$app/env/private';
import type { MediaItem } from '#lib/types/media.ts';
import type { Movie, Serie } from '#lib/types/tmdb.ts';

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
