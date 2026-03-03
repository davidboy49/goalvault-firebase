import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GoalsPage() {
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-3xl font-semibold">Goals</h1>
      <Card>
        <CardHeader>
          <CardTitle>Goal list</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Placeholder list of user goals.</p>
          <Link className="text-sm underline" href="/goals/sample-id">
            Open example goal detail
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
