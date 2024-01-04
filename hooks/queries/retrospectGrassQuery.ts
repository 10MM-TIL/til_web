import { fetchRetrospectGrass } from '@/apis/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchRetrospectGrassData = ({ path, from, to }: { path: string; from: number; to: number }) => {
  return useQuery(['RETROSPECT_GRASS_DATA', { path, from, to }], () => fetchRetrospectGrass({ path, from, to }), {
    enabled: path.length > 0,
    keepPreviousData: true,
  });
};
