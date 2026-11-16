import { error } from '@sveltejs/kit';
import { TMDB_TOKEN } from '$app/env/private';
import type { MovieListResponse } from '#lib/types.ts';

const baseUrl = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};

export const tmdbApi = async (endpoint: string): Promise<MovieListResponse> => {
  const url = new URL(`${baseUrl}${endpoint}`);
  url.searchParams.set('language', 'nl-NL');

  const response = await fetch(url, options);
  if (!response.ok) {
    error(response.status, `Failed to fetch TMDB API: ${endpoint}`);
  }
  return response.json();
};
