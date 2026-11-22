import { error } from '@sveltejs/kit';
import { TMDB_TOKEN } from '$app/env/private';

const baseUrl = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};

export const tmdbApi = async <T>(
  endpoint: string,
  queryParams: Record<string, string> = {}
): Promise<T> => {
  const url = new URL(`${baseUrl}${endpoint}`);

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.set(key, value);
  }

  url.searchParams.set('language', 'nl-NL');

  const response = await fetch(url, options);
  if (!response.ok) {
    error(response.status, `Failed to fetch TMDB API: ${endpoint}`);
  }
  return response.json();
};
