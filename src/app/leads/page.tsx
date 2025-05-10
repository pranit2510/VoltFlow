'use client';

import React from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Lightbulb,
  Eye,
  Edit3,
  Trash2,
  Phone,
  Mail
} from 'lucide-react';

// Mock data for leads - replace with API data later
const mockLeads = [
  {
    id: 'L001',
    leadName: 'Sarah Connor',
    contactPhone: '555-0101',
    contactEmail: 's.connor@email.com',
    leadSource: 'Website Inquiry',
    estimatedJobValue: 1200,
    status: 'New',
    followUpDate: '2024-05-20',
    notes: 'Interested in new lighting fixtures for kitchen.',
    assignedTo: 'Admin'
  },
  {
    id: 'L002',
    leadName: 'Kyle Reese',
    contactPhone: '555-0202',
    contactEmail: 'k.reese@email.com',
    leadSource: 'Referral',
    estimatedJobValue: 750,
    status: 'Contacted',
    followUpDate: '2024-05-18',
    notes: 'Referred by John Doe. Needs panel upgrade.',
    assignedTo: 'Admin'
  },
  {
    id: 'L003',
    leadName: 'Miles Dyson',
    contactPhone: '555-0303',
    contactEmail: 'm.dyson@cyberdyne.com',
    leadSource: 'Cold Call',
    estimatedJobValue: 3500,
    status: 'Proposal Sent',
    followUpDate: '2024-05-22',
    notes: 'Large commercial rewiring project. Sent proposal.',
    assignedTo: 'Admin'
  },
  {
    id: 'L004',
    leadName: 'T-800 Home Services',
    contactPhone: '555-0800',
    contactEmail: 'contact@t800hs.com',
    leadSource: 'Trade Show',
    estimatedJobValue: 500,
    status: 'Closed-Won',
    followUpDate: null,
    notes: 'Converted to job J005.',
    assignedTo: 'Admin'
  },
];

const leadStatusOptions = ['New', 'Contacted', 'Proposal Sent', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'On Hold'];
const leadSourceOptions = ['Website Inquiry', 'Referral', 'Cold Call', 'Trade Show', 'Social Media', 'Advertisement', 'Other'];

const leadStatusColors: { [key: string]: string } = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-sky-100 text-sky-700',
  'Proposal Sent': 'bg-indigo-100 text-indigo-700',
  Negotiation: 'bg-yellow-100 text-yellow-700',
  'Closed-Won': 'bg-green-100 text-green-700',
  'Closed-Lost': 'bg-red-100 text-red-700',
  'On Hold': 'bg-gray-100 text-gray-700',
};

const LeadsPage = () => {
  const filteredLeads = mockLeads; // Placeholder for filtering

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <Lightbulb className='mr-3 h-8 w-8 text-primary' /> Lead Management
        </h1>
        <Link href='/leads/new' className='btn-primary'>
          <PlusCircle size={20} className='mr-2' /> Add New Lead
        </Link>
      </div>

      {/* Filters Bar */}
      <div className='mb-6 p-4 bg-white rounded-lg shadow'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end'>
          <div className='lg:col-span-2'>
            <label htmlFor='search-leads' className='block text-sm font-medium text-gray-700 mb-1'>Search Leads</label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='search'
                name='search-leads'
                id='search-leads'
                className='default-input pl-10'
                placeholder='Search by name, contact, notes...'
              />
            </div>
          </div>
          <div>
            <label htmlFor='filter-lead-status' className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
            <select id='filter-lead-status' name='filter-lead-status' className='default-select'>
              <option value="">All Statuses</option>
              {leadStatusOptions.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor='filter-lead-source' className='block text-sm font-medium text-gray-700 mb-1'>Source</label>
            <select id='filter-lead-source' name='filter-lead-source' className='default-select'>
              <option value="">All Sources</option>
              {leadSourceOptions.map(source => <option key={source} value={source}>{source}</option>)}
            </select>
          </div>
          {/* Add filter for assigned user if needed */}
        </div>
      </div>

      {/* Leads Table */}
      <div className='bg-white shadow rounded-lg overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Lead Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact Info</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Source</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Est. Value</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Follow-up</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Assigned To</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{lead.leadName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {lead.contactPhone && <div className='flex items-center text-xs'><Phone size={12} className="mr-1.5 text-gray-400"/> {lead.contactPhone}</div>}
                    {lead.contactEmail && <div className='flex items-center text-xs mt-1'><Mail size={12} className="mr-1.5 text-gray-400"/> {lead.contactEmail}</div>}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{lead.leadSource}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {lead.estimatedJobValue ? `$${lead.estimatedJobValue.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${leadStatusColors[lead.status] || 'bg-gray-100 text-gray-800'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{lead.followUpDate || 'N/A'}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{lead.assignedTo}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center'>
                    <Link href={`/leads/${lead.id}`} className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10' title='View Lead'>
                      <Eye size={18} />
                    </Link>
                    <Link href={`/leads/${lead.id}/edit`} className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50' title='Edit Lead'>
                      <Edit3 size={18} />
                    </Link>
                    <button className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50' title='Delete Lead'>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className='px-6 py-12 text-center text-sm text-gray-500'>
                  No leads found. Start by adding a new lead.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add Kanban board view toggle here in the future */}
    </div>
  );
};

export default LeadsPage; 