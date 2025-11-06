'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../api/axios';
import { useAuthStore } from '../../store/useStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';


const schema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    try {
      const res = await axios.post('/auth/login', data);
      setToken(res.data.access_token);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setServerError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>

        <div className="space-y-4">
          <div>
            <input
              {...register('email')}
              className={`w-full text-black placeholder-gray-400 p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
                }`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              className={`w-full text-black placeholder-gray-400 p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.password
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
                }`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {serverError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {serverError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-6 font-semibold py-3 rounded-lg shadow-md transition ${isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
