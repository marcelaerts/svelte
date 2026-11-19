import { tmdbApi } from '#lib/server/tmdb.ts';
import type { Movie } from '#lib/types.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const endpoint = `/movie/${params.id}`;

  const movie = await tmdbApi<Movie>(endpoint);
  return {
    movie
  };
};
