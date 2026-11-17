import { tmdbApi } from '#lib/server/tmdb.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const endpoint = '/movie/popular';
  const data = await tmdbApi(endpoint);
  // Temporary for testing
  data.results[0].poster_path = null;
  return { movies: data.results };
};
