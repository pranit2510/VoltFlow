'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
// import Link from 'next/link'; // Removed unused Link
import {
  Settings as SettingsIconPage, // For page title
  Building2, // Company Profile
  Users as UsersIcon, // User Management
  CreditCard, // Billing
  PlugZap, // Integrations
  Bell, // Notifications
  Edit3, // Edit action
  Trash2, // Delete action
  PlusCircle, // Add User
  Save,
  Package as PackageIcon // Added for Products & Services
} from 'lucide-react';

// Mock data for settings
const initialCompanyProfile = {
  companyName: 'VoltFlow Electricians Inc.',
  address: '123 Innovation Dr, Suite 404, Tech City, TX 75001',
  logoUrl: '/img/logo-placeholder.png', // Placeholder path
  contactPhone: '555-0123',
  contactEmail: 'contact@voltflow.com',
  taxId: '12-3456789',
  defaultQuoteTerms: 'Quote valid for 30 days. All work guaranteed for 90 days.',
  defaultInvoiceTerms: 'Payment due within 30 days. Late fees apply.',
};

const mockUsers = [
  { id: 'usr_1', name: 'Admin User', email: 'admin@voltflow.com', role: 'Admin', lastLogin: '2024-05-10' },
  { id: 'usr_2', name: 'Mike L. (Technician)', email: 'mike.l@voltflow.com', role: 'Technician', lastLogin: '2024-05-11' },
  { id: 'usr_3', name: 'Sarah B. (Technician)', email: 'sarah.b@voltflow.com', role: 'Technician', lastLogin: '2024-05-12' },
];

