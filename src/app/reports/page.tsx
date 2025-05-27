'use client'; // If we add interactive charts or filters later

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  DollarSign,
  Briefcase,
  TrendingUp,
  FileWarning,
  Filter,
  Calendar,
  Search
} from 'lucide-react';
import dynamic from 'next/dynamic';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const MetaAdsSection = dynamic(() => import('./meta-ads-section'), {
  loading: () => <SkeletonLoader variant="card" />
});

const ReportSection = ({ 
  title, 
  icon: Icon, 
  children,
  onClick,
  delay = 0
}: { 
  title: string, 
  icon?: React.ElementType, 
  children: React.ReactNode,
  onClick?: () => void,
  delay?: number 
}) => (
  <div 
    className='bg-white rounded-lg shadow-sm border border-gray-200 card-hover cursor-pointer group fade-in'
    style={{ animationDelay: `${delay}s` }}
    onClick={onClick}
  >
    <div className="p-6 border-b border-gray-200">
      <h2 className='text-xl font-semibold text-gray-800 flex items-center group-hover:text-[#1877F2] transition-colors duration-200'>
        {Icon && <Icon size={22} className="mr-2 text-[#1877F2] group-hover:scale-110 transition-transform duration-200" />} {title}
      </h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });
  const [selectedClient, setSelectedClient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterApply = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Applying filters:', { dateRange, selectedClient });
      // TODO: Implement actual filter logic
    } catch (error) {
      console.error('Failed to apply filters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportClick = (reportType: string) => {
    console.log('View detailed report:', reportType);
    // TODO: Implement navigation to detailed report view
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className='flex justify-between items-center mb-6 fade-in'>
        <h1 className='text-3xl font-bold text-gray-900 flex items-center'>
          <BarChart3 className='mr-3 h-8 w-8 text-[#1877F2]' /> Reports
        </h1>
      </div>

      {/* Global Filters for Reports */}
      <div className='mb-8 bg-white rounded-lg shadow-sm border border-gray-200 fade-in' style={{ animationDelay: '0.1s' }}>
        <div className="p-4 border-b border-gray-200">
          <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
            <Filter size={18} className="mr-2 text-[#1877F2]"/> Global Report Filters
          </h3>
        </div>
        <div className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-end'>
            <div className="md:col-span-2 xl:col-span-1">
              <label htmlFor='report-date-from' className='block text-sm font-medium text-gray-700 mb-2'>From Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type='date' 
                  id='report-date-from' 
                  name='report-date-from' 
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className='default-input pl-10' 
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </div>
            <div className="md:col-span-2 xl:col-span-1">
              <label htmlFor='report-date-to' className='block text-sm font-medium text-gray-700 mb-2'>To Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type='date' 
                  id='report-date-to' 
                  name='report-date-to' 
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className='default-input pl-10' 
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </div>
            <div>
              <label htmlFor='report-client-filter' className='block text-sm font-medium text-gray-700 mb-2'>Client (Optional)</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select 
                  id='report-client-filter' 
                  name='report-client-filter'
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className='default-select pl-10 pr-8 appearance-none bg-white'
                >
                  <option value="">All Clients</option>
                  <option value="client1">John Smith</option>
                  <option value="client2">Sarah Johnson</option>
                  <option value="client3">Mike Davis</option>
                  <option value="client4">Lisa Wilson</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <button 
                onClick={handleFilterApply}
                disabled={isLoading}
                className='w-full btn-primary flex items-center justify-center'
              >
                {isLoading ? (
                  <>
                    <span className="spinner mr-2" />
                    Applying...
                  </>
                ) : (
                  'Apply Filters'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Sections Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {isPageLoading ? (
          <>
            <SkeletonLoader variant="card" />
            <SkeletonLoader variant="card" />
            <SkeletonLoader variant="card" />
            <SkeletonLoader variant="card" />
            <SkeletonLoader variant="card" />
          </>
        ) : (
          <>
            <MetaAdsSection />

            <ReportSection 
              title="Revenue Report" 
              icon={DollarSign}
              onClick={() => handleReportClick('revenue')}
              delay={0.2}
            >
              <p className='text-gray-600 text-sm mb-4'>Chart and data table showing revenue by period (e.g., monthly, quarterly) and by client.</p>
              <div className='h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1877F2] transition-all duration-200 group-hover:bg-gray-100'>
                Revenue Chart Placeholder
              </div>
            </ReportSection>

            <ReportSection 
              title="Job Completion Report" 
              icon={Briefcase}
              onClick={() => handleReportClick('jobs')}
              delay={0.25}
            >
              <p className='text-gray-600 text-sm mb-4'>Metrics on jobs completed, average time to completion, etc.</p>
              <div className='h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1877F2] transition-all duration-200 group-hover:bg-gray-100'>
                Job Completion Chart/Stats Placeholder
              </div>
            </ReportSection>

            <ReportSection 
              title="Lead Conversion Report" 
              icon={TrendingUp}
              onClick={() => handleReportClick('leads')}
              delay={0.3}
            >
              <p className='text-gray-600 text-sm mb-4'>Track lead sources and conversion rates (e.g., leads to quotes, quotes to jobs).</p>
              <div className='h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1877F2] transition-all duration-200 group-hover:bg-gray-100'>
                Lead Conversion Funnel/Chart Placeholder
              </div>
            </ReportSection>

            <ReportSection 
              title="Invoice Aging Report" 
              icon={FileWarning}
              onClick={() => handleReportClick('invoices')}
              delay={0.35}
            >
              <p className='text-gray-600 text-sm mb-4'>Breakdown of unpaid invoices by age (e.g., 0-30 days, 31-60 days, 60+ days).</p>
              <div className='h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1877F2] transition-all duration-200 group-hover:bg-gray-100'>
                Invoice Aging Chart/Table Placeholder
              </div>
            </ReportSection>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage; 