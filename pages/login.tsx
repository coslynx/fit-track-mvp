import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import Button from '@/components/Button';

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const store = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (status === 'authenticated') {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (session) {
        store.setUser(session.user);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </Button>
    </form>
  );
};

export default LoginPage;