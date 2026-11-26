import { getGenreRows } from '#lib/server/tmdb.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const genreRows = await getGenreRows('movie');

  return {
    genreRows
  };
};
