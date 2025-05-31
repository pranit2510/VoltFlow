'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Users, Edit3, Trash2, Eye } from 'lucide-react';
import { clientOperations } from '@/lib/supabase-client';
import type { Client } from '@/lib/supabase';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await clientOperations.getAll();
      setClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients');
      console.error('Error loading clients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      await clientOperations.delete(id);
      setClients(clients.filter(client => client.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete client');
      console.error('Error deleting client:', err);
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600">
          {error}
        </div>
      )}

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='px-6 py-12 text-center text-sm text-gray-500'>
                  Loading clients...
                </td>
              </tr>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{client.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.company || 'N/A'}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.phone}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center'>
                    <Link href={`/clients/${client.id}`} className='text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10' title='View Client'>
                      <Eye size={18} />
                    </Link>
                    <Link href={`/clients/${client.id}/edit`} className='text-yellow-600 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100/50' title='Edit Client'>
                      <Edit3 size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(client.id)}
                      className='text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-100/50' 
                      title='Delete Client'
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='px-6 py-12 text-center text-sm text-gray-500'>
                  No clients found. Start by adding a new client.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsPage; 