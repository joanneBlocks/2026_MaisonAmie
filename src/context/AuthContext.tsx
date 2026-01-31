import {
  createContext,
  useContext,
  useState,
  } from "react";

// ✅ Define the type for your session
type SessionType = {
  user: string | null;
} | null;

// ✅ Define the context type
type AuthContextType = {
  session: SessionType;
  setSession: React.Dispatch<React.SetStateAction<SessionType>>;
};

// ✅ Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider props type
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<SessionType>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }

  return context;
};
