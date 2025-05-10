'use client';

import React from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Briefcase,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';

// Mock data for jobs - replace with API data later
const mockJobs = [
  {
    id: 'J001',
    clientName: 'John Doe',
    clientId: '1',
    serviceAddress: '123 Main St, New York, NY',
    description: 'Install new ceiling fan in living room.',
    status: 'Scheduled',
    priority: 'Medium',
    scheduledDate: '2024-05-15',
    scheduledTime: '09:00 AM',
    assignedTechnicians: ['Mike L.'],
  },
  {
    id: 'J002',
    clientName: 'Jane Smith',
    clientId: '2',
    serviceAddress: '456 Oak Ave, Los Angeles, CA',
    description: 'Repair faulty wiring in kitchen.',
    status: 'In Progress',
    priority: 'High',
    scheduledDate: '2024-05-12',
    scheduledTime: '02:00 PM',
    assignedTechnicians: ['Sarah B.', 'Tom H.'],
  },
  {
    id: 'J003',
    clientName: 'Alice Brown',
    clientId: '3',
    serviceAddress: '789 Pine Ln, Chicago, IL',
    description: 'Annual electrical safety inspection.',
    status: 'Completed',
    priority: 'Low',
    scheduledDate: '2024-05-10',
    scheduledTime: '11:00 AM',
    assignedTechnicians: ['Chris P.'],
  },
  {
    id: 'J004',
    clientName: 'Robert Green',
    clientId: '4',
    serviceAddress: '101 Maple Dr, Houston, TX',
    description: 'New circuit breaker installation.',
    status: 'Needs Invoicing',
    priority: 'Medium',
    scheduledDate: '2024-05-08',
    scheduledTime: '01:30 PM',
    assignedTechnicians: ['David K.'],
  },
];

const jobStatusColors: { [key: string]: string } = {
  Scheduled: 'bg-blue-100 text-blue-700',
  Dispatched: 'bg-teal-100 text-teal-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'On Hold': 'bg-gray-100 text-gray-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
  'Needs Invoicing': 'bg-purple-100 text-purple-700',
};

const jobPriorityColors: { [key: string]: string } = {
    Low: 'border-green-500 text-green-600',
    Medium: 'border-yellow-500 text-yellow-600',
    High: 'border-red-500 text-red-600',
  };

const JobsPage = () => {
  // Placeholder for search, filter states
  const filteredJobs = mockJobs; // Using all jobs for now

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <Briefcase className='mr-3 h-8 w-8 text-primary' /> Jobs / Work Orders
        </h1>
        <Link href='/jobs/new' className='btn-primary'>
          <PlusCircle size={20} className='mr-2' /> Create New Job
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className='mb-6 p-4 bg-white rounded-lg shadow'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end'>
          {/* Search by keyword */}
          <div className='lg:col-span-2'>
            <label htmlFor='search-jobs' className='block text-sm font-medium text-gray-700 mb-1'>
              Search Jobs (ID, Client, Address)
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='search'
                name='search-jobs'
                id='search-jobs'
                className='default-input pl-10' // Using a potential global class for inputs
                placeholder='Enter Job ID, Client Name, Address...'
              />
            </div>
          </div>

          {/* Filter by Status */}
          <div>
            <label htmlFor='filter-job-status' className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
            <select id='filter-job-status' name='filter-job-status' className='default-select'>
              <option value="">All Statuses</option>
              {Object.keys(jobStatusColors).map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>

          {/* Filter by Technician (placeholder) */}
          <div>
            <label htmlFor='filter-technician' className='block text-sm font-medium text-gray-700 mb-1'>Technician</label>
            <select id='filter-technician' name='filter-technician' className='default-select'>
              <option value="">All Technicians</option>
              <option value="mike_l">Mike L.</option>
              <option value="sarah_b">Sarah B.</option>
              {/* Populate with actual technicians later */}
            </select>
          </div>

          {/* More filters can be added: Date Range, Client, Priority etc. */}
          {/* <button className='btn-secondary flex items-center'><ListFilter size={18} className='mr-2'/> More Filters</button> */}
        </div>
      </div>

      {/* Jobs Table - Plan mentions Table or Kanban. Starting with Table. */}
      <div className='bg-white shadow rounded-lg overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {['Job ID', 'Client', 'Address', 'Status', 'Priority', 'Scheduled', 'Technician(s)', 'Actions'].map(header => (
                <th key={header} scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:underline'>
                    <Link href={`/jobs/${job.id}`}>{job.id}</Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    <Link href={`/clients/${job.clientId}`} className='hover:underline'>{job.clientName}</Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs' title={job.serviceAddress}>{job.serviceAddress}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobStatusColors[job.status] || 'bg-gray-100 text-gray-800'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-md border ${jobPriorityColors[job.priority] || 'border-gray-300 text-gray-600'}`}>
                        {job.priority}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{job.scheduledDate} {job.scheduledTime}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{job.assignedTechnicians.join(', ')}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center'>
                    <Link href={`/jobs/${job.id}`} className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10' title='View Job'>
                      <Eye size={18} />
                    </Link>
                    <Link href={`/jobs/${job.id}/edit`} className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50' title='Edit Job'>
                      <Edit3 size={18} />
                    </Link>
                    <button className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50' title='Delete Job'>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className='px-6 py-12 text-center text-sm text-gray-500'>
                  No jobs found. Start by creating a new job.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add Kanban board view toggle here in the future */}
      {/* Add Pagination here */}
    </div>
  );
};

export default JobsPage; 