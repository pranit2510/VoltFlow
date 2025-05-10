'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, PlusCircle, User, Save } from 'lucide-react';

const CreateClientPage = () => {
  const router = useRouter();
  // Add state for form fields here, e.g.:
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // ... other fields

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock save logic
    console.log('Saving new client:', { clientName, companyName, email, phone });
    alert('New client saved (mock)!');
    router.push('/clients');
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <PlusCircle className='mr-3 h-8 w-8 text-primary' /> Add New Client
        </h1>
        <Link href="/clients" className='btn-secondary btn-sm'>
          <ArrowLeft size={16} className="mr-1.5" /> Back to Client List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className='bg-white p-6 sm:p-8 rounded-lg shadow space-y-6'>
        <div>
          <label htmlFor='clientName' className='form-label'>Client Name</label>
          <input type='text' id='clientName' value={clientName} onChange={(e) => setClientName(e.target.value)} className='default-input' required />
        </div>
        <div>
          <label htmlFor='companyName' className='form-label'>Company Name (Optional)</label>
          <input type='text' id='companyName' value={companyName} onChange={(e) => setCompanyName(e.target.value)} className='default-input' />
        </div>
        <div>
          <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='default-input' />
        </div>
        <div>
          <label htmlFor='phone' className='form-label'>Phone</label>
          <input type='tel' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} className='default-input' />
        </div>
        {/* Add more fields for address, notes etc. as per Client Detail View */}
        
        <div className='pt-4 border-t flex justify-end'>
            <button type="submit" className='btn-primary'>
                <Save size={18} className="mr-2" /> Save Client
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClientPage; 