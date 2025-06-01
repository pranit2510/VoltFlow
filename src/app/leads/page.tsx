'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Eye,
  Edit3,
  Lightbulb
} from 'lucide-react';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import StatusBadge from '@/components/ui/StatusBadge';
import FlowActions from '@/components/ui/FlowActions';
import { leadStages, type LeadStatus } from '@/lib/flowStates';

// Mock data for leads - enhanced with proper flow statuses
const mockLeads = [
  {
    id: 'L001',
    leadName: 'Sarah Connor',
    contactPhone: '555-0101',
    contactEmail: 's.connor@email.com',
    leadSource: 'Website Inquiry',
    estimatedJobValue: 1200,
    status: 'Qualified' as LeadStatus,
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
    status: 'Contacted' as LeadStatus,
    followUpDate: '2024-05-18',
    descriptionOfNeeds: 'Needs panel upgrade for older house.',
    notes: 'Followed up via email on May 15th.',
    assignedTo: 'Admin'
  },
  {
    id: 'L003',
    leadName: 'John Matrix',
    contactPhone: '555-0303',
    contactEmail: 'j.matrix@email.com',
    leadSource: 'Google Ads',
    estimatedJobValue: 2500,
    status: 'Proposal Sent' as LeadStatus,
    followUpDate: '2024-05-22',
    descriptionOfNeeds: 'Complete home rewiring project.',
    notes: 'Sent detailed proposal on May 15th.',
    assignedTo: 'Admin'
  },
  {
    id: 'L004',
    leadName: 'Dutch Schaefer',
    contactPhone: '555-0404',
    contactEmail: 'd.schaefer@email.com',
    leadSource: 'Referral',
    estimatedJobValue: 500,
    status: 'New' as LeadStatus,
    followUpDate: '2024-05-25',
    descriptionOfNeeds: 'Outlet installation in garage.',
    notes: 'Initial inquiry received today.',
    assignedTo: 'Admin'
  }
];

const LeadsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Status counts for the sorting bar - using flow states
  const statusCounts = {
    All: mockLeads.length,
    ...Object.keys(leadStages).reduce((acc, status) => {
      acc[status] = mockLeads.filter(lead => lead.status === status).length;
      return acc;
    }, {} as Record<string, number>)
  };

  useEffect(() => {
    setMounted(true);
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleFlowAction = async (action: string, leadId: string) => {
    setActionLoading(`${action}-${leadId}`);
    // Simulate action processing
    await new Promise(resolve => setTimeout(resolve, 500));
    setActionLoading(null);
    
    // Handle specific actions
    switch (action) {
      case 'convertToClient':
        console.log(`Converting lead ${leadId} to client`);
        // In real app, this would make API call and redirect
        break;
      default:
        console.log(`${action} for lead ${leadId}`);
    }
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

      {/* Enhanced Status Sorting Bar */}
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
                    : leadStages[status as LeadStatus]?.color || 'bg-gray-100 text-gray-700'
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

      {/* Enhanced Leads Table */}
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
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Next Actions</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className='px-6 py-4 text-center text-gray-500'>
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
                        <StatusBadge 
                          module="leads" 
                          status={lead.status}
                          showDescription={false}
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{lead.followUpDate}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <FlowActions
                          module="leads"
                          status={lead.status}
                          entityId={lead.id}
                          onAction={handleFlowAction}
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center'>
                        <Link href={`/leads/${lead.id}`} className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10 transition-all duration-200' title='View Lead'>
                          <Eye size={18} />
                        </Link>
                        <Link href={`/leads/${lead.id}/edit`} className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50 transition-all duration-200' title='Edit Lead'>
                          <Edit3 size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Flow Insights Panel */}
      <div className='mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 fade-in' style={{ animationDelay: '0.3s' }}>
        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
          <Lightbulb className='h-5 w-5 mr-2 text-blue-500' />
          Lead Flow Insights
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-green-600'>
              {mockLeads.filter(l => l.status === 'Qualified').length}
            </div>
            <div className='text-sm text-gray-600'>Ready for Conversion</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-yellow-600'>
              {mockLeads.filter(l => l.status === 'Proposal Sent').length}
            </div>
            <div className='text-sm text-gray-600'>Awaiting Response</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-blue-600'>
              {mockLeads.filter(l => l.status === 'New' || l.status === 'Contacted').length}
            </div>
            <div className='text-sm text-gray-600'>Require Follow-up</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage; 