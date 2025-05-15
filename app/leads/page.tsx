// ✅ CRM layout confirmed on /leads
// ✅ Vercel force deploy — remove stuck M
'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Lead = {
  id: string
  title: string
  description: string
  location: string
  motivation: string
  price: string
  link?: string
  summary?: string
}

const BASE_URL = "https://freedom-backend-production.up.railway.app"

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({})

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/leads/import`, { cache: "no-store" })
        const data = await res.json()
        setLeads(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("❌ Error fetching leads:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const toggleSummary = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading leads...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">🔥 Leads Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => {
          const motivation = parseInt(lead.motivation) || 0
          const badgeColor =
            motivation >= 8 ? "bg-green-100 text-green-800" :
            motivation >= 5 ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"

          return (
            <Card key={lead.id} className="rounded-xl bg-white shadow-lg border border-gray-200 transition">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{lead.title || "Untitled Lead"}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor}`}>
                    🔥 {lead.motivation || "?"}
                  </span>
                </div>
                {motivation >= 8 && (
                  <span className="text-xs font-bold text-red-600">🚨 HOT LEAD</span>
                )}
                <p className="text-sm text-gray-600">{lead.description}</p>
                <p className="text-sm text-gray-500">📍 {lead.location}</p>
                <p className="text-sm font-medium text-green-700">💰 {lead.price}</p>
                {lead.summary && (
                  <div className="text-xs text-gray-700 border-t pt-2">
                    <button
                      onClick={() => toggleSummary(lead.id)}
                      className="text-blue-600 hover:underline text-xs mb-1"
                    >
                      {expanded[lead.id] ? "Hide Summary" : "Show Summary"}
                    </button>
                    {expanded[lead.id] && (
                      <p className="whitespace-pre-line text-gray-700 mt-2 text-sm leading-snug">
                        {lead.summary}
                      </p>
                    )}
                  </div>
                )}
                {lead.link && (
                  <a
                    href={lead.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-blue-600 hover:underline"
                  >
                    🔗 View Listing
                  </a>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
