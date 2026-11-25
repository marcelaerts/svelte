import { movieToMediaItem, serieToMediaItem, tmdbApi } from '#lib/server/tmdb.ts';
import type { MovieListResponse, SerieListResponse } from '#lib/types/tmdb.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const [trendingMovies, popularMovies, topRatedMovies, popularSeries] = await Promise.all([
    tmdbApi<MovieListResponse>('/trending/movie/week'),
    tmdbApi<MovieListResponse>('/movie/popular'),
    tmdbApi<MovieListResponse>('/movie/top_rated'),
    tmdbApi<SerieListResponse>('/tv/popular')
  ]);
  const randomTrendingIndex = Math.floor(Math.random() * trendingMovies.results.length);
  const heroMovie = trendingMovies.results[randomTrendingIndex];
  return {
    trendingMovies: trendingMovies.results.map(movieToMediaItem),
    popularMovies: popularMovies.results.map(movieToMediaItem),
    topRatedMovies: topRatedMovies.results.map(movieToMediaItem),
    popularSeries: popularSeries.results.map(serieToMediaItem),
    heroMovie
  };
};
