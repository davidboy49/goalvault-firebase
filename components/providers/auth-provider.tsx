"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  onboardingCompleted: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  onboardingCompleted: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setOnboardingCompleted(false);
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      setOnboardingCompleted(Boolean(userDoc.data()?.onboardingCompleted));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({ user, loading, onboardingCompleted }),
    [user, loading, onboardingCompleted],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
