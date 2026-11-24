import { tmdbApi } from '#lib/server/tmdb.ts';
import type { MovieListResponse } from '#lib/types.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const [trending, popular, topRated] = await Promise.all([
    tmdbApi<MovieListResponse>('/trending/movie/week'),
    tmdbApi<MovieListResponse>('/movie/popular'),
    tmdbApi<MovieListResponse>('/movie/top_rated')
  ]);
  const randomTrendingIndex = Math.floor(Math.random() * trending.results.length);
  const heroMovie = trending.results[randomTrendingIndex];
  return {
    trending: trending.results,
    popular: popular.results,
    topRated: topRated.results,
    heroMovie
  };
};
