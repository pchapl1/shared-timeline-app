import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const storedTokens = await AsyncStorage.getItem('tokens');

        if (!storedTokens) {
          return Promise.reject(error);
        }

        const parsedTokens = JSON.parse(storedTokens);

        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/token/refresh/`,
          {
            refresh: parsedTokens.refresh,
          }
        );

        const newTokens = {
          ...parsedTokens,
          access: refreshResponse.data.access,
        };

        await AsyncStorage.setItem(
          'tokens',
          JSON.stringify(newTokens)
        );

        setAuthToken(newTokens.access);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newTokens.access}`,
};

        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem('tokens');
        setAuthToken(null);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const createCircleInvite = async (
  circleId: number,
  invitedUserId: number
) => {
  const response = await api.post('/circle-invites/', {
    circle: circleId,
    invited_user: invitedUserId,
  });

  return response.data;
};

export const getPendingCircleInvites = async () => {
  const response = await api.get('/circle-invites/');

  return response.data;
};

export const acceptCircleInvite = async (inviteId: number) => {
  const response = await api.post(`/circle-invites/${inviteId}/accept/`);

  return response.data;
};

export const declineCircleInvite = async (inviteId: number) => {
  const response = await api.post(`/circle-invites/${inviteId}/decline/`);

  return response.data;
};

export const searchUsers = async (query: string) => {
  const response = await api.get(`/auth/search/?q=${query}`);
  return response.data;
};