import { tmdbApi } from '#lib/server/tmdb.ts';
import type { SerieDetails } from '#lib/types/tmdb.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const endpoint = `/tv/${params.id}`;
  const queryParams = {
    append_to_response: 'credits,videos',
    include_video_language: 'nl,en'
  };

  const serie = await tmdbApi<SerieDetails>(endpoint, queryParams);

  return { serie };
};
