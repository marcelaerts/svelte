import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { TMDB_TOKEN } from '$app/env/private';

export const load: PageServerLoad = async ({ fetch }) => {
  const tmdbBaseUrl = 'https://api.themoviedb.org/3';
  const endpoint = '/movie/popular';
  const requestParams = '?language=nl-NL';
  const url = `${tmdbBaseUrl}${endpoint}${requestParams}`;
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    error(response.status, 'Failed to fetch movies.');
  }
  const data = await response.json();
  return { movies: data.results };
};
