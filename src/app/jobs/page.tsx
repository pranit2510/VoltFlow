'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Briefcase,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import FlowActions from '@/components/ui/FlowActions';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { jobStages, type JobStatus } from '@/lib/flowStates';

// Enhanced job type with flow status
interface EnhancedJob {
  id: string;
  clientId: string;
  clientName: string;
  quoteId?: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedTo: string;
  scheduledDate: string;
  estimatedDuration: string;
  actualDuration?: string;
  budgetAmount: number;
  actualCost?: number;
  completionPercentage?: number;
  lastUpdate: string;
  address: string;
}

// Mock enhanced data with proper flow statuses
const mockEnhancedJobs: EnhancedJob[] = [
  {
    id: 'J001',
    clientId: '1',
    clientName: 'Sarah Connor',
    quoteId: 'Q001',
    title: 'Kitchen lighting fixture installation',
    description: 'Install 4 pendant lights over kitchen island and 2 ceiling fans',
    status: 'Completed' as JobStatus,
    priority: 'Medium',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2024-05-15',
    estimatedDuration: '4 hours',
    actualDuration: '3.5 hours',
    budgetAmount: 1250.75,
    actualCost: 1180.50,
    completionPercentage: 100,
    lastUpdate: '2024-05-15',
    address: '123 Main St'
  },
  {
    id: 'J002',
    clientId: '2',
    clientName: 'Kyle Reese',
    quoteId: 'Q002',
    title: 'Electrical panel upgrade',
    description: 'Replace old 100A panel with new 200A panel including meter upgrade',
    status: 'In Progress' as JobStatus,
    priority: 'High',
    assignedTo: 'Sarah Davis',
    scheduledDate: '2024-05-20',
    estimatedDuration: '6 hours',
    budgetAmount: 850.00,
    completionPercentage: 65,
    lastUpdate: '2024-05-20',
    address: '456 Oak Ave'
  },
  {
    id: 'J003',
    clientId: '3',
    clientName: 'John Matrix',
    quoteId: 'Q003',
    title: 'Complete home rewiring project',
    description: 'Full electrical system upgrade for 2500 sq ft home',
    status: 'Scheduled' as JobStatus,
    priority: 'High',
    assignedTo: 'Team Alpha',
    scheduledDate: '2024-05-25',
    estimatedDuration: '3 days',
    budgetAmount: 2400.50,
    lastUpdate: '2024-05-22',
    address: '789 Pine Ln'
  },
  {
    id: 'J004',
    clientId: '1',
    clientName: 'Sarah Connor',
    title: 'Emergency outlet repair',
    description: 'Fix GFCI outlet in bathroom - urgent safety issue',
    status: 'Dispatched' as JobStatus,
    priority: 'Urgent',
    assignedTo: 'Emergency Team',
    scheduledDate: '2024-05-23',
    estimatedDuration: '1 hour',
    budgetAmount: 120.00,
    lastUpdate: '2024-05-23',
    address: '123 Main St'
  },
  {
    id: 'J005',
    clientId: '4',
    clientName: 'Dutch Schaefer',
    title: 'Garage outlet installation',
    description: 'Install 4 new outlets in detached garage',
    status: 'Needs Invoicing' as JobStatus,
    priority: 'Low',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2024-05-18',
    estimatedDuration: '2 hours',
    actualDuration: '2.5 hours',
    budgetAmount: 550.20,
    actualCost: 580.00,
    completionPercentage: 100,
    lastUpdate: '2024-05-18',
    address: '101 Maple Dr'
  }
];

