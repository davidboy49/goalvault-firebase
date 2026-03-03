import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function GoalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-3xl font-semibold">Goal Detail</h1>
      <Card>
        <CardHeader>
          <CardTitle>Goal ID: {id}</CardTitle>
        </CardHeader>
        <CardContent>Placeholder detail with milestones, saved amount, and suggested contributions.</CardContent>
      </Card>
    </main>
  );
}
