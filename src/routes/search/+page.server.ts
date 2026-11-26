import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const searchValue = url.searchParams.get('q')?.trim();

  if (!searchValue) return { searchValue: '' };

  return { searchValue };
};