const JobsPage = () => {
  const [jobs, setJobs] = useState<EnhancedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Status counts for the sorting bar - using flow states
  const statusCounts = {
    All: mockEnhancedJobs.length,
    ...Object.keys(jobStages).reduce((acc, status) => {
      acc[status] = mockEnhancedJobs.filter(job => job.status === status).length;
      return acc;
    }, {} as Record<string, number>)
  };

  useEffect(() => {
    setMounted(true);
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setJobs(mockEnhancedJobs);
    } catch (err) {
      console.error('Error loading jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlowAction = async (action: string, jobId: string) => {
    setActionLoading(`${action}-${jobId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    setActionLoading(null);
    
    switch (action) {
      case 'createInvoice':
        console.log(`Creating invoice for job ${jobId}`);
        break;
      default:
        console.log(`${action} for job ${jobId}`);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || job.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className="fade-in">
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <Briefcase className='mr-3 h-8 w-8 text-primary' /> Jobs / Work Orders
        </h1>
        <Link href='/jobs/new' className='btn-primary group inline-flex items-center'>
          <PlusCircle size={20} className='mr-2 group-hover:rotate-90 transition-transform duration-300' />
          <span>Create New Job</span>
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
                    : jobStages[status as JobStatus]?.color || 'bg-gray-100 text-gray-700'
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

      {/* Enhanced Search and Filter Bar */}
      <div className='mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 fade-in' style={{ animationDelay: '0.1s' }}>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <input
                type='search'
                placeholder='Search jobs by ID, client, title, or technician...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='default-input pl-10 w-full'
              />
            </div>
          </div>
          <div className='flex gap-2'>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className='default-select'
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Jobs Table */}
      {isLoading ? (
        <SkeletonLoader variant="table" />
      ) : (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden fade-in' style={{ animationDelay: '0.2s' }}>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Job ID</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client & Title</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Priority</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Assigned To</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Schedule</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Budget vs Actual</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Next Actions</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className='px-6 py-12 text-center text-sm text-gray-500'>
                      {searchTerm ? 'No jobs found matching your criteria.' : 'No jobs found. Start by creating a new job.'}
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className='table-row-hover group'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Link 
                          href={`/jobs/${job.id}`}
                          className='text-sm font-medium text-primary hover:text-primary-dark group-hover:underline transition-all duration-200'
                        >
                          {job.id}
                        </Link>
                        {job.quoteId && (
                          <div className='text-xs text-gray-500'>
                            from {job.quoteId}
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4'>
                        <Link 
                          href={`/clients/${job.clientId}`} 
                          className='text-sm font-medium text-gray-900 hover:text-primary transition-colors duration-200'
                        >
                          {job.clientName}
                        </Link>
                        <div className='text-sm text-gray-600 max-w-xs truncate' title={job.title}>
                          {job.title}
                        </div>
                        <div className='text-xs text-gray-500 mt-1'>
                          {job.address}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                          {job.priority === 'Urgent' && <AlertCircle size={12} className='mr-1' />}
                          {job.priority}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <StatusBadge 
                          module="jobs" 
                          status={job.status}
                          showDescription={false}
                        />
                        {job.completionPercentage !== undefined && (
                          <div className='mt-1 w-full bg-gray-200 rounded-full h-2'>
                            <div 
                              className='bg-green-600 h-2 rounded-full transition-all duration-300' 
                              style={{ width: `${job.completionPercentage}%` }}
                            ></div>
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {job.assignedTo}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center text-sm text-gray-900'>
                          <Calendar size={14} className='mr-1 text-gray-400' />
                          {job.scheduledDate}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {job.actualDuration || job.estimatedDuration}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900 font-medium'>
                          ${job.budgetAmount.toLocaleString()}
                        </div>
                        {job.actualCost && (
                          <div className={`text-xs ${job.actualCost > job.budgetAmount ? 'text-red-600' : 'text-green-600'}`}>
                            Actual: ${job.actualCost.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <FlowActions
                          module="jobs"
                          status={job.status}
                          entityId={job.id}
                          onAction={handleFlowAction}
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 flex items-center'>
                        <Link 
                          href={`/jobs/${job.id}`} 
                          className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10 transition-all duration-200' 
                          title='View Job'
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/jobs/${job.id}/edit`} 
                          className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50 transition-all duration-200' 
                          title='Edit Job'
                        >
                          <Edit3 size={18} />
                        </Link>
                        {job.status === 'In Progress' && (
                          <button 
                            className='text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-100/50 transition-all duration-200' 
                            title='Mark Complete'
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50 transition-all duration-200' title='Delete Job'>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Job Flow Insights Panel */}
      <div className='mt-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200 fade-in' style={{ animationDelay: '0.3s' }}>
        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
          <Briefcase className='h-5 w-5 mr-2 text-orange-500' />
          Job Flow Insights
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-orange-600'>
              {mockEnhancedJobs.filter(j => j.status === 'Scheduled' || j.status === 'Dispatched').length}
            </div>
            <div className='text-sm text-gray-600'>Active Jobs</div>
            <div className='text-xs text-gray-500 mt-1'>Scheduled & dispatched</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-blue-600'>
              {mockEnhancedJobs.filter(j => j.status === 'In Progress').length}
            </div>
            <div className='text-sm text-gray-600'>In Progress</div>
            <div className='text-xs text-gray-500 mt-1'>Currently being worked on</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-green-600'>
              {mockEnhancedJobs.filter(j => j.status === 'Needs Invoicing').length}
            </div>
            <div className='text-sm text-gray-600'>Ready for Billing</div>
            <div className='text-xs text-gray-500 mt-1'>Completed jobs awaiting invoices</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-purple-600'>
              {mockEnhancedJobs.filter(j => j.priority === 'Urgent' || j.priority === 'High').length}
            </div>
            <div className='text-sm text-gray-600'>High Priority</div>
            <div className='text-xs text-gray-500 mt-1'>Urgent & high priority jobs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage; 