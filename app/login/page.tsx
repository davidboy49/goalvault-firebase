"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { user, onboardingCompleted } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    router.replace(onboardingCompleted ? "/dashboard" : "/onboarding");
  }, [onboardingCompleted, router, user]);

  const handleEmailLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Unable to sign in with email/password. Add your auth users in Firebase console.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profileRef = doc(db, "users", result.user.uid);
      const profile = await getDoc(profileRef);

      if (!profile.exists()) {
        await setDoc(profileRef, {
          email: result.user.email,
          provider: GoogleAuthProvider.PROVIDER_ID,
          onboardingCompleted: false,
          createdAt: new Date().toISOString(),
        });
      }
    } catch {
      setError("Google sign-in failed. Make sure Google provider is enabled in Firebase Auth.");
    }
  };

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to GoalVault</CardTitle>
            <CardDescription>Sign in with Email or Google to start tracking savings goals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full" onClick={handleEmailLogin}>Email Sign In</Button>
            <Button className="w-full" variant="outline" onClick={handleGoogleLogin}>Continue with Google</Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
