import { movieToMediaItem, serieToMediaItem, tmdbApi } from '#lib/server/tmdb.ts';
import type { SearchListResponse } from '#lib/types/tmdb.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const searchValue = url.searchParams.get('q')?.trim();
  if (!searchValue) return { searchValue: '' };

  const endpoint = '/search/multi';
  const queryParams = {
    query: searchValue
  };

  const searchResults = await tmdbApi<SearchListResponse>(endpoint, queryParams);
  const results = searchResults.results
    .filter((result) => result.media_type !== 'person')
    .map((result) =>
      result.media_type === 'movie' ? movieToMediaItem(result) : serieToMediaItem(result)
    );

  return { results, searchValue };
};
