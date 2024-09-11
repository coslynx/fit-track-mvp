import { useSession } from "next-auth/react";
import Link from "next/link";
import { useStore } from "@/store";

const HomePage: React.FC = () => {
  const { data: session } = useSession();
  const store = useStore();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to the Fitness Tracker!
        </h2>
        <p className="text-center mb-6">
          Track your progress, set goals, and connect with a supportive community.
        </p>
        {!session?.user && (
          <div className="flex gap-4">
            <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </Link>
          </div>
        )}
        {session?.user && (
          <p className="text-center">
            You are logged in as {session.user.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;