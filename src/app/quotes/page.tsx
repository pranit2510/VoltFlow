'use client';

import React from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  FileText as FileTextIcon, // Page Icon
  Eye,
  Edit3,
  Trash2,
  Send
} from 'lucide-react';

// Mock data for quotes - replace with API data later
const mockQuotes = [
  {
    id: 'Q001',
    clientId: '1',
    clientName: 'John Doe',
    date: '2024-05-01',
    expiryDate: '2024-05-31',
    totalAmount: 1250.75,
    status: 'Sent',
  },
  {
    id: 'Q002',
    clientId: '2',
    clientName: 'Jane Smith',
    date: '2024-05-05',
    expiryDate: '2024-06-05',
    totalAmount: 850.00,
    status: 'Draft',
  },
  {
    id: 'Q003',
    clientId: '1',
    clientName: 'John Doe',
    date: '2024-04-20',
    expiryDate: '2024-05-20',
    totalAmount: 2400.50,
    status: 'Accepted',
  },
  {
    id: 'Q004',
    clientId: '3',
    clientName: 'Alice Brown',
    date: '2024-05-10',
    expiryDate: '2024-06-10',
    totalAmount: 550.20,
    status: 'Declined',
  },
];

const quoteStatusOptions = ['Draft', 'Sent', 'Accepted', 'Declined', 'Expired'];

const quoteStatusColors: { [key: string]: string } = {
  Draft: 'bg-gray-100 text-gray-700',
  Sent: 'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Declined: 'bg-red-100 text-red-700',
  Expired: 'bg-yellow-100 text-yellow-700',
};

// Mock client data for filter dropdown - in a real app, fetch this
const mockClientsFilter = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Brown' },
    { id: '4', name: 'Robert Green' },
];

const QuotesPage = () => {
  const filteredQuotes = mockQuotes; // Placeholder for filtering

  const handleSendQuote = (quoteId: string) => {
    alert(`Sending quote ${quoteId} (mock)...`);
    // Add actual send logic here (e.g., API call to generate PDF and email)
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <FileTextIcon className='mr-3 h-8 w-8 text-primary' /> Quotes / Estimates
        </h1>
        <Link href='/quotes/new' className='btn-primary'>
          <PlusCircle size={20} className='mr-2' /> Create New Quote
        </Link>
      </div>

      {/* Filters Bar */}
      <div className='mb-6 p-4 bg-white rounded-lg shadow'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end'>
          <div className='lg:col-span-1'>
            <label htmlFor='search-quotes' className='form-label'>Search Quotes (ID, Client)</label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='search'
                name='search-quotes'
                id='search-quotes'
                className='default-input pl-10'
                placeholder='Enter Quote ID or Client Name...'
              />
            </div>
          </div>
          <div>
            <label htmlFor='filter-quote-status' className='form-label'>Status</label>
            <select id='filter-quote-status' name='filter-quote-status' className='default-select'>
              <option value="">All Statuses</option>
              {quoteStatusOptions.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor='filter-client' className='form-label'>Client</label>
            <select id='filter-client' name='filter-client' className='default-select'>
              <option value="">All Clients</option>
              {mockClientsFilter.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor='filter-date-range' className='form-label'>Date Range (Placeholder)</label>
            <input type='text' id='filter-date-range' name='filter-date-range' className='default-input' placeholder='Select date range' />
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className='bg-white shadow rounded-lg overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quote ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Expiry Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map((quote) => (
                <tr key={quote.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:underline'>
                    <Link href={`/quotes/${quote.id}`}>{quote.id}</Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    <Link href={`/clients/${quote.clientId}`} className='hover:underline'>{quote.clientName}</Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{quote.date}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{quote.expiryDate}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>${quote.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${quoteStatusColors[quote.status] || 'bg-gray-100 text-gray-800'}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 flex items-center'>
                    <Link href={`/quotes/${quote.id}`} className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10' title='View Quote'>
                      <Eye size={18} />
                    </Link>
                    <Link href={`/quotes/${quote.id}/edit`} className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50' title='Edit Quote'>
                      <Edit3 size={18} />
                    </Link>
                    <button onClick={() => handleSendQuote(quote.id)} className='text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-100/50' title='Send Quote'>
                      <Send size={18} />
                    </button>
                    <button className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50' title='Delete Quote'>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='px-6 py-12 text-center text-sm text-gray-500'>
                  No quotes found. Start by creating a new quote.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotesPage; 