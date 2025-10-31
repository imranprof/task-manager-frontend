
'use client';

import { useState } from 'react';
import { useAuthStore } from '../../store/useStore';
import axios from '../../api/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await axios.post('/auth/signup', { email, username, password });
      setToken(res.data.access_token);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">SignUp</h1>

        <div className="space-y-4">
          <input
            className="w-full p-3 border text-black placeholder-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={handleSignup}
        >
          SignUp
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already Have Account? <Link href={"/login"} className="text-blue-600 hover:underline cursor-pointer">Login</Link>
        </p>
      </div>
    </div>

  );
}
