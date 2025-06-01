'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  FileText as FileTextIcon,
  Eye,
  Edit3,
  Trash2,
  Send
} from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import FlowActions from '@/components/ui/FlowActions';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { quoteStages, type QuoteStatus } from '@/lib/flowStates';

// Enhanced quote type with flow status
interface EnhancedQuote {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  expiryDate: string;
  totalAmount: number;
  status: QuoteStatus;
  description: string;
  lineItems?: number;
  followUpDate?: string;
  approvedDate?: string;
  sentDate?: string;
  viewedDate?: string;
}

// Mock enhanced data with proper flow statuses
const mockEnhancedQuotes: EnhancedQuote[] = [
  {
    id: 'Q001',
    clientId: '1',
    clientName: 'Sarah Connor',
    date: '2024-05-01',
    expiryDate: '2024-05-31',
    totalAmount: 1250.75,
    status: 'Approved' as QuoteStatus,
    description: 'Kitchen lighting fixture installation',
    lineItems: 4,
    sentDate: '2024-05-01',
    viewedDate: '2024-05-02',
    approvedDate: '2024-05-03'
  },
  {
    id: 'Q002',
    clientId: '2',
    clientName: 'Kyle Reese',
    date: '2024-05-05',
    expiryDate: '2024-06-05',
    totalAmount: 850.00,
    status: 'Sent' as QuoteStatus,
    description: 'Electrical panel upgrade',
    lineItems: 3,
    sentDate: '2024-05-05',
    followUpDate: '2024-05-25'
  },
  {
    id: 'Q003',
    clientId: '3',
    clientName: 'John Matrix',
    date: '2024-04-20',
    expiryDate: '2024-05-20',
    totalAmount: 2400.50,
    status: 'Reviewed' as QuoteStatus,
    description: 'Complete home rewiring project',
    lineItems: 8,
    sentDate: '2024-04-20',
    viewedDate: '2024-04-22'
  },
  {
    id: 'Q004',
    clientId: '4',
    clientName: 'Dutch Schaefer',
    date: '2024-05-10',
    expiryDate: '2024-06-10',
    totalAmount: 550.20,
    status: 'Draft' as QuoteStatus,
    description: 'Garage outlet installation',
    lineItems: 2
  },
  {
    id: 'Q005',
    clientId: '1',
    clientName: 'Sarah Connor',
    date: '2024-04-01',
    expiryDate: '2024-04-30',
    totalAmount: 320.00,
    status: 'Expired' as QuoteStatus,
    description: 'Bathroom fan installation',
    lineItems: 1,
    sentDate: '2024-04-01'
  }
];

