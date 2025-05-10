import React from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Users,
  FileText as FileTextIcon, // Renamed for clarity
  Lightbulb as LightbulbIcon,
  Receipt as ReceiptIcon,
} from 'lucide-react';

// Import dashboard widgets
import TodaysScheduleWidget from '@/components/dashboard/TodaysScheduleWidget';
import SummaryCardWidget from '@/components/dashboard/SummaryCardWidget';
import MiniCalendarWidget from '@/components/dashboard/MiniCalendarWidget';
import RecentActivityWidget from '@/components/dashboard/RecentActivityWidget';

export default function DashboardPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold text-dark mb-6'>Dashboard</h1>

      {/* Quick Actions */}
      <div className='mb-8 flex flex-wrap gap-3'>
        <Link href='/jobs/new' className='btn-primary'>
          <PlusCircle size={20} className='mr-2' /> New Job
        </Link>
        <Link href='/clients/new' className='btn-secondary'>
          <Users size={20} className='mr-2' /> New Client
        </Link>
        <Link href='/quotes/new' className='btn-secondary'>
          <FileTextIcon size={20} className='mr-2' /> New Quote
        </Link>
      </div>

      {/* Main Dashboard Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {/* Today's Schedule Widget */}
        <div className='lg:col-span-2 xl:col-span-2'>
          <TodaysScheduleWidget />
        </div>

        {/* Summary Cards */}
        <SummaryCardWidget 
          title='Open Leads' 
          count={0} // Placeholder count
          linkText='View Leads' 
          linkHref='/leads' 
          icon={LightbulbIcon}
        />
        <SummaryCardWidget 
          title='Pending Quotes' 
          count={0} // Placeholder count
          linkText='View Quotes' 
          linkHref='/quotes'
          icon={FileTextIcon}
        />
        <SummaryCardWidget 
          title='Unpaid Invoices' 
          count={0} // Placeholder count
          linkText='View Invoices' 
          linkHref='/invoices'
          icon={ReceiptIcon}
        />
        
        <MiniCalendarWidget />
        
        <div className='md:col-span-2 lg:col-span-2 xl:col-span-2'>
          <RecentActivityWidget />
        </div>

      </div>
    </div>
  );
}

// Basic Button Styling (can be extracted to globals.css or a Button component later)
// For now, adding directly here for simplicity in page.tsx or globals.css
// If adding to globals.css, ensure it's done like:
// @layer components {
//   .btn-primary {
//     @apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary;
//   }
//   .btn-secondary {
//     @apply inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary;
//   }
// }
// Since we don't have a global place for these yet, and to make them work for this component:
// I will create these utility classes in globals.css to be used by these Link buttons.
