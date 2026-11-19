import { tmdbApi } from '#lib/server/tmdb.ts';
import type { MovieListResponse } from '#lib/types.ts';
import type { PageServerLoad } from './$types';

const ENDPOINTS = ['/trending/movie/week', '/movie/popular', '/movie/top_rated'];

export const load: PageServerLoad = async () => {
  const promises = ENDPOINTS.map(tmdbApi<MovieListResponse>);

  const [trending, popular, topRated] = await Promise.all(promises);
  const randomTrendingIndex = Math.floor(Math.random() * trending.results.length);
  const heroMovie = trending.results[randomTrendingIndex];
  return {
    trending: trending.results,
    popular: popular.results,
    topRated: topRated.results,
    heroMovie
  };
};
