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
  Bot,
  MessageSquare,
  Phone,
  Mail,
  Sparkles,
  LucideIcon,
  Menu,
} from 'lucide-react';

interface SubNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/leads', label: 'Leads', icon: Lightbulb },
  { href: '/quotes', label: 'Quotes', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: Receipt },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  {
    href: '/ai-power',
    label: 'AI Power',
    icon: Sparkles,
    subItems: [
      { href: '/ai-power/voice', label: 'Voice Agent', icon: Phone },
      { href: '/ai-power/sms', label: 'SMS Agent', icon: MessageSquare },
      { href: '/ai-power/email', label: 'Email Agent', icon: Mail },
      { href: '/ai-power/chat', label: 'Chat Assistant', icon: Bot },
    ],
  },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle submenu regardless of collapsed state
  const handleToggleSection = (href: string) => {
    setExpandedSection((prev) => (prev === href ? null : href));
  };

  // Sidebar content as a function for reuse
  const sidebarContent = (
    <nav className='flex-grow mt-4'>
      <ul>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const IconComponent = item.icon;
          const hasSubItems = 'subItems' in item && item.subItems !== undefined;
          const isExpanded = expandedSection === item.href;

          return (
            <li key={item.label} className='mb-2'>
              <div className='flex flex-col'>
                {hasSubItems ? (
                  <button
                    type='button'
                    onClick={() => handleToggleSection(item.href)}
                    className={`flex items-center py-2 px-3 rounded-md transition-colors w-full relative cursor-pointer
                      ${isActive ? 'bg-[#E8F0FE] border-l-4 border-[#1877F2] text-[#1877F2] font-semibold shadow-sm' : 'text-gray-700'}
                      ${isCollapsed ? 'justify-center' : ''}
                      hover:bg-primary/10 hover:text-primary-dark
                      focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:z-10`
                    }
                    tabIndex={0}
                    aria-current={isActive ? 'page' : undefined}
                    aria-expanded={isExpanded}
                    aria-controls={`submenu-${item.label}`}
                  >
                    <IconComponent className={`mr-3 h-5 w-5 ${isCollapsed ? 'mr-0' : ''}`} />
                    {!isCollapsed && (
                      <>
                        <span className='flex-grow text-left'>{item.label}</span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center py-2 px-3 rounded-md transition-colors w-full relative cursor-pointer
                      ${isActive ? 'bg-[#E8F0FE] border-l-4 border-[#1877F2] text-[#1877F2] font-semibold shadow-sm' : 'text-gray-700'}
                      ${isCollapsed ? 'justify-center' : ''}
                      hover:bg-primary/10 hover:text-primary-dark
                      focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:z-10`
                    }
                    tabIndex={0}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <IconComponent className={`mr-3 h-5 w-5 ${isCollapsed ? 'mr-0' : ''}`} />
                    {!isCollapsed && <span className='flex-grow text-left'>{item.label}</span>}
                  </Link>
                )}

                {hasSubItems && isExpanded && item.subItems && (
                  <div id={`submenu-${item.label}`} className='ml-6 mt-1 space-y-1'>
                    {item.subItems.map((subItem) => {
                      const SubIconComponent = subItem.icon;
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className={`flex items-center py-2 px-3 rounded-md transition-colors
                            ${isSubActive ? 'bg-[#E8F0FE] border-l-4 border-[#1877F2] text-[#1877F2] font-semibold shadow-sm' : 'text-gray-700'}
                            hover:bg-primary/10 hover:text-primary-dark
                            focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:z-10 cursor-pointer`
                          }
                          tabIndex={0}
                          aria-current={isSubActive ? 'page' : undefined}
                        >
                          <SubIconComponent className='mr-3 h-4 w-4' />
                          <span>{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className='md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-[#1877F2]'
        onClick={() => setMobileOpen(true)}
        aria-label='Open sidebar'
      >
        <Menu className='h-6 w-6 text-gray-700' />
      </button>

      {/* Sidebar for desktop */}
      <aside
        className={`bg-gray-100 text-gray-800 p-4 hidden md:flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'}`}
      >
        {sidebarContent}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='mt-auto p-2 rounded-md hover:bg-gray-200 self-center focus:outline-none focus:ring-2 focus:ring-primary'
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className='h-6 w-6 text-gray-600' /> : <ChevronLeft className='h-6 w-6 text-gray-600' />}
        </button>
      </aside>

      {/* Sidebar for mobile overlay */}
      {mobileOpen && (
        <div className='fixed inset-0 z-50 flex'>
          {/* Backdrop */}
          <div
            className='fixed inset-0 bg-black/30 backdrop-blur-sm'
            onClick={() => setMobileOpen(false)}
            aria-label='Close sidebar backdrop'
          />
          <aside className='relative bg-gray-100 text-gray-800 p-4 w-64 flex flex-col h-full shadow-lg z-50 animate-slide-in-left'>
            <button
              className='absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]'
              onClick={() => setMobileOpen(false)}
              aria-label='Close sidebar'
            >
              <ChevronLeft className='h-6 w-6 text-gray-600' />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar; 