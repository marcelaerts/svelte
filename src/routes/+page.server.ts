import { tmdbApi } from '#lib/server/tmdb.ts';
import type { PageServerLoad } from './$types';

const ENDPOINTS = ['/trending/movie/week', '/movie/popular', '/movie/top_rated'];

export const load: PageServerLoad = async () => {
  const promises = ENDPOINTS.map(tmdbApi);

  const [trending, popular, topRated] = await Promise.all(promises);
  return { trending: trending.results, popular: popular.results, topRated: topRated.results };
};
