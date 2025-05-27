'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, KeyRound, Zap } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock API call for login
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    if (email === 'user@example.com' && password === 'password123') {
      // In a real app, you'd get a token, set session, etc.
      router.push('/'); // Redirect to dashboard
    } else {
      setError('Invalid email or password. Please try again.');
      // Add shake animation to form
      const form = document.getElementById('login-form');
      form?.classList.add('animate-shake');
      setTimeout(() => form?.classList.remove('animate-shake'), 500);
    }
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 fade-in'>
        <div>
          <div className='flex justify-center'>
            <div className='bg-primary rounded-full p-3 group hover:scale-110 transition-transform duration-300'>
              <Zap className='h-12 w-12 text-white group-hover:rotate-12 transition-transform duration-300' />
            </div>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to VoltFlow CRM
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link href='#' className='font-medium text-primary hover:text-primary-dark transition-colors duration-200'>
              contact support for assistance
            </Link>
          </p>
        </div>
        <form id="login-form" className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all duration-200'
                  placeholder='Email address'
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <KeyRound className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all duration-200'
                  placeholder='Password'
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200'
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className='rounded-md bg-red-50 p-4 fade-in'>
              <div className='flex'>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800'>{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-all duration-200" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className='text-sm'>
              <Link href="#" className="font-medium text-primary hover:text-primary-dark transition-colors duration-200">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative w-full flex justify-center btn-primary'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <LogIn className={`h-5 w-5 ${isLoading ? 'text-gray-300' : 'text-blue-300 group-hover:text-white'} transition-colors duration-200`} aria-hidden='true' />
              </span>
              {isLoading ? (
                <>
                  <span className="spinner mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className='text-center text-sm text-gray-600'>
          Demo credentials: <span className='font-mono bg-gray-100 px-2 py-1 rounded'>user@example.com</span> / <span className='font-mono bg-gray-100 px-2 py-1 rounded'>password123</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 