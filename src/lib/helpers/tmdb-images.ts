const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

type ImageUrlParams = {
  path: string | null;
  size?: 'w185' | 'w342' | 'w500' | 'original';
};

export const imageUrl = ({ path, size = 'w342' }: ImageUrlParams): string | null => {
  if (path === null) {
    return null;
  }
  return `${IMAGE_BASE_URL}${size}${path}`;
};
