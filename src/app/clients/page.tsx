'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Users, Edit3, Trash2, Eye } from 'lucide-react';

// Mock data for clients - replace with API data later
const mockClients = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Doe Construction',
    phone: '555-1234',
    email: 'john.doe@example.com',
    city: 'New York',
    lastServiceDate: '2023-10-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Smith Electricians',
    phone: '555-5678',
    email: 'jane.smith@example.com',
    city: 'Los Angeles',
    lastServiceDate: '2023-11-01',
  },
  {
    id: '3',
    name: 'Alice Brown',
    company: '',
    phone: '555-8765',
    email: 'alice.brown@example.com',
    city: 'Chicago',
    lastServiceDate: '2023-09-20',
  },
  {
    id: '4',
    name: 'Robert Green',
    company: 'Green Builders Inc.',
    phone: '555-4321',
    email: 'robert.green@example.com',
    city: 'Houston',
    lastServiceDate: '2023-12-01',
  },
];

const ClientsPage = () => {
  // Placeholder for search term and filter state
  // const [searchTerm, setSearchTerm] = React.useState('');
  // const [filters, setFilters] = React.useState({});

  // const filteredClients = mockClients.filter(client => 
  //   client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //   client.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredClients = mockClients; // Using all clients for now

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <Users className='mr-3 h-8 w-8 text-primary' /> Clients
        </h1>
        <Link href='/clients/new' className='btn-primary'>
          <PlusCircle size={20} className='mr-2' /> Add New Client
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className='mb-6 p-4 bg-white rounded-lg shadow'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
          <div className='md:col-span-2'>
            <label htmlFor='search-clients' className='block text-sm font-medium text-gray-700 mb-1'>
              Search Clients
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='search'
                name='search-clients'
                id='search-clients'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm'
                placeholder='Search by name, company, email...'
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor='filter-status' className='block text-sm font-medium text-gray-700 mb-1'>
              Filter by Tag (Placeholder)
            </label>
            <select 
              id='filter-status' 
              name='filter-status'
              className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md'
              // value={filters.status || ''}
              // onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Tags</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className='bg-white shadow rounded-lg overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Company</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>City</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Last Service</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{client.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.company || 'N/A'}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.phone}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.city}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.lastServiceDate}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center'>
                    <Link href={`/clients/${client.id}`} className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10' title='View Client'>
                      <Eye size={18} />
                    </Link>
                    <Link href={`/clients/${client.id}/edit`} className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50' title='Edit Client'>
                      <Edit3 size={18} />
                    </Link>
                    <button className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50' title='Delete Client'>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='px-6 py-12 text-center text-sm text-gray-500'>
                  No clients found. Start by adding a new client.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Placeholder for pagination */}
        {/* TanStack Table will be integrated here later for sorting, filtering, pagination */}
      </div>
    </div>
  );
};

export default ClientsPage; 