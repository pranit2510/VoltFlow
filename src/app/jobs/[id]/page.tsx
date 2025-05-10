'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Edit3,
  FileText as FileTextIcon, // For Generate Invoice & Link to Quote
  Briefcase,
  User,
  MapPin,
  CalendarDays,
  Users as UsersIcon,
  ClipboardList,
  Wrench,
  Camera,
  MessageSquare,
  DollarSign,
  Info
} from 'lucide-react';

// Re-defining mockJobs and color utils for simplicity in this component
// In a real app, this data would be fetched via API and utils might be shared
const mockJobs = [
  {
    id: 'J001',
    clientName: 'John Doe',
    clientId: '1',
    serviceAddress: '123 Main St, New York, NY 10001',
    jobDescription: 'Install new ceiling fan in the master bedroom and replace two faulty outlets in the kitchen.',
    status: 'Scheduled',
    priority: 'Medium',
    scheduledDate: '2024-05-15',
    scheduledTime: '09:00 AM',
    assignedTechnicians: ['Mike L.'],
    materialsUsed: [{ item: 'Ceiling Fan Model X', qty: 1, cost: 75.00 }, { item: 'Outlet GFCI', qty: 2, cost: 15.00 }],
    laborHours: 3,
    photos: [],
    internalNotes: 'Client has a small dog. Remember to bring a drop cloth.',
    quoteId: 'Q001',
  },
  {
    id: 'J002',
    clientName: 'Jane Smith',
    clientId: '2',
    serviceAddress: '456 Oak Ave, Los Angeles, CA 90001',
    jobDescription: 'Troubleshoot and repair faulty wiring in the main kitchen circuit. Check all connections.',
    status: 'In Progress',
    priority: 'High',
    scheduledDate: '2024-05-12',
    scheduledTime: '02:00 PM',
    assignedTechnicians: ['Sarah B.', 'Tom H.'],
    materialsUsed: [{ item: '12-gauge Wire (10ft)', qty: 1, cost: 10.00 }, { item: 'Wire Nuts (Assorted)', qty: 1, cost: 5.00 }],
    laborHours: 0, // In progress
    photos: ['before_wiring.jpg'],
    internalNotes: 'Possible rodent damage reported by client.',
    quoteId: null,
  },
  // Add more mock jobs if needed
];

const jobStatusOptions = ['Scheduled', 'Dispatched', 'In Progress', 'On Hold', 'Completed', 'Cancelled', 'Needs Invoicing'];
const mockTechnicians = ['Mike L.', 'Sarah B.', 'Tom H.', 'Chris P.', 'David K.']; // Example technicians

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
    Low: 'border-green-500 text-green-600 bg-green-50',
    Medium: 'border-yellow-500 text-yellow-600 bg-yellow-50',
    High: 'border-red-500 text-red-600 bg-red-50',
  };

