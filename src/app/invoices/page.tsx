'use client';

import React from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Receipt as ReceiptIcon, // Page Icon
  Eye,
  Edit3,
  Trash2,
  Send,
  CreditCard // For Record Payment
} from 'lucide-react';

// Mock data for invoices - replace with API data later
const mockInvoices = [
  {
    id: 'INV001',
    clientId: '1',
    clientName: 'John Doe',
    jobId: 'J003', // Assuming job J003 was completed for John Doe
    quoteId: 'Q003',
    invoiceDate: '2024-05-12',
    dueDate: '2024-06-11',
    totalAmount: 2400.50,
    amountPaid: 0,
    status: 'Sent', // Draft, Sent, Paid, Overdue, Partially Paid
  },
  {
    id: 'INV002',
    clientId: '4',
    clientName: 'Robert Green',
    jobId: 'J004',
    quoteId: null,
    invoiceDate: '2024-05-10',
    dueDate: '2024-06-09',
    totalAmount: 650.00,
    amountPaid: 650.00,
    status: 'Paid',
  },
  {
    id: 'INV003',
    clientId: '2',
    clientName: 'Jane Smith',
    jobId: 'J002', // Job might still be in progress or recently completed
    quoteId: null,
    invoiceDate: '2024-05-15',
    dueDate: '2024-06-14',
    totalAmount: 850.00,
    amountPaid: 0,
    status: 'Draft',
  },
  {
    id: 'INV004',
    clientId: '1',
    clientName: 'John Doe',
    jobId: 'J001',
    quoteId: 'Q001',
    invoiceDate: '2024-04-01',
    dueDate: '2024-05-01',
    totalAmount: 1250.75,
    amountPaid: 500.00,
    status: 'Overdue', // And Partially Paid
  },
];

const invoiceStatusOptions = ['Draft', 'Sent', 'Paid', 'Partially Paid', 'Overdue', 'Void'];

const invoiceStatusColors: { [key: string]: string } = {
  Draft: 'bg-gray-100 text-gray-700',
  Sent: 'bg-blue-100 text-blue-700',
  Paid: 'bg-green-100 text-green-700',
  'Partially Paid': 'bg-yellow-100 text-yellow-700',
  Overdue: 'bg-red-100 text-red-700',
  Void: 'bg-orange-100 text-orange-700',
};

// Mock client data for filter dropdown
const mockClientsFilter = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Brown' },
    { id: '4', name: 'Robert Green' },
];

const InvoicesPage = () => {
  const filteredInvoices = mockInvoices; // Placeholder for filtering

  const handleSendInvoice = (invoiceId: string) => {
    alert(`Sending invoice ${invoiceId} (mock)...`);
  };

  const handleRecordPayment = (invoiceId: string) => {
    alert(`Recording payment for invoice ${invoiceId} (mock)...`);
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <ReceiptIcon className='mr-3 h-8 w-8 text-primary' /> Invoices
        </h1>
        <Link href='/invoices/new' className='btn-primary'>
          <PlusCircle size={20} className='mr-2' /> Create New Invoice
        </Link>
      </div>

      {/* Filters Bar */}
      <div className='mb-6 p-4 bg-white rounded-lg shadow'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end'>
          <div className='lg:col-span-1'>
            <label htmlFor='search-invoices' className='form-label'>Search Invoices (ID, Client)</label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='search'
                name='search-invoices'
                id='search-invoices'
                className='default-input pl-10'
                placeholder='Enter Invoice ID or Client Name...'
              />
            </div>
          </div>
          <div>
            <label htmlFor='filter-invoice-status' className='form-label'>Status</label>
            <select id='filter-invoice-status' name='filter-invoice-status' className='default-select'>
              <option value="">All Statuses</option>
              {invoiceStatusOptions.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor='filter-client-invoice' className='form-label'>Client</label>
            <select id='filter-client-invoice' name='filter-client-invoice' className='default-select'>
              <option value="">All Clients</option>
              {mockClientsFilter.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor='filter-due-date' className='form-label'>Due Date Range (Placeholder)</label>
            <input type='text' id='filter-due-date' name='filter-due-date' className='default-input' placeholder='Select date range' />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className='bg-white shadow rounded-lg overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Invoice ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Inv. Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Due Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount Due</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => {
                const amountDue = invoice.totalAmount - invoice.amountPaid;
                return (
                  <tr key={invoice.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:underline'>
                      <Link href={`/invoices/${invoice.id}`}>{invoice.id}</Link>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                      <Link href={`/clients/${invoice.clientId}`} className='hover:underline'>{invoice.clientName}</Link>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{invoice.invoiceDate}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${new Date(invoice.dueDate) < new Date() && invoice.status !== 'Paid' && invoice.status !== 'Void' ? 'text-red-500 font-semibold' : ''}`}>
                        {invoice.dueDate}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>${invoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${amountDue > 0 ? 'text-dark' : 'text-green-600'}`}>
                        ${amountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoiceStatusColors[invoice.status] || 'bg-gray-100 text-gray-800'}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 flex items-center'>
                      <Link href={`/invoices/${invoice.id}`} className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10' title='View Invoice'>
                        <Eye size={18} />
                      </Link>
                      <Link href={`/invoices/${invoice.id}/edit`} className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50' title='Edit Invoice'>
                        <Edit3 size={18} />
                      </Link>
                      {invoice.status !== 'Paid' && invoice.status !== 'Void' && (
                        <button onClick={() => handleSendInvoice(invoice.id)} className='text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-100/50' title='Send Invoice'>
                          <Send size={18} />
                        </button>
                      )}
                      {invoice.status !== 'Paid' && invoice.status !== 'Void' && amountDue > 0 && (
                        <button onClick={() => handleRecordPayment(invoice.id)} className='text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-100/50' title='Record Payment'>
                          <CreditCard size={18} />
                        </button>
                      )}
                      <button className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50' title='Delete Invoice (or Void)'>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className='px-6 py-12 text-center text-sm text-gray-500'>
                  No invoices found. Start by creating a new invoice.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage; 