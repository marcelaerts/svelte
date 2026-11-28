import { movieToMediaItem, tmdbApi } from '#lib/server/tmdb.ts';
import type { MovieDetails } from '#lib/types/tmdb.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const endpoint = `/movie/${params.id}`;
  const queryParams = {
    append_to_response: 'credits,videos',
    include_video_language: 'nl,en'
  };

  const movie = await tmdbApi<MovieDetails>(endpoint, queryParams);

  return { movie, mediaItem: movieToMediaItem(movie) };
};
