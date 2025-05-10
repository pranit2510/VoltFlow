'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit3,
  UserPlus,
  FileText as FileTextIcon,
  Lightbulb,
  Phone,
  Mail,
  DollarSign,
  ClipboardList,
  CalendarCheck2,
  Info,
  Save
} from 'lucide-react';

// Re-defining mockLeads and utils for simplicity in this component
const mockLeads = [
  {
    id: 'L001',
    leadName: 'Sarah Connor',
    contactPhone: '555-0101',
    contactEmail: 's.connor@email.com',
    leadSource: 'Website Inquiry',
    estimatedJobValue: 1200,
    status: 'New',
    followUpDate: '2024-05-20',
    descriptionOfNeeds: 'Interested in new lighting fixtures for kitchen, and possibly a smart home thermostat installation.',
    notes: 'Called on May 10th, seemed very interested. Mentioned budget constraints.',
    assignedTo: 'Admin'
  },
  {
    id: 'L002',
    leadName: 'Kyle Reese',
    contactPhone: '555-0202',
    contactEmail: 'k.reese@email.com',
    leadSource: 'Referral',
    estimatedJobValue: 750,
    status: 'Contacted',
    followUpDate: '2024-05-18',
    descriptionOfNeeds: 'Referred by John Doe. Needs panel upgrade for an older house. Wants a quote ASAP.',
    notes: 'Followed up via email on May 15th. Set reminder for call.',
    assignedTo: 'Admin'
  },
  // Add other mock leads if needed
];

const leadStatusOptions = ['New', 'Contacted', 'Proposal Sent', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'On Hold'];
const leadSourceOptions = ['Website Inquiry', 'Referral', 'Cold Call', 'Trade Show', 'Social Media', 'Advertisement', 'Other'];

const leadStatusColors: { [key: string]: string } = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-sky-100 text-sky-700',
  'Proposal Sent': 'bg-indigo-100 text-indigo-700',
  Negotiation: 'bg-yellow-100 text-yellow-700',
  'Closed-Won': 'bg-green-100 text-green-700',
  'Closed-Lost': 'bg-red-100 text-red-700',
  'On Hold': 'bg-gray-100 text-gray-700',
};

const LeadDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const [leadData, setLeadData] = useState<typeof mockLeads[0] | null>(null);

  useEffect(() => {
    const foundLead = mockLeads.find(l => l.id === leadId);
    if (foundLead) {
      setLeadData(foundLead);
    } else {
      // Handle lead not found, e.g., redirect or show error
      // For now, just console log and keep leadData null
      console.error('Lead not found!');
    }
  }, [leadId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLeadData(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  // Placeholder for save function
  const handleSaveLead = () => {
    console.log('Saving lead:', leadData);
    // Here you would typically make an API call to save the data
    alert('Lead data saved (mock)!');
  };

  if (!leadData) {
    return (
      <div>
        <Link href="/leads" className='inline-flex items-center text-primary hover:underline mb-4'>
          <ArrowLeft size={18} className="mr-2" /> Back to Leads
        </Link>
        <p className='text-red-500 text-center text-xl'>Lead not found or loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6'>
        <Link href="/leads" className='inline-flex items-center text-sm text-primary hover:underline mb-3'>
          <ArrowLeft size={16} className="mr-1.5" /> Back to Lead List
        </Link>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-2'>
          <h1 className='text-3xl font-bold text-dark flex items-center'>
            <Lightbulb className="mr-3 h-8 w-8 text-primary" /> {leadData.leadName}
          </h1>
          <div className='flex flex-wrap gap-2'>
            <Link href={`/leads/${leadData.id}/edit`} className='btn-secondary btn-sm'>
              <Edit3 size={16} className="mr-1.5" /> Edit Lead
            </Link>
            <button className='btn-secondary btn-sm'> {/* Placeholder for convert functionality */}
              <UserPlus size={16} className="mr-1.5" /> Convert to Client/Job
            </button>
            <Link href={`/quotes/new?leadId=${leadData.id}`} className='btn-primary btn-sm'>
              <FileTextIcon size={16} className="mr-1.5" /> Create Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Lead Details Form-Like Structure */}
      <div className='bg-white p-6 rounded-lg shadow space-y-8'>
        {/* Section 1: Basic Info & Status */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
          <div className='md:col-span-2 space-y-4'>
            <div>
              <label htmlFor='leadName' className='form-label'>Lead Name</label>
              <input type='text' id='leadName' name='leadName' value={leadData.leadName} onChange={handleInputChange} className='default-input' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='contactPhone' className='form-label flex items-center'><Phone size={14} className="mr-1.5 text-gray-400"/>Contact Phone</label>
                <input type='tel' id='contactPhone' name='contactPhone' value={leadData.contactPhone} onChange={handleInputChange} className='default-input' />
              </div>
              <div>
                <label htmlFor='contactEmail' className='form-label flex items-center'><Mail size={14} className="mr-1.5 text-gray-400"/>Contact Email</label>
                <input type='email' id='contactEmail' name='contactEmail' value={leadData.contactEmail} onChange={handleInputChange} className='default-input' />
              </div>
            </div>
          </div>
          <div className='space-y-4'>
             <div>
              <label htmlFor='status' className='form-label'>Status</label>
              <select id='status' name='status' value={leadData.status} onChange={handleInputChange} 
                className={`default-select w-full ${leadStatusColors[leadData.status]?.replace('bg-', 'border-').replace('-100', '-300')} ${leadStatusColors[leadData.status]}`}>
                {leadStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor='estimatedJobValue' className='form-label flex items-center'><DollarSign size={14} className="mr-1.5 text-gray-400"/>Estimated Value ($)</label>
              <input type='number' id='estimatedJobValue' name='estimatedJobValue' value={leadData.estimatedJobValue || ''} onChange={handleInputChange} className='default-input' />
            </div>
          </div>
        </div>

        {/* Section 2: Source & Needs */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='leadSource' className='form-label'>Lead Source</label>
            <select id='leadSource' name='leadSource' value={leadData.leadSource} onChange={handleInputChange} className='default-select'>
              {leadSourceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
           <div>
            <label htmlFor='assignedTo' className='form-label'>Assigned To</label>
            <input type='text' id='assignedTo' name='assignedTo' value={leadData.assignedTo} onChange={handleInputChange} className='default-input' placeholder='User/Team' />
          </div>
        </div>
        <div>
          <label htmlFor='descriptionOfNeeds' className='form-label flex items-center'><Info size={14} className="mr-1.5 text-gray-400"/>Description of Needs</label>
          <textarea id='descriptionOfNeeds' name='descriptionOfNeeds' value={leadData.descriptionOfNeeds} onChange={handleInputChange} rows={4} className='default-input'></textarea>
        </div>

        {/* Section 3: Follow-up & Notes */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='followUpDate' className='form-label flex items-center'><CalendarCheck2 size={14} className="mr-1.5 text-gray-400"/>Follow-up Date</label>
            <input type='date' id='followUpDate' name='followUpDate' value={leadData.followUpDate || ''} onChange={handleInputChange} className='default-input' />
          </div>
        </div>
        <div>
          <label htmlFor='notes' className='form-label flex items-center'><ClipboardList size={14} className="mr-1.5 text-gray-400"/>Notes / Follow-up Tasks</label>
          <textarea id='notes' name='notes' value={leadData.notes} onChange={handleInputChange} rows={4} className='default-input'></textarea>
        </div>
        
        <div className='pt-4 border-t border-gray-200 flex justify-end'>
            <button type="button" onClick={handleSaveLead} className='btn-primary'>
                <Save size={18} className="mr-2" /> Save Lead Details
            </button>
        </div>

      </div>
    </div>
  );
};

// Add a shared style for form labels if not already in globals.css
// .form-label { @apply block text-sm font-medium text-gray-700 mb-1; }

export default LeadDetailPage; 