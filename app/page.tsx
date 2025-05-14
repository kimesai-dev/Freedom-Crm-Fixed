// Final summary field update to force push
// Final save trigger to ensure deploy
// temp touch to trigger commit
import { Card, CardContent } from "@/components/ui/card";

type Lead = {
  id: string;
  title: string;
  description: string;
  location: string;
  motivation: string;
  price: string;
  link?: string;
  summary?: string; // ✅ this is what TypeScript is complaining about
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
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Leads Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => {
          const motivation = parseInt(lead.motivation) || 0;
          const motivationColor =
            motivation >= 8 ? "bg-green-100 text-green-800" :
            motivation >= 5 ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800";
  
          return (
            <Card key={lead.id} className="rounded-xl shadow-md">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{lead.title || "Untitled Lead"}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${motivationColor}`}>
                    🔥 Motivation: {lead.motivation || "?"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{lead.description}</p>
                <p className="text-sm text-gray-500">📍 {lead.location}</p>
                <p className="text-sm font-medium text-green-700">💰 {lead.price}</p>
                {lead.summary && (
                  <p className="text-xs text-gray-700 border-t pt-2">
                    🤖 <strong>GPT Summary:</strong><br />{lead.summary}
                  </p>
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
          );
        })}
      </div>
    </div>
  );
  
  
}
 