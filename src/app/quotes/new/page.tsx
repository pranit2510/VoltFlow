'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Trash2, Save, Send, Settings, Info, Hash, CalendarDays, User, Package, DollarSign, Percent, ScrollText } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; // For leadId pre-fill

// Mock client data for dropdown
const mockClients = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Brown' },
  { id: '4', name: 'Robert Green' },
  // Add mock lead data if we want to pre-select leads
  { id: 'L001', name: 'Sarah Connor (Lead)' }, 
];

const defaultTerms = "1. All payments are due within 30 days of invoice date.\n2. A late fee of 1.5% per month will be applied to overdue invoices.\n3. All work is guaranteed for a period of 90 days from completion.";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

const CreateQuotePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadIdFromQuery = searchParams.get('leadId');

  const [quoteId, setQuoteId] = useState(`Q-${Date.now().toString().slice(-6)}`);
  const [clientId, setClientId] = useState(leadIdFromQuery || '');
  const [quoteDate, setQuoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // Default expiry 30 days from now
    return date.toISOString().split('T')[0];
  });
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 },
  ]);
  const [terms, setTerms] = useState(defaultTerms);
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState(0); // Percentage

  useEffect(() => {
    if (leadIdFromQuery) {
      // In a real app, you might fetch lead details here to pre-fill more info
      const leadClient = mockClients.find(c => c.id === leadIdFromQuery);
      if(leadClient) setClientId(leadClient.id); 
      console.log("Pre-filling quote for lead ID:", leadIdFromQuery);
    }
  }, [leadIdFromQuery]);

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const handleLineItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: field === 'description' ? value : Number(value) } : item
    ));
  };

  const calculateSubtotal = () => lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const subtotal = calculateSubtotal();
  const taxAmount = subtotal * (taxRate / 100);
  const grandTotal = subtotal + taxAmount;

  const handleSubmit = (e: FormEvent, status: 'Draft' | 'Sent') => {
    e.preventDefault();
    const quoteData = {
      quoteId,
      clientId,
      quoteDate,
      expiryDate,
      lineItems,
      subtotal,
      taxRate,
      taxAmount,
      grandTotal,
      terms,
      notes,
      status,
    };
    console.log('Submitting Quote:', quoteData);
    alert(`Quote ${status === 'Draft' ? 'saved as Draft' : 'sent'} (mock)!`);
    router.push('/quotes'); // Redirect to quotes list
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <PlusCircle className='mr-3 h-8 w-8 text-primary' /> Create New Quote
        </h1>
        <Link href="/quotes" className='btn-secondary btn-sm'>
          <ArrowLeft size={16} className="mr-1.5" /> Back to Quotes List
        </Link>
      </div>

      <form className='bg-white p-6 sm:p-8 rounded-lg shadow space-y-8'>
        {/* Client & Quote Info */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <label htmlFor='clientId' className='form-label flex items-center'><User size={14} className="mr-1.5 text-gray-400"/>Client</label>
            <select id='clientId' name='clientId' value={clientId} onChange={(e) => setClientId(e.target.value)} className='default-select' required>
              <option value="" disabled>Select a client</option>
              {mockClients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='quoteId' className='form-label flex items-center'><Hash size={14} className="mr-1.5 text-gray-400"/>Quote ID</label>
            <input type='text' id='quoteId' value={quoteId} onChange={(e) => setQuoteId(e.target.value)} className='default-input' />
          </div>
          <div>
            <label htmlFor='quoteDate' className='form-label flex items-center'><CalendarDays size={14} className="mr-1.5 text-gray-400"/>Quote Date</label>
            <input type='date' id='quoteDate' value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} className='default-input' required/>
          </div>
          <div>
            <label htmlFor='expiryDate' className='form-label flex items-center'><CalendarDays size={14} className="mr-1.5 text-gray-400"/>Expiry Date</label>
            <input type='date' id='expiryDate' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className='default-input' />
          </div>
        </section>

        {/* Line Items Section */}
        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-3 flex items-center'><Package size={20} className="mr-2 text-primary"/>Line Items</h2>
          <div className='space-y-3'>
            {lineItems.map((item, index) => (
              <div key={item.id} className='grid grid-cols-12 gap-x-3 gap-y-2 items-center p-3 border rounded-md bg-gray-50/50'>
                <div className='col-span-12 sm:col-span-5'>
                  {index === 0 && <label className='form-label text-xs'>Description</label>}
                  <input type='text' placeholder='Service or Material Description' value={item.description} onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)} className='default-input input-sm' />
                </div>
                <div className='col-span-4 sm:col-span-2'>
                  {index === 0 && <label className='form-label text-xs'>Qty</label>}
                  <input type='number' placeholder='1' value={item.quantity} onChange={(e) => handleLineItemChange(item.id, 'quantity', e.target.value)} className='default-input input-sm text-right' min='0' step='any' />
                </div>
                <div className='col-span-4 sm:col-span-2'>
                  {index === 0 && <label className='form-label text-xs'>Unit Price</label>}
                  <input type='number' placeholder='0.00' value={item.unitPrice} onChange={(e) => handleLineItemChange(item.id, 'unitPrice', e.target.value)} className='default-input input-sm text-right' min='0' step='0.01' />
                </div>
                <div className='col-span-3 sm:col-span-2'>
                  {index === 0 && <label className='form-label text-xs'>Total</label>}
                  <input type='text' value={`$${(item.quantity * item.unitPrice).toFixed(2)}`} className='default-input input-sm text-right bg-gray-100' disabled />
                </div>
                <div className='col-span-1 flex items-end justify-end'>
                  {index > 0 && (
                    <button type='button' onClick={() => handleRemoveLineItem(item.id)} className='text-red-500 hover:text-red-700 p-1 mt-4 sm:mt-0' title='Remove line item'>
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button type='button' onClick={handleAddLineItem} className='btn-secondary btn-sm mt-4'>
            <PlusCircle size={16} className="mr-1.5" /> Add Line Item
          </button>
        </section>

        {/* Totals Section */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start pt-6 border-t'>
          <div className='md:col-span-2'> {/* Spacer or other info can go here */} </div>
          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span className='font-medium text-gray-600'>Subtotal:</span>
              <span className='font-semibold text-gray-800'>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor='taxRate' className='form-label mb-0 flex items-center'><Percent size={14} className="mr-1.5 text-gray-400"/>Tax Rate (%):</label>
              <input type='number' id='taxRate' value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} className='default-input input-sm w-20 text-right' min='0' step='0.01' />
            </div>
            <div className='flex justify-between'>
              <span className='font-medium text-gray-600'>Tax Amount:</span>
              <span className='font-semibold text-gray-800'>${taxAmount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-lg border-t pt-2 mt-2'>
              <span className='font-bold text-primary'>Grand Total:</span>
              <span className='font-bold text-primary'>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </section>
        
        {/* Terms & Conditions, Notes */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t'>
          <div>
            <label htmlFor='terms' className='form-label flex items-center'><Info size={14} className="mr-1.5 text-gray-400"/>Terms & Conditions</label>
            <textarea id='terms' value={terms} onChange={(e) => setTerms(e.target.value)} rows={5} className='default-textarea'></textarea>
          </div>
          <div>
            <label htmlFor='notes' className='form-label flex items-center'><ScrollText size={14} className="mr-1.5 text-gray-400"/>Internal Notes (Optional)</label>
            <textarea id='notes' value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} className='default-textarea'></textarea>
          </div>
        </section>

        {/* Action Buttons */}
        <section className='pt-6 border-t flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3'>
          <button type='button' onClick={(e) => handleSubmit(e, 'Draft')} className='btn-secondary'>
            <Save size={18} className="mr-2" /> Save as Draft
          </button>
          <button type='submit' onClick={(e) => handleSubmit(e, 'Sent')} className='btn-primary'>
            <Send size={18} className="mr-2" /> Send Quote
          </button>
        </section>
      </form>
    </div>
  );
};

// Add .input-sm to globals.css for smaller input fields if needed
// .input-sm { @apply py-1.5 text-xs; }

export default CreateQuotePage; 