// Mock data for Products & Services
const initialItemsList = [
  { id: 'item_1', name: 'Hourly Labor Rate', type: 'Service', unitPrice: 75.00 },
  { id: 'item_2', name: 'Standard Light Fixture Installation', type: 'Service', unitPrice: 120.00 },
  { id: 'item_3', name: 'GFCI Outlet Replacement', type: 'Service', unitPrice: 85.00 },
  { id: 'item_4', name: '12-Gauge Electrical Wire (per foot)', type: 'Material', unitPrice: 0.75 },
  { id: 'item_5', name: 'Standard Outlet', type: 'Material', unitPrice: 5.50 },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('companyProfile');
  const [companyProfile, setCompanyProfile] = useState(initialCompanyProfile);
  const [users] = useState(mockUsers); // Removed setUsers
  const [items] = useState(initialItemsList); // Removed setItems

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Saving Company Profile:', companyProfile);
    alert('Company Profile saved (mock)!');
  };

  const handleAddUser = () => {
    alert('Add New User form/modal would appear here (mock).');
    // Example: Add a new mock user
    // const newUser = { id: `usr_${Date.now()}`, name: 'New User', email: 'new@voltflow.com', role: 'Technician', lastLogin: new Date().toISOString().split('T')[0] };
    // setUsers(prev => [...prev, newUser]);
  };

  const handleAddItem = () => {
    alert('Add New Product/Service form/modal would appear here (mock).');
    // Example: Add a new mock item
    // const newItem = { id: `item_${Date.now()}`, name: 'New Item', type: 'Service', unitPrice: 0 };
    // setItems(prev => [...prev, newItem]);
  };

  const tabItems = [
    { id: 'companyProfile', label: 'Company Profile', icon: Building2 },
    { id: 'userManagement', label: 'User Management', icon: UsersIcon },
    { id: 'productsServices', label: 'Products & Services', icon: PackageIcon },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: PlugZap },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    // { id: 'customFields', label: 'Custom Fields', icon: Edit3 }, // Future
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'companyProfile':
        return (
          <form onSubmit={handleProfileSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor='companyName' className='form-label'>Company Name</label>
                <input type='text' id='companyName' name='companyName' value={companyProfile.companyName} onChange={handleProfileChange} className='default-input' />
              </div>
              <div>
                <label htmlFor='contactPhone' className='form-label'>Contact Phone</label>
                <input type='tel' id='contactPhone' name='contactPhone' value={companyProfile.contactPhone} onChange={handleProfileChange} className='default-input' />
              </div>
            </div>
            <div>
              <label htmlFor='address' className='form-label'>Company Address</label>
              <input type='text' id='address' name='address' value={companyProfile.address} onChange={handleProfileChange} className='default-input' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <label htmlFor='contactEmail' className='form-label'>Contact Email</label>
                    <input type='email' id='contactEmail' name='contactEmail' value={companyProfile.contactEmail} onChange={handleProfileChange} className='default-input' />
                </div>
                <div>
                    <label htmlFor='taxId' className='form-label'>Tax ID</label>
                    <input type='text' id='taxId' name='taxId' value={companyProfile.taxId} onChange={handleProfileChange} className='default-input' />
                </div>
            </div>
            <div>
              <label htmlFor='logoUrl' className='form-label'>Company Logo URL (Placeholder)</label>
              <input type='text' id='logoUrl' name='logoUrl' value={companyProfile.logoUrl} onChange={handleProfileChange} className='default-input' />
              {/* In a real app, this would be a file upload component */}
              {companyProfile.logoUrl && <img src={companyProfile.logoUrl} alt="Company Logo" className="mt-2 h-16 w-auto bg-gray-100 p-1 rounded"/>}
            </div>
            <div>
              <label htmlFor='defaultQuoteTerms' className='form-label'>Default Quote Terms & Conditions</label>
              <textarea id='defaultQuoteTerms' name='defaultQuoteTerms' value={companyProfile.defaultQuoteTerms} onChange={handleProfileChange} rows={4} className='default-textarea'></textarea>
            </div>
            <div>
              <label htmlFor='defaultInvoiceTerms' className='form-label'>Default Invoice Terms & Payment Instructions</label>
              <textarea id='defaultInvoiceTerms' name='defaultInvoiceTerms' value={companyProfile.defaultInvoiceTerms} onChange={handleProfileChange} rows={4} className='default-textarea'></textarea>
            </div>
            <div className='pt-4 border-t flex justify-end'>
              <button type='submit' className='btn-primary'><Save size={18} className='mr-2'/> Save Company Profile</button>
            </div>
          </form>
        );
      case 'userManagement':
        return (
          <div>
            <div className='flex justify-end mb-4'>
              <button onClick={handleAddUser} className='btn-primary'><PlusCircle size={18} className='mr-2'/> Add New User</button>
            </div>
            <div className='bg-white shadow rounded-lg overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Last Login</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {users.map(user => (
                    <tr key={user.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.role}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.lastLogin}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                        <button className='text-primary hover:text-primary-dark' title='Edit User' onClick={() => alert(`Edit user ${user.id} (mock)`)}><Edit3 size={18}/></button>
                        <button className='text-red-600 hover:text-red-700' title='Delete User' onClick={() => alert(`Delete user ${user.id} (mock)`)}><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'productsServices':
        return (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-700'>Manage Products & Services</h3>
              <button onClick={handleAddItem} className='btn-primary'><PlusCircle size={18} className='mr-2'/> Add New Item</button>
            </div>
            <div className='bg-white shadow rounded-lg overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Name / Description</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Unit Price</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {items.map(item => (
                    <tr key={item.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.type}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>${item.unitPrice.toFixed(2)}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                        <button className='text-primary hover:text-primary-dark' title='Edit Item' onClick={() => alert(`Edit item ${item.id} (mock)`)}><Edit3 size={18}/></button>
                        <button className='text-red-600 hover:text-red-700' title='Delete Item' onClick={() => alert(`Delete item ${item.id} (mock)`)}><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                     <tr><td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">No products or services defined yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'billing':
        return <div className='p-4 bg-gray-50 rounded text-gray-600'>Manage your subscription plan and payment methods here. (Billing/Subscription Placeholder)</div>;
      case 'integrations':
        return <div className='p-4 bg-gray-50 rounded text-gray-600'>Connect VoltFlow CRM with other tools (e.g., email, SMS, payment gateways). (Integrations Placeholder)</div>;
      case 'notifications':
        return <div className='p-4 bg-gray-50 rounded text-gray-600'>Configure email and in-app notification preferences. (Notification Settings Placeholder)</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
            <SettingsIconPage className='mr-3 h-8 w-8 text-primary' /> Settings
        </h1>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Tabs Navigation (Vertical on md and up) */}
        <div className='md:w-1/4 lg:w-1/5'>
          <nav className='flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0' aria-label='Settings Tabs'>
            {tabItems.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap group flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full text-left 
                    ${activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className='flex-1 bg-white p-6 rounded-lg shadow min-h-[400px]'>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 