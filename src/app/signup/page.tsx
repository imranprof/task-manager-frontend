'use client';

import { useState } from 'react';
import { useAuthStore } from '../../store/useStore';
import axios from '../../api/axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z
    .string()
    .trim()
    .nonempty('Email is required')
    .email({ message: 'Please enter a valid email address' }),
  username: z
    .string()
    .trim()
    .nonempty('Username is required')
    .min(3, { message: 'Username must be at least 3 characters' }),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type SignupFormData = z.infer<typeof schema>;

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
  });

  // const setToken = useAuthStore((state) => state.setToken);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data: SignupFormData) => {
    setServerError('');
    setSuccessMessage('');
    try {
      const res = await axios.post('/auth/signup', data);
      setSuccessMessage('Signup successful! You can now login with your email and password.');
      reset();
    } catch (err) {
      setServerError('Signup failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>

        <div className="space-y-4">
          <div>
            <input
              {...register('email')}
              className={`w-full text-black placeholder-gray-400 p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('username')}
              className={`w-full text-black placeholder-gray-400 p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              className={`w-full text-black placeholder-gray-400 p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {serverError && <p className="text-red-500 text-sm text-center mt-2">{serverError}</p>}
          {successMessage && <p className="text-green-500 text-sm text-center mt-2">{successMessage}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-6 font-semibold py-3 rounded-lg shadow-md transition ${isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
