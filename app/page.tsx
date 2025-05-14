// Final save trigger to ensure deploy
// temp touch to trigger commit
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Lead = {
  id: string;
  title: string;
  description: string;
  location: string;
  motivation: string;
  price: string;
  link?: string; // ✅ optional, so it doesn’t break if undefined
};


const BASE_URL = "https://freedom-backend-production.up.railway.app";

async function getLeads(): Promise<Lead[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/leads/import`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch leads");

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("❌ Backend returned non-array:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error("❌ Error in getLeads():", err);
    return [];
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-8 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Leads Dashboard</h1>
      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{lead.title}</h2>
                <Badge>{lead.motivation || "Unknown"}</Badge>
              </div>
              <p className="text-sm text-gray-600">{lead.description}</p>
              <p className="text-sm text-gray-500">📍 {lead.location}</p>
              <p className="text-sm font-medium text-green-700">💰 {lead.price}</p>
              {lead.link && (
                <a
                  href={lead.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                >
                  🔗 View Listing
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  
}
 