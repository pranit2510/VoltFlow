'use client'; // If we add interactive charts or filters later

import React from 'react';
import {
  BarChart3,
  DollarSign,
  Briefcase,
  TrendingUp,
  FileWarning,
  Filter
} from 'lucide-react';

// Placeholder for a generic report widget/card structure
const ReportSection = ({ title, icon: Icon, children }: { title: string, icon?: React.ElementType, children: React.ReactNode }) => (
  <div className='bg-white p-6 rounded-lg shadow'>
    <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
      {Icon && <Icon size={22} className="mr-2 text-primary" />} {title}
    </h2>
    <div>{children}</div>
  </div>
);

const ReportsPage = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <BarChart3 className='mr-3 h-8 w-8 text-primary' /> Reports
        </h1>
        {/* Placeholder for global report actions like Export All */}
      </div>

      {/* Global Filters for Reports */}
      <div className='mb-8 p-4 bg-white rounded-lg shadow'>
        <h3 className='text-lg font-semibold text-gray-700 mb-3 flex items-center'>
            <Filter size={18} className="mr-2"/> Global Report Filters
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end'>
          <div>
            <label htmlFor='report-date-range' className='form-label'>Date Range</label>
            <input type='date' id='report-date-from' name='report-date-from' className='default-input mr-2' />
            <span className='mx-1 text-gray-500'>to</span>
            <input type='date' id='report-date-to' name='report-date-to' className='default-input ml-2' />
          </div>
          {/* Add other global filters if needed, e.g., by Client, Technician for relevant reports */}
          <div>
            <label htmlFor='report-client-filter' className='form-label'>Client (Optional)</label>
            <select id='report-client-filter' name='report-client-filter' className='default-select'>
                <option value="">All Clients</option>
                {/* Populate with clients later */}
            </select>
          </div>
          <div className='flex items-end'>
            <button className='btn-primary'>Apply Filters</button>
          </div>
        </div>
      </div>

      {/* Report Sections Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ReportSection title="Revenue Report" icon={DollarSign}>
          <p className='text-gray-600 text-sm'>Chart and data table showing revenue by period (e.g., monthly, quarterly) and by client.</p>
          <div className='mt-4 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400'>Revenue Chart Placeholder</div>
        </ReportSection>

        <ReportSection title="Job Completion Report" icon={Briefcase}>
          <p className='text-gray-600 text-sm'>Metrics on jobs completed, average time to completion, etc.</p>
          <div className='mt-4 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400'>Job Completion Chart/Stats Placeholder</div>
        </ReportSection>

        <ReportSection title="Lead Conversion Report" icon={TrendingUp}>
          <p className='text-gray-600 text-sm'>Track lead sources and conversion rates (e.g., leads to quotes, quotes to jobs).</p>
          <div className='mt-4 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400'>Lead Conversion Funnel/Chart Placeholder</div>
        </ReportSection>

        <ReportSection title="Invoice Aging Report" icon={FileWarning}>
          <p className='text-gray-600 text-sm'>Breakdown of unpaid invoices by age (e.g., 0-30 days, 31-60 days, 60+ days).</p>
          <div className='mt-4 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400'>Invoice Aging Chart/Table Placeholder</div>
        </ReportSection>
        
        {/* Add more report sections as needed */}
      </div>
    </div>
  );
};

export default ReportsPage; 