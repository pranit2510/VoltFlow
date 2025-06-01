import { supabase } from './supabase'
import { leadOperations } from './supabase-client'
import { clientOperations } from './supabase-client'
import type { Lead, Client } from './supabase'

export const leadConversionOperations = {
  async convertLeadToClient(leadId: number): Promise<Client> {
    // Get the lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single()

    if (leadError) throw new Error(`Error fetching lead: ${leadError.message}`)
    if (!lead) throw new Error('Lead not found')

    // Create new client from lead data
    const newClient: Omit<Client, 'id' | 'created_at'> = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      notes: `Converted from lead. Source: ${lead.source}. Original notes: ${lead.notes}`,
      address: '',
      status: 'active'
    }

    // Create the client
    const client = await clientOperations.create(newClient)

    // Update lead status to 'converted'
    const { error: updateError } = await supabase
      .from('leads')
      .update({ status: 'converted' })
      .eq('id', leadId)

    if (updateError) throw new Error(`Error updating lead status: ${updateError.message}`)

    return client
  },

  async getConversionStats() {
    const { data, error } = await supabase
      .from('leads')
      .select('status')
    
    if (error) throw new Error(`Error fetching conversion stats: ${error.message}`)

    const stats = {
      total: data.length,
      converted: data.filter(lead => lead.status === 'converted').length,
      new: data.filter(lead => lead.status === 'new').length,
      contacted: data.filter(lead => lead.status === 'contacted').length,
      qualified: data.filter(lead => lead.status === 'qualified').length,
      lost: data.filter(lead => lead.status === 'lost').length
    }

    return {
      ...stats,
      conversionRate: stats.total > 0 ? (stats.converted / stats.total) * 100 : 0
    }
  }
} 