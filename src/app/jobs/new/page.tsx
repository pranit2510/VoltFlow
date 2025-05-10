'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, PlusCircle, Briefcase, Save, User, CalendarDays } from 'lucide-react';

// Mock client data for dropdown
const mockClients = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  // ... add more or fetch dynamically
];

const mockTechnicians = ['Mike L.', 'Sarah B.', 'Chris P.'];

const CreateJobPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientIdFromQuery = searchParams.get('clientId');

  // Form state
  const [clientId, setClientId] = useState(clientIdFromQuery || '');
  const [description, setDescription] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [assignedTechnicians, setAssignedTechnicians] = useState<string[]>([]);
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock save logic
    console.log('Saving new job:', { clientId, description, serviceAddress, scheduledDate, scheduledTime, assignedTechnicians, priority });
    alert('New job created (mock)!');
    router.push('/jobs');
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <PlusCircle className='mr-3 h-8 w-8 text-primary' /> Create New Job
        </h1>
        <Link href="/jobs" className='btn-secondary btn-sm'>
          <ArrowLeft size={16} className="mr-1.5" /> Back to Job List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className='bg-white p-6 sm:p-8 rounded-lg shadow space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='clientId' className='form-label flex items-center'><User size={14} className="mr-1.5 text-gray-400"/>Client</label>
            <select id='clientId' value={clientId} onChange={(e) => setClientId(e.target.value)} className='default-select' required>
              <option value="" disabled>Select a client</option>
              {mockClients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='priority' className='form-label'>Priority</label>
            <select id='priority' value={priority} onChange={(e) => setPriority(e.target.value)} className='default-select'>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor='serviceAddress' className='form-label'>Service Address</label>
          <input type='text' id='serviceAddress' value={serviceAddress} onChange={(e) => setServiceAddress(e.target.value)} className='default-input' required />
        </div>
        
        <div>
          <label htmlFor='description' className='form-label'>Job Description</label>
          <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className='default-textarea' required></textarea>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='scheduledDate' className='form-label flex items-center'><CalendarDays size={14} className="mr-1.5 text-gray-400"/>Scheduled Date</label>
            <input type='date' id='scheduledDate' value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className='default-input' />
          </div>
          <div>
            <label htmlFor='scheduledTime' className='form-label'>Scheduled Time</label>
            <input type='time' id='scheduledTime' value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className='default-input' />
          </div>
        </div>

        <div>
            <label htmlFor='assignedTechnicians' className='form-label'>Assign Technician(s)</label>
            <select 
                multiple 
                id='assignedTechnicians' 
                value={assignedTechnicians}
                onChange={(e) => setAssignedTechnicians(Array.from(e.target.selectedOptions, option => option.value))}
                className='default-select h-24'
            >
                {mockTechnicians.map(tech => <option key={tech} value={tech}>{tech}</option>)}
            </select>
            <p className='text-xs text-gray-500 mt-1'>Hold Ctrl/Cmd to select multiple.</p>
        </div>
        
        <div className='pt-4 border-t flex justify-end'>
            <button type="submit" className='btn-primary'>
                <Save size={18} className="mr-2" /> Create Job
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPage; 