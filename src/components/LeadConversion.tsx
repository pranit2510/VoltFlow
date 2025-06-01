import { useState, useEffect } from 'react'
import { leadConversionOperations } from '@/lib/lead-conversion'
import { leadOperations } from '@/lib/supabase-client'
import type { Lead } from '@/lib/supabase'

export default function LeadConversion() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [leadsData, statsData] = await Promise.all([
        leadOperations.getAll(),
        leadConversionOperations.getConversionStats()
      ])
      setLeads(leadsData)
      setStats(statsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleConvert = async (leadId: number) => {
    try {
      setLoading(true)
      await leadConversionOperations.convertLeadToClient(leadId)
      await loadData() // Reload data after conversion
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert lead')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Conversion Rate</h3>
          <p className="text-2xl font-bold">{stats?.conversionRate.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Leads</h3>
          <p className="text-2xl font-bold">{stats?.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Converted</h3>
          <p className="text-2xl font-bold">{stats?.converted}</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{lead.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${lead.status === 'qualified' ? 'bg-green-100 text-green-800' : 
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'lost' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {lead.status === 'qualified' && (
                    <button
                      onClick={() => handleConvert(lead.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Convert to Client
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 