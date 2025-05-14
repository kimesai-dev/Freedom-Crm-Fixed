import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Lead = {
  id: string;
  title: string;
  description: string;
  location: string;
  motivation: string;
  price: string;
};

const mockLeads: Lead[] = [
  {
    id: "1",
    title: "🔥 Fixer Upper – 3 Beds",
    description: "Seller relocating, roof and kitchen need work.",
    location: "Fort Wayne, IN",
    motivation: "Relocation",
    price: "$95,000",
  },
  {
    id: "2",
    title: "🏚️ Probate Sale – Must Close Fast",
    description: "Inherited home. Needs cosmetic updates. Great area.",
    location: "Angola, IN",
    motivation: "Probate",
    price: "$68,500",
  },
];

export default function LeadsPage() {
  return (
    <div className="space-y-8 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Leads Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLeads.map((lead) => (
          <Card
            key={lead.id}
            className="shadow-md rounded-xl border border-gray-200 bg-white hover:shadow-lg transition"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {lead.title}
                </h2>
                <Badge variant="outline">{lead.motivation}</Badge>
              </div>
              <p className="text-gray-600">{lead.description}</p>
              <div className="text-sm text-gray-500">
                📍 {lead.location} <span className="ml-4">💰 {lead.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
