import { tmdbApi } from '#lib/server/tmdb.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const endpoint = '/movie/popular';
  const data = await tmdbApi(endpoint);
  return { movies: data.results };
};
