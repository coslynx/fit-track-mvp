import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/react/types';
import { create } from 'zustand';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import * as Sentry from '@sentry/nextjs';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.ComponentType<any>;
  pageProps: { session: Session | null } & Record<string, any>;
}) {
  const store = useAppStore();
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user) {
        store.setUser(session.user as User);
        setHasFetchedUser(true);
      }
    };

    fetchUser();
  }, [session, store]);

  return (
    <SessionProvider session={session}>
      {hasFetchedUser && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}