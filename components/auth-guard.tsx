"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

const PROTECTED_PREFIXES = ["/dashboard", "/goals", "/settings"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, onboardingCompleted } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const protectedPath = isProtectedPath(pathname);

  useEffect(() => {
    if (loading || !protectedPath) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [loading, onboardingCompleted, protectedPath, router, user]);

  if (!protectedPath) {
    return <>{children}</>;
  }

  if (loading) {
    return <div className="p-8 text-sm text-muted-foreground">Checking session...</div>;
  }

  if (!user || !onboardingCompleted) {
    return null;
  }

  return <>{children}</>;
}
