import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api, setAuthToken } from '../services/api';

import {
  AuthTokens,
  LoginData,
  RegisterData,
} from '../types/auth';

type AuthContextType = {
  tokens: AuthTokens | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredTokens();
  }, []);

  async function loadStoredTokens() {
    try {
      const storedTokens = await AsyncStorage.getItem('tokens');

      if (storedTokens) {
        const parsedTokens: AuthTokens = JSON.parse(storedTokens);

        setTokens(parsedTokens);

        setAuthToken(parsedTokens.access);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function login(data: LoginData) {
    const response = await api.post<AuthTokens>(
      '/auth/token/',
      data
    );

    setTokens(response.data);

    setAuthToken(response.data.access);

    await AsyncStorage.setItem(
      'tokens',
      JSON.stringify(response.data)
    );
  }

  async function register(data: RegisterData) {
    await api.post('/auth/register/', data);

    await login({
      username: data.username,
      password: data.password,
    });
  }

  async function logout() {
    setTokens(null);

    setAuthToken(null);

    await AsyncStorage.removeItem('tokens');
  }

  return (
    <AuthContext.Provider
      value={{
        tokens,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}