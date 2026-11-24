import { error } from '@sveltejs/kit';
import { TMDB_TOKEN } from '$app/env/private';

const BASE_URL = 'https://api.themoviedb.org/3';
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
