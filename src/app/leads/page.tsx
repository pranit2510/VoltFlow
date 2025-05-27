'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Eye,
  Edit3,
  UserPlus,
  FileText as FileTextIcon,
  Lightbulb
} from 'lucide-react';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// Mock data for leads
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
    descriptionOfNeeds: 'Interested in new lighting fixtures for kitchen.',
    notes: 'Called on May 10th, seemed very interested.',
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
    descriptionOfNeeds: 'Needs panel upgrade for older house.',
    notes: 'Followed up via email on May 15th.',
    assignedTo: 'Admin'
  },
  // Add more mock leads as needed
];

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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Status counts for the sorting bar
  const statusCounts = {
    All: mockLeads.length,
    New: mockLeads.filter(lead => lead.status === 'New').length,
    Contacted: mockLeads.filter(lead => lead.status === 'Contacted').length,
    'Proposal Sent': mockLeads.filter(lead => lead.status === 'Proposal Sent').length,
    Negotiation: mockLeads.filter(lead => lead.status === 'Negotiation').length,
    'Closed-Won': mockLeads.filter(lead => lead.status === 'Closed-Won').length,
    'Closed-Lost': mockLeads.filter(lead => lead.status === 'Closed-Lost').length,
    'On Hold': mockLeads.filter(lead => lead.status === 'On Hold').length,
  };

  useEffect(() => {
    setMounted(true);
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = async (action: string, leadId: string) => {
    setActionLoading(`${action}-${leadId}`);
    // Simulate action processing
    await new Promise(resolve => setTimeout(resolve, 500));
    setActionLoading(null);
    // Handle the action
    console.log(`${action} for lead ${leadId}`);
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contactPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="fade-in">
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <Lightbulb className='mr-3 h-8 w-8 text-primary' /> Leads
        </h1>
        <Link href='/leads/new' className='btn-primary group inline-flex items-center'>
          <PlusCircle size={20} className='mr-2 group-hover:rotate-90 transition-transform duration-300' /> 
          <span>New Lead</span>
        </Link>
      </div>

      {/* Status Sorting Bar */}
      <div className='mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 fade-in' style={{ animationDelay: '0.05s' }}>
        <div className='flex flex-wrap gap-2'>
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                statusFilter === status
                  ? status === 'All'
                    ? 'bg-primary text-white shadow-sm hover:bg-primary-dark'
                    : `${leadStatusColors[status]} shadow-sm`
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{status}</span>
              <span className={`text-xs font-normal ${
                statusFilter === status && status === 'All'
                  ? 'text-white/80'
                  : ''
              }`}>
                ({count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className='mb-6 fade-in' style={{ animationDelay: '0.15s' }}>
        <div className='relative max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
          <input
            type='text'
            placeholder='Search leads by name, email, or phone...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='default-input pl-10 w-full'
          />
        </div>
      </div>

      {/* Leads Table */}
      {isLoading ? (
        <SkeletonLoader variant="table" />
      ) : (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden fade-in' style={{ animationDelay: '0.2s' }}>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Lead Name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Source</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Est. Value</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Follow-up</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className='px-6 py-4 text-center text-gray-500'>
                      No leads found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className='table-row-hover group'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200'>{lead.leadName}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>{lead.contactPhone}</div>
                        <div className='text-sm text-gray-500'>{lead.contactEmail}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{lead.leadSource}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>${lead.estimatedJobValue}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${leadStatusColors[lead.status] || 'bg-gray-100 text-gray-700'} transition-all duration-200 group-hover:scale-105`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{lead.followUpDate}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex space-x-2'>
                          <Link 
                            href={`/leads/${lead.id}`} 
                            className='text-primary hover:text-primary-dark transition-colors duration-200 p-1 hover:bg-blue-50 rounded'
                            title='View Lead'
                          >
                            <Eye size={18} />
                          </Link>
                          <Link 
                            href={`/leads/${lead.id}/edit`} 
                            className='text-gray-600 hover:text-gray-900 transition-colors duration-200 p-1 hover:bg-gray-100 rounded'
                            title='Edit Lead'
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button 
                            onClick={() => handleAction('convert', lead.id)}
                            disabled={actionLoading === `convert-${lead.id}`}
                            className='text-green-600 hover:text-green-900 transition-colors duration-200 p-1 hover:bg-green-50 rounded disabled:opacity-50'
                            title='Convert to Client'
                          >
                            {actionLoading === `convert-${lead.id}` ? (
                              <span className="spinner" />
                            ) : (
                              <UserPlus size={18} />
                            )}
                          </button>
                          <Link 
                            href={`/quotes/new?leadId=${lead.id}`} 
                            className='text-blue-600 hover:text-blue-900 transition-colors duration-200 p-1 hover:bg-blue-50 rounded'
                            title='Create Quote'
                          >
                            <FileTextIcon size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage; 