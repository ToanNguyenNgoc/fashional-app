import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 3600 * 10,
    },
  },
});
export const STALE_TIME = 3600 * 10 * 5;
export const QR_KEY = {
  tag: 'tag',
  category: 'category',
  product: 'product',
  gallery: 'gallery',
  product_size: 'product_size',
  product_branch: 'product_branch',
};
