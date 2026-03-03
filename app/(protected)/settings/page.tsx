import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>User settings</CardTitle>
        </CardHeader>
        <CardContent>Placeholder for profile preferences, notification settings, and account options.</CardContent>
      </Card>
    </main>
  );
}
