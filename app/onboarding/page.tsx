"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/providers/auth-provider";
import { db } from "@/lib/firebase";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading, onboardingCompleted } = useAuth();
  const [currency, setCurrency] = useState("USD");
  const [schedule, setSchedule] = useState("monthly");
  const [incomeBuffer, setIncomeBuffer] = useState("20");

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    if (onboardingCompleted) router.replace("/dashboard");
  }, [loading, onboardingCompleted, router, user]);

  const completeOnboarding = async () => {
    if (!user) return;
    await setDoc(
      doc(db, "users", user.uid),
      {
        currency,
        schedule,
        incomeBuffer: Number(incomeBuffer),
        onboardingCompleted: true,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
    router.replace("/dashboard");
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
          <CardDescription>Set your default planning preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm">Preferred currency</p>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="mb-2 text-sm">Savings schedule</p>
            <Select value={schedule} onValueChange={setSchedule}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="mb-2 text-sm">Income buffer (%)</p>
            <Input value={incomeBuffer} onChange={(e) => setIncomeBuffer(e.target.value)} />
          </div>
          <Button onClick={completeOnboarding}>Save and continue</Button>
        </CardContent>
      </Card>
    </main>
  );
}
