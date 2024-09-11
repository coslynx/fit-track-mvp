import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import Header from '@components/Header';
import { useEffect } from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      store.setUser(session.user);
    } else if (status === 'unauthenticated') {
      store.setUser(null);
      router.push('/login');
    }
  }, [status, session, store, router]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
};

export default Layout;