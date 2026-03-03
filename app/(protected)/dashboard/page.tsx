import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Savings Overview</CardTitle>
        </CardHeader>
        <CardContent>Placeholder widgets for balance, progress, and upcoming contributions.</CardContent>
      </Card>
    </main>
  );
}
