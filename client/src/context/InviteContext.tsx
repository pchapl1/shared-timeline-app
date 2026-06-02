import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AppState } from 'react-native';

import { getPendingCircleInvites } from '../services/api';

type InviteContextValue = {
  pendingInviteCount: number;
  refreshInviteCount: () => Promise<void>;
};

const InviteContext = createContext<InviteContextValue | undefined>(
  undefined
);

export function InviteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pendingInviteCount, setPendingInviteCount] = useState(0);

  const refreshInviteCount = useCallback(async () => {
    try {
      const invites = await getPendingCircleInvites();

      const pendingInvites = invites.filter(
        (invite: any) =>
          invite.status?.toLowerCase() === 'pending'
      );

      setPendingInviteCount(pendingInvites.length);
    } catch (error) {
      console.log('Error refreshing invite count:', error);
    }
  }, []);

  useEffect(() => {
    refreshInviteCount();

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (nextAppState === 'active') {
          refreshInviteCount();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [refreshInviteCount]);

  return (
    <InviteContext.Provider
      value={{
        pendingInviteCount,
        refreshInviteCount,
      }}
    >
      {children}
    </InviteContext.Provider>
  );
}

export function useInvites() {
  const context = useContext(InviteContext);

  if (!context) {
    throw new Error('useInvites must be used inside InviteProvider');
  }

  return context;
}