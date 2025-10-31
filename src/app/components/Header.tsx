'use client';

import Link from 'next/link';
import { useAuthStore } from "../../store/useStore";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/dashboard">Task Manager</Link>
      </h1>

      {mounted && (
        <nav className="flex gap-4">
          {!token ? (
            <>
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