const QuotesPage = () => {
  const [quotes, setQuotes] = useState<EnhancedQuote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Status counts for the sorting bar - using flow states
  const statusCounts = {
    All: mockEnhancedQuotes.length,
    ...Object.keys(quoteStages).reduce((acc, status) => {
      acc[status] = mockEnhancedQuotes.filter(quote => quote.status === status).length;
      return acc;
    }, {} as Record<string, number>)
  };

  useEffect(() => {
    setMounted(true);
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 600));
      setQuotes(mockEnhancedQuotes);
    } catch (err) {
      console.error('Error loading quotes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlowAction = async (action: string, quoteId: string) => {
    setActionLoading(`${action}-${quoteId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    setActionLoading(null);
    
    switch (action) {
      case 'createJob':
        console.log(`Creating job from quote ${quoteId}`);
        break;
      default:
        console.log(`${action} for quote ${quoteId}`);
    }
  };

  const handleSendQuote = (quoteId: string) => {
    alert(`Sending quote ${quoteId} (mock)...`);
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className="fade-in">
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <FileTextIcon className='mr-3 h-8 w-8 text-primary' /> Quotes / Estimates
        </h1>
        <Link href='/quotes/new' className='btn-primary group inline-flex items-center'>
          <PlusCircle size={20} className='mr-2 group-hover:rotate-90 transition-transform duration-300' />
          <span>Create New Quote</span>
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
                    : quoteStages[status as QuoteStatus]?.color || 'bg-gray-100 text-gray-700'
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
            type='search'
            placeholder='Search quotes by ID, client, or description...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='default-input pl-10 w-full'
          />
        </div>
      </div>

      {/* Enhanced Quotes Table */}
      {isLoading ? (
        <SkeletonLoader variant="table" />
      ) : (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden fade-in' style={{ animationDelay: '0.2s' }}>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quote ID</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Expiry Date</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Next Actions</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={8} className='px-6 py-12 text-center text-sm text-gray-500'>
                      {searchTerm ? 'No quotes found matching your criteria.' : 'No quotes found. Start by creating a new quote.'}
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((quote) => (
                    <tr key={quote.id} className='table-row-hover group'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Link 
                          href={`/quotes/${quote.id}`}
                          className='text-sm font-medium text-primary hover:text-primary-dark group-hover:underline transition-all duration-200'
                        >
                          {quote.id}
                        </Link>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Link 
                          href={`/clients/${quote.clientId}`} 
                          className='text-sm text-gray-900 hover:text-primary transition-colors duration-200'
                        >
                          {quote.clientName}
                        </Link>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm text-gray-900 max-w-xs truncate' title={quote.description}>
                          {quote.description}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {quote.lineItems} line items
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-semibold text-gray-900'>
                          ${quote.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <StatusBadge 
                          module="quotes" 
                          status={quote.status}
                          showDescription={false}
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <div className={`${new Date(quote.expiryDate) < new Date() && quote.status !== 'Approved' ? 'text-red-500 font-semibold' : ''}`}>
                          {quote.expiryDate}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <FlowActions
                          module="quotes"
                          status={quote.status}
                          entityId={quote.id}
                          onAction={handleFlowAction}
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 flex items-center'>
                        <Link 
                          href={`/quotes/${quote.id}`} 
                          className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10 transition-all duration-200' 
                          title='View Quote'
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/quotes/${quote.id}/edit`} 
                          className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50 transition-all duration-200' 
                          title='Edit Quote'
                        >
                          <Edit3 size={18} />
                        </Link>
                        {quote.status === 'Draft' && (
                          <button 
                            onClick={() => handleSendQuote(quote.id)} 
                            className='text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-100/50 transition-all duration-200' 
                            title='Send Quote'
                          >
                            <Send size={18} />
                          </button>
                        )}
                        <button className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50 transition-all duration-200' title='Delete Quote'>
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

      {/* Quote Flow Insights Panel */}
      <div className='mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200 fade-in' style={{ animationDelay: '0.3s' }}>
        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
          <FileTextIcon className='h-5 w-5 mr-2 text-indigo-500' />
          Quote Flow Insights
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-green-600'>
              {mockEnhancedQuotes.filter(q => q.status === 'Approved').length}
            </div>
            <div className='text-sm text-gray-600'>Ready for Jobs</div>
            <div className='text-xs text-gray-500 mt-1'>Approved quotes awaiting job creation</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-blue-600'>
              {mockEnhancedQuotes.filter(q => q.status === 'Sent' || q.status === 'Reviewed').length}
            </div>
            <div className='text-sm text-gray-600'>Pending Response</div>
            <div className='text-xs text-gray-500 mt-1'>Awaiting client decision</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-gray-600'>
              {mockEnhancedQuotes.filter(q => q.status === 'Draft').length}
            </div>
            <div className='text-sm text-gray-600'>Draft Quotes</div>
            <div className='text-xs text-gray-500 mt-1'>Ready to send to clients</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-green-600'>
              ${mockEnhancedQuotes.reduce((sum, q) => sum + q.totalAmount, 0).toLocaleString()}
            </div>
            <div className='text-sm text-gray-600'>Total Pipeline Value</div>
            <div className='text-xs text-gray-500 mt-1'>All active quotes combined</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesPage; 