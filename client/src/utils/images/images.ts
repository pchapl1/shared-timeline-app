import { API_BASE_URL } from '@/services/api';

const API_HOST = API_BASE_URL.replace('/api', '');

export function getAbsoluteImageUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `${API_HOST}${url}`;
}