'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Users, TrendingUp, DollarSign, Calendar, ArrowUpCircle, ChevronDown } from 'lucide-react';
import FlowActions from '@/components/ui/FlowActions';
import { clientOperations, jobOperations, invoiceOperations } from '@/lib/supabase-client';
import type { Client } from '@/lib/supabase';

// Enhanced Client interface for flow functionality
interface EnhancedClient extends Client {
  flowStatus: ClientStatus;
  leadSource?: string;
  lastJobDate?: string;
  totalJobs: number;
  totalRevenue: number;
  lastContact?: string;
}

type ClientStatus = 'Prospective' | 'Active' | 'VIP' | 'Inactive';

const ClientsPage = () => {
  const [clients, setClients] = useState<EnhancedClient[]>([]);
  const [filteredClients, setFilteredClients] = useState<EnhancedClient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'All'>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load clients from database
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all related data for proper flow status calculation
      const [clientsData, allJobs, allInvoices] = await Promise.all([
        clientOperations.getAll(),
        jobOperations.getAll(),
        invoiceOperations.getAll()
      ]);
      
      // Enhance clients with real flow data
      const enhancedClients: EnhancedClient[] = clientsData.map(client => {
        // Get client's jobs and invoices
        const clientJobs = allJobs.filter((job: any) => job.client_id === client.id);
        const clientInvoices = allInvoices.filter((invoice: any) => invoice.client_id === client.id);
        
        // Calculate real metrics
        const totalJobs = clientJobs.length;
        const completedJobs = clientJobs.filter((job: any) => job.status === 'completed').length;
        const totalRevenue = clientInvoices
          .filter((inv: any) => inv.status === 'paid')
          .reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0);
        
        // Get last job date
        const lastJobDate = clientJobs.length > 0 
          ? clientJobs
              .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
              .created_at
          : undefined;
        
        // Determine proper flow status based on business rules
        const flowStatus = determineFlowStatus(client, completedJobs, totalRevenue, totalJobs, lastJobDate);
        
        return {
          ...client,
          flowStatus,
          leadSource: 'Direct', // Would come from leads conversion tracking
          lastJobDate,
          totalJobs,
          totalRevenue,
          lastContact: client.created_at
        };
      });
      
      // If no real data, add some demo clients to showcase the flow
      if (enhancedClients.length === 0) {
        const demoClients: EnhancedClient[] = [
          {
            id: 1,
            created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            name: 'Smith Electronics',
            email: 'john@smithelectronics.com',
            phone: '+1 (555) 123-4567',
            company: 'Smith Electronics Corp',
            notes: 'Commercial electrical contractor',
            address: '123 Business Ave, Downtown',
            status: 'active',
            flowStatus: 'VIP',
            leadSource: 'Referral',
            lastJobDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            totalJobs: 8,
            totalRevenue: 15750,
            lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            name: 'Johnson Residence',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 987-6543',
            company: '',
            notes: 'Kitchen renovation project',
            address: '456 Oak Street, Suburbia',
            status: 'active',
            flowStatus: 'Active',
            leadSource: 'Website',
            lastJobDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            totalJobs: 3,
            totalRevenue: 4250,
            lastContact: new Date().toISOString()
          },
          {
            id: 3,
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            name: 'ABC Manufacturing',
            email: 'maintenance@abcmfg.com',
            phone: '+1 (555) 456-7890',
            company: 'ABC Manufacturing Inc',
            notes: 'Industrial electrical maintenance',
            address: '789 Industrial Blvd, Factory District',
            status: 'active',
            flowStatus: 'Prospective',
            leadSource: 'Cold Call',
            lastJobDate: undefined,
            totalJobs: 0,
            totalRevenue: 0,
            lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 4,
            created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
            name: 'Miller Property Group',
            email: 'contact@millerproperties.com',
            phone: '+1 (555) 321-0987',
            company: 'Miller Property Group',
            notes: 'Property management company',
            address: '321 Real Estate Row, Commercial District',
            status: 'inactive',
            flowStatus: 'Inactive',
            leadSource: 'Trade Show',
            lastJobDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
            totalJobs: 2,
            totalRevenue: 1850,
            lastContact: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        setClients(demoClients);
        setFilteredClients(demoClients);
      } else {
        setClients(enhancedClients);
        setFilteredClients(enhancedClients);
      }
    } catch (err) {
      console.error('Error loading clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  // Proper flow status determination based on documented business rules
  const determineFlowStatus = (
    client: Client, 
    completedJobs: number, 
    totalRevenue: number, 
    totalJobs: number,
    lastJobDate?: string
  ): ClientStatus => {
    // Inactive: Database status is inactive OR no activity for 6+ months
    if (client.status === 'inactive') return 'Inactive';
    
    if (lastJobDate) {
      const daysSinceLastJob = (Date.now() - new Date(lastJobDate).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLastJob > 180) return 'Inactive'; // 6 months
    }
    
    // VIP: High-value client (>$10k revenue OR >5 completed jobs)
    if (totalRevenue > 10000 || completedJobs > 5) return 'VIP';
    
    // Active: Has completed jobs, regular customer
    if (completedJobs > 0) return 'Active';
    
    // Default: Prospective (new client, no jobs completed)
    return 'Prospective';
  };

  // Filter clients based on search and status
  useEffect(() => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(client => client.flowStatus === statusFilter);
    }

    setFilteredClients(filtered);
  }, [searchTerm, statusFilter, clients]);

  const getStatusCounts = () => {
    return {
      All: clients.length,
      Prospective: clients.filter(c => c.flowStatus === 'Prospective').length,
      Active: clients.filter(c => c.flowStatus === 'Active').length,
      VIP: clients.filter(c => c.flowStatus === 'VIP').length,
      Inactive: clients.filter(c => c.flowStatus === 'Inactive').length,
    };
  };

  const getStatusColor = (status: ClientStatus) => {
    const colors = {
      'Prospective': 'bg-blue-100 text-blue-700',
      'Active': 'bg-green-100 text-green-700',
      'VIP': 'bg-purple-100 text-purple-700',
      'Inactive': 'bg-gray-100 text-gray-700'
    };
    return colors[status];
  };

  const statusCounts = getStatusCounts();

  // Add this function after the determineFlowStatus function
  const updateClientStatus = async (clientId: string | number, newStatus: ClientStatus) => {
    try {
      // Update client status in database
      await clientOperations.update(clientId.toString(), { 
        status: newStatus === 'Inactive' ? 'inactive' : 'active' 
      });
      
      // Reload clients to reflect changes
      loadClients();
    } catch (error) {
      console.error('Error updating client status:', error);
      alert('Failed to update client status');
    }
  };

  // Add status dropdown component
  const StatusDropdown = ({ client, onStatusChange }: { 
    client: EnhancedClient; 
    onStatusChange: (clientId: string | number, newStatus: ClientStatus) => void 
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.flowStatus)}`}
        >
          {client.flowStatus}
          <ChevronDown size={12} className="ml-1" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
            {(['Prospective', 'Active', 'VIP', 'Inactive'] as ClientStatus[]).map(status => (
              <button
                key={status}
                onClick={() => {
                  onStatusChange(client.id, status);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-50 ${
                  status === client.flowStatus ? 'bg-gray-100' : ''
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-12 bg-gray-100 rounded mb-2"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Clients</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={loadClients}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <Users className='mr-3 h-8 w-8 text-primary' /> 
          Clients ({clients.length})
        </h1>
        <Link href='/clients/new' className='btn-primary group'>
          <Plus size={20} className='mr-2 group-hover:rotate-90 transition-transform duration-300' /> 
          Add New Client
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {(Object.keys(statusCounts) as Array<keyof typeof statusCounts>).map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              statusFilter === status 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className='mb-6 relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
        <input
          type='text'
          placeholder='Search clients by name, email, or company...'
          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Client Flow Insights Panel */}
      <div className='mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 fade-in' style={{ animationDelay: '0.3s' }}>
        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
          <TrendingUp className='h-5 w-5 mr-2 text-purple-500' />
          Client Flow Insights
        </h3>
        
        {/* Flow Progression Diagram */}
        <div className='mb-6 p-4 bg-white rounded-lg border-2 border-dashed border-purple-200'>
          <h4 className='text-sm font-medium text-gray-700 mb-3'>Client Journey Flow</h4>
          <div className='flex items-center justify-between text-xs'>
            <div className='flex flex-col items-center'>
              <div className='w-3 h-3 rounded-full bg-blue-500 mb-1'></div>
              <span className='text-blue-600 font-medium'>Prospective</span>
              <span className='text-gray-500'>({clients.filter(c => c.flowStatus === 'Prospective').length})</span>
            </div>
            <div className='flex-1 h-0.5 bg-gray-300 mx-2'></div>
            <div className='flex flex-col items-center'>
              <div className='w-3 h-3 rounded-full bg-green-500 mb-1'></div>
              <span className='text-green-600 font-medium'>Active</span>
              <span className='text-gray-500'>({clients.filter(c => c.flowStatus === 'Active').length})</span>
            </div>
            <div className='flex-1 h-0.5 bg-gray-300 mx-2'></div>
            <div className='flex flex-col items-center'>
              <div className='w-3 h-3 rounded-full bg-purple-500 mb-1'></div>
              <span className='text-purple-600 font-medium'>VIP</span>
              <span className='text-gray-500'>({clients.filter(c => c.flowStatus === 'VIP').length})</span>
            </div>
          </div>
          <div className='mt-2 text-center text-xs text-gray-500'>
            VIP Status: $10k+ revenue OR 5+ completed jobs
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-green-600'>
              {clients.filter(c => c.flowStatus === 'Active' || c.flowStatus === 'VIP').length}
            </div>
            <div className='text-sm text-gray-600'>Active Clients</div>
            <div className='text-xs text-gray-500 mt-1'>Currently generating revenue</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-blue-600'>
              {clients.filter(c => c.flowStatus === 'Prospective').length}
            </div>
            <div className='text-sm text-gray-600'>Prospective</div>
            <div className='text-xs text-gray-500 mt-1'>Potential new business</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-purple-600'>
              ${clients.reduce((sum, c) => sum + c.totalRevenue, 0).toLocaleString()}
            </div>
            <div className='text-sm text-gray-600'>Total Client Value</div>
            <div className='text-xs text-gray-500 mt-1'>Lifetime revenue</div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='text-2xl font-bold text-orange-600'>
              {clients.filter(c => c.flowStatus === 'VIP').length}
            </div>
            <div className='text-sm text-gray-600'>VIP Clients</div>
            <div className='text-xs text-gray-500 mt-1'>High-value relationships</div>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className='bg-white rounded-lg shadow overflow-hidden fade-in' style={{ animationDelay: '0.2s' }}>
        <div className='px-6 py-4 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Client Directory ({filteredClients.length} {statusFilter !== 'All' ? statusFilter : ''} clients)
          </h2>
        </div>
        
        {filteredClients.length === 0 ? (
          <div className='p-12 text-center'>
            <Users className='mx-auto h-12 w-12 text-gray-400 mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No clients found</h3>
            <p className='text-gray-500 mb-4'>
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first client.'}
            </p>
            <Link href='/clients/new' className='btn-primary'>
              <Plus size={20} className='mr-2' /> Add First Client
            </Link>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Business Metrics</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredClients.map((client, index) => (
                  <tr key={client.id} className='hover:bg-gray-50 transition-colors duration-150' style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>{client.name}</div>
                        {client.company && <div className='text-sm text-gray-500'>{client.company}</div>}
                        <div className='text-xs text-gray-400'>Added {new Date(client.created_at).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{client.email}</div>
                      <div className='text-sm text-gray-500'>{client.phone}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <StatusDropdown client={client} onStatusChange={updateClientStatus} />
                      {client.leadSource && (
                        <div className='text-xs text-gray-500 mt-1'>Source: {client.leadSource}</div>
                      )}
                      
                      {/* Flow-specific next step indicator */}
                      <div className='text-xs text-gray-600 mt-1'>
                        {client.flowStatus === 'Prospective' && (
                          <span className='flex items-center text-blue-600'>
                            <div className='w-1 h-1 bg-blue-500 rounded-full mr-1'></div>
                            Next: Create Quote
                          </span>
                        )}
                        {client.flowStatus === 'Active' && (
                          <span className='flex items-center text-green-600'>
                            <div className='w-1 h-1 bg-green-500 rounded-full mr-1'></div>
                            {client.totalJobs < 5 ? `${5 - client.totalJobs} jobs to VIP` : 'Maintain relationship'}
                          </span>
                        )}
                        {client.flowStatus === 'VIP' && (
                          <span className='flex items-center text-purple-600'>
                            <div className='w-1 h-1 bg-purple-500 rounded-full mr-1'></div>
                            Priority service ready
                          </span>
                        )}
                        {client.flowStatus === 'Inactive' && (
                          <span className='flex items-center text-red-600'>
                            <div className='w-1 h-1 bg-red-500 rounded-full mr-1'></div>
                            Re-engagement needed
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex items-center'>
                          <DollarSign className='h-4 w-4 text-green-500 mr-1' />
                          <span>${client.totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className='flex items-center'>
                          <Calendar className='h-4 w-4 text-blue-500 mr-1' />
                          <span>{client.totalJobs} jobs</span>
                        </div>
                      </div>
                      {client.lastJobDate && (
                        <div className='text-xs text-gray-400 mt-1'>
                          Last job: {new Date(client.lastJobDate).toLocaleDateString()}
                        </div>
                      )}
                      
                      {/* Progress to VIP indicator */}
                      {client.flowStatus !== 'VIP' && client.flowStatus !== 'Inactive' && (
                        <div className='mt-2'>
                          <div className='text-xs text-gray-500 mb-1'>
                            Progress to VIP: {Math.min(100, Math.max(
                              (client.totalRevenue / 10000) * 100,
                              (client.totalJobs / 5) * 100
                            )).toFixed(0)}%
                          </div>
                          <div className='w-full bg-gray-200 rounded-full h-1'>
                            <div 
                              className='bg-purple-500 h-1 rounded-full transition-all duration-300'
                              style={{ 
                                width: `${Math.min(100, Math.max(
                                  (client.totalRevenue / 10000) * 100,
                                  (client.totalJobs / 5) * 100
                                ))}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center space-x-2'>
                        <FlowActions 
                          module="clients"
                          status={client.flowStatus}
                          entityId={client.id.toString()}
                          onAction={(action, id) => console.log(`${action} for client ${id}`)}
                        />
                        <Link 
                          href={`/clients/${client.id}`} 
                          className='text-primary hover:text-primary-dark transition-colors duration-200 flex items-center'
                        >
                          <ArrowUpCircle size={16} className='mr-1' />
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage; 