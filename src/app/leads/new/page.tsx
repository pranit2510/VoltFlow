'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, PlusCircle, Lightbulb, Save, User, DollarSign, CalendarCheck2 } from 'lucide-react';

// Mock data for dropdowns
const leadStatusOptions = ['New', 'Contacted', 'Proposal Sent', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'On Hold'];
const leadSourceOptions = ['Website Inquiry', 'Referral', 'Cold Call', 'Trade Show', 'Social Media', 'Advertisement', 'Other'];

const CreateLeadPage = () => {
  const router = useRouter();
  // Form state
  const [leadName, setLeadName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [leadSource, setLeadSource] = useState(leadSourceOptions[0]);
  const [estimatedJobValue, setEstimatedJobValue] = useState('');
  const [status, setStatus] = useState(leadStatusOptions[0]);
  const [followUpDate, setFollowUpDate] = useState('');
  const [descriptionOfNeeds, setDescriptionOfNeeds] = useState('');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('Admin'); // Default or fetch users

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock save logic
    console.log('Saving new lead:', { leadName, contactPhone, contactEmail, leadSource, estimatedJobValue, status, followUpDate, descriptionOfNeeds, notes, assignedTo });
    alert('New lead created (mock)!');
    router.push('/leads');
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <PlusCircle className='mr-3 h-8 w-8 text-primary' /> Add New Lead
        </h1>
        <Link href="/leads" className='btn-secondary btn-sm'>
          <ArrowLeft size={16} className="mr-1.5" /> Back to Lead List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className='bg-white p-6 sm:p-8 rounded-lg shadow space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='leadName' className='form-label'>Lead Name</label>
            <input type='text' id='leadName' value={leadName} onChange={(e) => setLeadName(e.target.value)} className='default-input' required />
          </div>
          <div>
            <label htmlFor='status' className='form-label'>Status</label>
            <select id='status' value={status} onChange={(e) => setStatus(e.target.value)} className='default-select'>
              {leadStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='contactPhone' className='form-label'>Contact Phone</label>
            <input type='tel' id='contactPhone' value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className='default-input' />
          </div>
          <div>
            <label htmlFor='contactEmail' className='form-label'>Contact Email</label>
            <input type='email' id='contactEmail' value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className='default-input' />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
           <div>
            <label htmlFor='leadSource' className='form-label'>Lead Source</label>
            <select id='leadSource' value={leadSource} onChange={(e) => setLeadSource(e.target.value)} className='default-select'>
              {leadSourceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor='estimatedJobValue' className='form-label flex items-center'><DollarSign size={14} className="mr-1.5 text-gray-400"/>Estimated Value ($)</label>
            <input type='number' id='estimatedJobValue' value={estimatedJobValue} onChange={(e) => setEstimatedJobValue(e.target.value)} className='default-input' min='0' step='any' />
          </div>
        </div>

        <div>
          <label htmlFor='descriptionOfNeeds' className='form-label'>Description of Needs</label>
          <textarea id='descriptionOfNeeds' value={descriptionOfNeeds} onChange={(e) => setDescriptionOfNeeds(e.target.value)} rows={3} className='default-textarea'></textarea>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
                <label htmlFor='followUpDate' className='form-label flex items-center'><CalendarCheck2 size={14} className="mr-1.5 text-gray-400"/>Follow-up Date</label>
                <input type='date' id='followUpDate' value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} className='default-input' />
            </div>
            <div>
                <label htmlFor='assignedTo' className='form-label'>Assigned To</label>
                <input type='text' id='assignedTo' value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className='default-input' />
            </div>
        </div>

        <div>
          <label htmlFor='notes' className='form-label'>Notes</label>
          <textarea id='notes' value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className='default-textarea'></textarea>
        </div>
        
        <div className='pt-4 border-t flex justify-end'>
            <button type="submit" className='btn-primary'>
                <Save size={18} className="mr-2" /> Save Lead
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLeadPage; 