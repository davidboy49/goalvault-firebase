"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, onboardingCompleted } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!onboardingCompleted && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [loading, onboardingCompleted, pathname, router, user]);

  if (loading) {
    return <div className="p-8 text-sm text-muted-foreground">Checking session...</div>;
  }

  if (!user) {
    return null;
  }

  if (!onboardingCompleted && pathname !== "/onboarding") {
    return null;
  }

  return <>{children}</>;
}
