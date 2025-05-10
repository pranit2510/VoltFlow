'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  UserCircle as UserCircleIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  Zap,
} from 'lucide-react';

const Header = () => {
  // Placeholder state for user dropdown, can be expanded later
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Placeholder for mobile menu toggle function
  const toggleMobileMenu = () => {
    console.log('Mobile menu toggled'); // Actual implementation will involve shared state
  };

  return (
    <header className='bg-white text-dark shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4 h-16 flex justify-between items-center'>
        {/* Left side: Hamburger Menu (mobile) & App Name/Logo (optional) */}
        <div className='flex items-center'>
          <button
            onClick={toggleMobileMenu}
            className='md:hidden mr-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary'
            aria-label='Open navigation menu'
          >
            <MenuIcon className='h-6 w-6 text-gray-600' />
          </button>
          <Link href="/" className='flex items-center text-xl font-bold text-primary'>
            <Zap size={24} className="mr-2" />
            <span>VoltFlow CRM</span>
          </Link>
        </div>

        {/* Middle: Global Search Bar - simplified for now */}
        <div className='flex-1 max-w-xl px-4 hidden sm:block'> {/* Hide search on very small screens to avoid clutter */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='search'
              name='global-search'
              id='global-search'
              className='default-input pl-10'
              placeholder='Search clients, jobs...'
            />
          </div>
        </div>

        {/* Right side: Notifications & User Profile */}
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <button
            className='p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            aria-label='View notifications'
          >
            <BellIcon className='h-6 w-6 text-gray-600' />
            {/* Notification badge can be added here */}
          </button>

          <div className='relative'>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className='p-1 sm:p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              aria-label='User menu'
              aria-haspopup='true'
              aria-expanded={userDropdownOpen}
            >
              <UserCircleIcon className='h-7 w-7 text-gray-600' />
            </button>
            {/* Basic Dropdown - to be styled and improved */}
            {userDropdownOpen && (
              <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
                <Link
                  href='/settings'
                  className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <SettingsIcon className='mr-2 h-5 w-5' /> Account Settings
                </Link>
                <button
                  // onClick={handleLogout} // Placeholder for logout function
                  onClick={() => { alert('Logout (mock)'); setUserDropdownOpen(false); /* router.push('/login'); */ }}
                  className='w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  <LogOutIcon className='mr-2 h-5 w-5' /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 