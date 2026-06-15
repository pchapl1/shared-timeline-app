import { useQuery } from '@tanstack/react-query';

import { getCircles } from '@/services/circles';

export function useCircles() {
  return useQuery({
    queryKey: ['circles'],
    queryFn: getCircles,
  });
}