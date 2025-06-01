import { supabase } from './supabase'
import type { Client, Job, Lead, Quote, Invoice } from './supabase'

// Client operations
export const clientOperations = {
  async create(client: Omit<Client, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Error creating client: ${error.message}`);
    }
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<Client>) {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Job operations
export const jobOperations = {
  async create(job: Omit<Job, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('jobs')
      .insert([job])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, clients(*)')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getByClientId(clientId: number) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Lead operations
export const leadOperations = {
  async create(lead: Omit<Lead, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Quote operations
export const quoteOperations = {
  async create(quote: Omit<Quote, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('quotes')
      .insert([quote])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getByClientId(clientId: number) {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Invoice operations
export const invoiceOperations = {
  async create(invoice: Omit<Invoice, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('invoices')
      .insert([invoice])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getByClientId(clientId: number) {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
} 