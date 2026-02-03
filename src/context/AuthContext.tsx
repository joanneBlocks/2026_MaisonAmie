import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

/* Props */
type AuthProviderProps = {
  children: ReactNode;
};

/* Context Type */
type AuthContextType = {
  session: Session | null;
  signUpNewUser: (email: string, password: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
};

/* Create Context */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* Provider Component */
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  // ---------------- Sign Up ----------------
  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return { success: false, error };
    }

    return { success: true, data };
  };

  // ---------------- Sign In ----------------
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        return { success: false, error: error.message };
      }

      // Update session immediately
      setSession(data.session ?? null);

      console.log("Sign-in successful:", data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Unexpected error occurred." };
    }
  };

  // ---------------- Session Listener ----------------
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for changes in auth state
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ---------------- Sign Out ----------------
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear session immediately for UI to react
      setSession(null);

      console.log("User signed out successfully");
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  // ---------------- Provider ----------------
  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* Safe Hook */
export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("UserAuth must be used inside AuthContextProvider");
  return context;
};
