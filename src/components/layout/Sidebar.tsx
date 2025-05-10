'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Lightbulb,
  FileText,
  Receipt,
  CalendarDays,
  BarChart3,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/leads', label: 'Leads', icon: Lightbulb },
  { href: '/quotes', label: 'Quotes', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: Receipt },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-100 text-gray-800 p-4 hidden md:flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      <nav className='flex-grow mt-4'>
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const IconComponent = item.icon;
            return (
              <li key={item.label} className='mb-2'>
                <Link
                  href={item.href}
                  className={`flex items-center py-2 px-3 rounded-md hover:bg-primary/10 hover:text-primary-dark transition-colors ${isActive ? 'bg-primary/20 text-primary-dark font-semibold' : 'text-gray-700'} ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <IconComponent className={`mr-3 h-5 w-5 ${isCollapsed ? 'mr-0' : ''}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className='mt-auto p-2 rounded-md hover:bg-gray-200 self-center focus:outline-none focus:ring-2 focus:ring-primary'
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight className='h-6 w-6 text-gray-600' /> : <ChevronLeft className='h-6 w-6 text-gray-600' />}
      </button>
    </aside>
  );
};

export default Sidebar; 