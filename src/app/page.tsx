'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  PlusCircle,
  Users,
  FileText as FileTextIcon,
  Lightbulb as LightbulbIcon,
  Receipt as ReceiptIcon,
  Settings2,
  Lock,
  Unlock,
} from 'lucide-react';

// Dynamically import GridLayout to avoid SSR issues
const GridLayout = dynamic(() => import('react-grid-layout').then(mod => mod.default || mod), {
  ssr: false,
}) as any;

// Import dashboard widgets
import TodaysScheduleWidget from '@/components/dashboard/TodaysScheduleWidget';
import SummaryCardWidget from '@/components/dashboard/SummaryCardWidget';
import MiniCalendarWidget from '@/components/dashboard/MiniCalendarWidget';
import RecentActivityWidget from '@/components/dashboard/RecentActivityWidget';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// Import CSS for react-grid-layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Default layout configuration
const defaultLayout = [
  { i: 'schedule', x: 0, y: 0, w: 8, h: 6, minW: 4, minH: 4 },
  { i: 'activeJobs', x: 8, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
  { i: 'pendingQuotes', x: 8, y: 3, w: 4, h: 3, minW: 2, minH: 2 },
  { i: 'unpaidInvoices', x: 0, y: 6, w: 4, h: 3, minW: 2, minH: 2 },
  { i: 'totalClients', x: 4, y: 6, w: 4, h: 3, minW: 2, minH: 2 },
  { i: 'calendar', x: 8, y: 6, w: 4, h: 6, minW: 3, minH: 4 },
  { i: 'activity', x: 0, y: 9, w: 8, h: 6, minW: 4, minH: 4 },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState(defaultLayout);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved layout from localStorage
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Failed to load saved layout:', e);
      }
    }
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
    // Save to localStorage
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
  };

  const resetLayout = () => {
    setLayout(defaultLayout);
    localStorage.removeItem('dashboardLayout');
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const widgets = {
    schedule: (
      <div key="schedule" className="h-full">
        {isLoading ? (
          <SkeletonLoader variant="card" className="h-full" />
        ) : (
          <TodaysScheduleWidget />
        )}
      </div>
    ),
    activeJobs: (
      <div key="activeJobs" className="h-full">
        {isLoading ? (
          <SkeletonLoader variant="dashboard-card" />
        ) : (
          <SummaryCardWidget
            title="Active Jobs"
            count="12"
            linkText="View all jobs"
            linkHref="/jobs"
            icon={LightbulbIcon}
            iconColor="text-yellow-500"
          />
        )}
      </div>
    ),
    pendingQuotes: (
      <div key="pendingQuotes" className="h-full">
        {isLoading ? (
          <SkeletonLoader variant="dashboard-card" />
        ) : (
          <SummaryCardWidget
            title="Pending Quotes"
            count="5"
            linkText="View all quotes"
            linkHref="/quotes"
            icon={FileTextIcon}
            iconColor="text-blue-500"
          />
        )}
      </div>
    ),
    unpaidInvoices: (
      <div key="unpaidInvoices" className="h-full">
        {isLoading ? (
          <SkeletonLoader variant="dashboard-card" />
        ) : (
          <SummaryCardWidget
            title="Unpaid Invoices"
            count="8"
            linkText="View all invoices"
            linkHref="/invoices"
            icon={ReceiptIcon}
            iconColor="text-red-500"
          />
        )}
      </div>
    ),
    totalClients: (
      <div key="totalClients" className="h-full">
        {isLoading ? (
          <SkeletonLoader variant="dashboard-card" />
        ) : (
          <SummaryCardWidget
            title="Total Clients"
            count="45"
            linkText="View all clients"
            linkHref="/clients"
            icon={Users}
            iconColor="text-green-500"
          />
        )}
      </div>
    ),
    calendar: (
      <div key="calendar" className="h-full">
        {isLoading ? (
          <SkeletonLoader variant="card" className="h-full" />
        ) : (
          <MiniCalendarWidget />
        )}
      </div>
    ),
    activity: (
      <div key="activity" className="h-full">
        {isLoading ? (
          <SkeletonLoader variant="card" className="h-full" />
        ) : (
          <RecentActivityWidget />
        )}
      </div>
    ),
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-3xl font-bold text-dark'>Dashboard</h1>
        
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <Link href='/jobs/new' className='btn-primary group inline-flex items-center'>
            <PlusCircle size={20} className='mr-2 group-hover:rotate-90 transition-transform duration-300' /> 
            <span>New Job</span>
          </Link>
          <Link href='/clients/new' className='btn-secondary group inline-flex items-center'>
            <Users size={20} className='mr-2 group-hover:scale-110 transition-transform duration-300' /> 
            <span>New Client</span>
          </Link>
          <Link href='/quotes/new' className='btn-secondary group inline-flex items-center'>
            <FileTextIcon size={20} className='mr-2 group-hover:scale-110 transition-transform duration-300' /> 
            <span>New Quote</span>
          </Link>
          
          {/* Layout Controls */}
          <div className="ml-4 flex items-center gap-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isEditMode 
                  ? 'bg-primary text-white hover:bg-primary-dark' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={isEditMode ? 'Lock Layout' : 'Edit Layout'}
            >
              {isEditMode ? <Unlock size={20} /> : <Lock size={20} />}
            </button>
            {isEditMode && (
              <button
                onClick={resetLayout}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                title="Reset to Default Layout"
              >
                <Settings2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {isEditMode && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg fade-in">
          <p className="text-sm text-blue-800">
            <strong>Edit Mode:</strong> Drag and drop widgets to rearrange your dashboard. 
            Resize widgets by dragging their corners. Click the lock icon when done.
          </p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="dashboard-grid">
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={60}
          width={1200}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".drag-handle"
        >
          {layout.map((item) => (
            <div key={item.i} className={isEditMode ? 'grid-item-edit' : ''}>
              {isEditMode && (
                <div className="drag-handle absolute top-0 left-0 right-0 h-8 bg-gray-100 border-b border-gray-200 cursor-move flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              )}
              <div className={`h-full ${isEditMode ? 'pt-8' : ''}`}>
                {widgets[item.i as keyof typeof widgets]}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>

      <style jsx global>{`
        .react-grid-layout {
          position: relative;
        }
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top, width, height;
        }
        .react-grid-item.cssTransforms {
          transition-property: transform, width, height;
        }
        .react-grid-item.resizing {
          z-index: 1;
          will-change: width, height;
        }
        .react-grid-item.react-draggable-dragging {
          transition: none;
          z-index: 3;
          will-change: transform;
        }
        .react-grid-item.dropping {
          visibility: hidden;
        }
        .react-grid-item.react-grid-placeholder {
          background: #1877F2;
          opacity: 0.2;
          transition-duration: 100ms;
          z-index: 2;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }
        .react-grid-item.grid-item-edit {
          border: 2px dashed #1877F2;
          border-radius: 8px;
          overflow: hidden;
        }
        .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
          background-position: bottom right;
          background-repeat: no-repeat;
          background-origin: content-box;
          box-sizing: border-box;
          cursor: se-resize;
        }
      `}</style>
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