const JobDetailPage = () => {
  const params = useParams();
  const jobId = params.id as string;

  const job = mockJobs.find(j => j.id === jobId);
  // State for editable fields like status or assigned technicians
  const [currentStatus, setCurrentStatus] = useState(job?.status || '');
  const [assignedTechs, setAssignedTechs] = useState(job?.assignedTechnicians || []);

  if (!job) {
    return (
      <div>
        <Link href="/jobs" className='inline-flex items-center text-primary hover:underline mb-4'>
          <ArrowLeft size={18} className="mr-2" /> Back to Jobs
        </Link>
        <p className='text-red-500 text-center text-xl'>Job not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6'>
        <Link href="/jobs" className='inline-flex items-center text-sm text-primary hover:underline mb-3'>
          <ArrowLeft size={16} className="mr-1.5" /> Back to Job List
        </Link>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-2'>
          <h1 className='text-3xl font-bold text-dark flex items-center'>
            <Briefcase className="mr-3 h-8 w-8 text-primary" /> Job #{job.id}
          </h1>
          <div className='flex space-x-3'>
            <Link href={`/jobs/${job.id}/edit`} className='btn-secondary'>
              <Edit3 size={18} className="mr-2" /> Edit Job
            </Link>
            <Link href={`/invoices/new?jobId=${job.id}`} className='btn-primary'>
              <DollarSign size={18} className="mr-2" /> Generate Invoice
            </Link>
          </div>
        </div>
        <p className='text-gray-600 mt-1'>For client: <Link href={`/clients/${job.clientId}`} className='text-primary-dark font-medium hover:underline'>{job.clientName}</Link></p>
      </div>

      {/* Main Job Details Layout - potentially two columns */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column (Main Details) */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Job Overview Section */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'><Info size={20} className="mr-2 text-primary"/>Job Overview</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm'>
              <div><strong>Client:</strong> <Link href={`/clients/${job.clientId}`} className='text-primary-dark hover:underline'>{job.clientName}</Link></div>
              <div><strong>Service Address:</strong> <span className='text-gray-700'>{job.serviceAddress}</span> <a href={`https://maps.google.com/?q=${encodeURIComponent(job.serviceAddress)}`} target="_blank" rel="noopener noreferrer" className='ml-1 text-primary text-xs hover:underline'>(Map)</a></div>
              <div>
                <strong>Status:</strong> 
                <select 
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)} 
                  className={`ml-2 p-1 text-xs rounded-md border ${jobStatusColors[currentStatus]?.replace('bg-', 'border-').replace('-100', '-300')} ${jobStatusColors[currentStatus]}`}>
                  {jobStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div><strong>Priority:</strong> <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${jobPriorityColors[job.priority] || 'border-gray-300 text-gray-600 bg-gray-50'}`}>{job.priority}</span></div>
            </div>
            <div className='mt-4'>
                <h4 className='text-sm font-medium text-gray-600 mb-1'>Description:</h4>
                <p className='text-sm text-gray-700 whitespace-pre-wrap'>{job.jobDescription}</p>
            </div>
            {job.quoteId && 
              <p className='text-sm mt-3'>Related Quote: <Link href={`/quotes/${job.quoteId}`} className='text-primary hover:underline'>#{job.quoteId}</Link></p>
            }
          </div>

          {/* Materials/Parts Used Section */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'><Wrench size={20} className="mr-2 text-primary"/>Materials/Parts Used</h2>
            {job.materialsUsed && job.materialsUsed.length > 0 ? (
              <ul className='text-sm space-y-2'>
                {job.materialsUsed.map((mat, idx) => (
                  <li key={idx} className='flex justify-between border-b pb-1 last:border-0 last:pb-0'>
                    <span>{mat.item} (Qty: {mat.qty})</span>
                    <span>${mat.cost.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : <p className='text-sm text-gray-500'>No materials logged yet.</p>}
            <button className='btn-secondary btn-sm mt-4'>Add Material/Part</button> {/* Placeholder for functionality */}
          </div>

          {/* Labor Section */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'><ClipboardList size={20} className="mr-2 text-primary"/>Labor / Time Tracking</h2>
            <p className='text-sm text-gray-500'>{job.laborHours > 0 ? `Total Hours: ${job.laborHours}` : 'No labor hours logged yet.'} </p>
            {/* Placeholder for time entries list and start/stop timer */}
            <button className='btn-secondary btn-sm mt-4'>Log Time</button>
          </div>
        </div>

        {/* Right Column (Scheduling, Photos, Notes) */}
        <div className='lg:col-span-1 space-y-6'>
          {/* Scheduling Section */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'><CalendarDays size={20} className="mr-2 text-primary"/>Scheduling</h2>
            <div className='text-sm space-y-2'>
              <p><strong>Date:</strong> {job.scheduledDate}</p>
              <p><strong>Time:</strong> {job.scheduledTime}</p>
              <div>
                <strong>Assigned Technician(s):</strong>
                {/* Placeholder for technician assignment dropdown/multi-select */}
                <select multiple value={assignedTechs} onChange={(e) => setAssignedTechs(Array.from(e.target.selectedOptions, option => option.value))} className='default-select w-full mt-1 text-xs h-20'>
                    {mockTechnicians.map(tech => <option key={tech} value={tech}>{tech}</option>)}
                </select>
                <p className='text-xs text-gray-500 mt-1'>{job.assignedTechnicians.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Photos/Attachments Section */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'><Camera size={20} className="mr-2 text-primary"/>Photos/Attachments</h2>
            {job.photos && job.photos.length > 0 ? (
              <div className='grid grid-cols-3 gap-2'>
                {job.photos.map((photo, idx) => <div key={idx} className='bg-gray-200 h-16 rounded text-xs flex items-center justify-center'>{photo}</div>)}
              </div>
            ) : <p className='text-sm text-gray-500'>No photos uploaded.</p>}
            <button className='btn-secondary btn-sm mt-4'>Upload Photo</button>
          </div>

          {/* Notes/Internal Comments Section */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'><MessageSquare size={20} className="mr-2 text-primary"/>Internal Notes</h2>
            <textarea 
                className='default-input w-full text-sm h-24' 
                defaultValue={job.internalNotes || ''}
                placeholder='Add internal notes here...'>
            </textarea>
            <button className='btn-secondary btn-sm mt-2'>Save Notes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage; 