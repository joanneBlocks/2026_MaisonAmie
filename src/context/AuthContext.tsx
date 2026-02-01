import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

/* ✅ Props */
type AuthProviderProps = {
  children: ReactNode;
};

/* ✅ Context Type */
type AuthContextType = {
  session: Session | null;
  signUpNewUser: (email: string, password: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
};

/* ✅ Create Context */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/* ✅ Provider Component */
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  // ✅ Sign up
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

  // ✅ Sign in
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
      console.log("Sign-in successful:", data); 
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: "Unexpected error occurred.",
      };
    }
  };

  // ✅ Session Listener + Cleanup
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  };

  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ✅ Safe Hook */
export const UserAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UserAuth must be used inside AuthContextProvider");
  }

  return context;
};
