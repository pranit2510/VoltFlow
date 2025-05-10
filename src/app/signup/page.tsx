'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, KeyRound, Zap, Building2, User as UserIcon } from 'lucide-react';

const SignupPage = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }

    setIsLoading(true);
    // Mock API call for signup
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // In a real app, you'd handle user creation and company setup
    console.log('Signing up with:', { companyName, userName, email, password });
    alert('Signup successful! Please login to continue.');
    setIsLoading(false);
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-light py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 p-8 sm:p-10 bg-white shadow-xl rounded-xl'>
        <div>
            <div className='flex justify-center text-primary mb-3'>
                <Zap size={48} />
            </div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-dark'>
                Create your VoltFlow CRM account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
                Or{' '}
                <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
                sign in if you already have an account
                </Link>
            </p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className='rounded-md shadow-sm space-y-3'> {/* Adjusted for multiple separate inputs */}
            <div>
              <label htmlFor='company-name' className='sr-only'>Company Name</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Building2 className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='company-name' name='companyName' type='text' autoComplete='organization' required
                  className='default-input pl-10' placeholder='Company Name'
                  value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor='user-name' className='sr-only'>Your Name</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <UserIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='user-name' name='userName' type='text' autoComplete='name' required
                  className='default-input pl-10' placeholder='Your Name'
                  value={userName} onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>Email address</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='email-address' name='email' type='email' autoComplete='email' required
                  className='default-input pl-10' placeholder='Email address'
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <KeyRound className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='password' name='password' type='password' autoComplete='new-password' required
                  className='default-input pl-10' placeholder='Password (min. 8 characters)'
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor='confirm-password' className='sr-only'>Confirm Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <KeyRound className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='confirm-password' name='confirmPassword' type='password' autoComplete='new-password' required
                  className='default-input pl-10' placeholder='Confirm Password'
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative w-full flex justify-center btn-primary disabled:opacity-75 mt-6'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <UserPlus className={`h-5 w-5 text-primary-dark group-hover:text-white ${isLoading ? 'text-gray-300' : 'text-blue-300'}`} aria-hidden='true' />
              </span>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage; 