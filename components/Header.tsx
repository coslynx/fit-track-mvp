import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { useEffect } from 'react';

const Header: React.FC = () => {
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
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="font-bold text-xl">
            Fitness Tracker
          </Link>
        </div>
        <nav>
          <ul className="flex gap-4">
            {session?.user && (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/goals">Goals</Link>
                </li>
                <li>
                  <a href="/api/auth/signout" className="cursor-pointer">
                    Logout
                  </a>
                </li>
              </>
            )}
            {!session?.user && (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;