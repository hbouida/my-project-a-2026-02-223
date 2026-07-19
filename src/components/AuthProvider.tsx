"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LocalUser, clearCurrentUser, getCurrentUser, persistCurrentUser } from "@/lib/localAuth";

interface AuthContextValue {
  user: LocalUser | null;
  loaded: boolean;
  signIn: (user: LocalUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Syncing from localStorage after the hydration-matching first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getCurrentUser());
    setLoaded(true);
  }, []);

  function signIn(nextUser: LocalUser) {
    persistCurrentUser(nextUser);
    setUser(nextUser);
  }

  function signOut() {
    clearCurrentUser();
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loaded, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
