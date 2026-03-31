import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "teacher";
  avatar?: string;
  bio: string;
  joinDate: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: "student" | "teacher") => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USER: User = {
  id: "1",
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah.chen@coursecraft.io",
  role: "teacher",
  avatar: "",
  bio: "Senior software engineer and educator with 8+ years of experience in full-stack development. Passionate about making complex topics accessible.",
  joinDate: "2024-09-15",
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(MOCK_USER);

  const isAuthenticated = user !== null;

  const login = (email: string, _password: string, role: "student" | "teacher") => {
    // Mock login - creates a user based on email and role
    const [firstName, lastName] = email.split("@")[0].split(".").map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    );
    
    const newUser: User = {
      id: Date.now().toString(),
      firstName: firstName || "User",
      lastName: lastName || "",
      email,
      role,
      avatar: "",
      bio: "",
      joinDate: new Date().toISOString().split("T")[0],
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const switchRole = () => {
    setUser(prev => 
      prev ? { ...prev, role: prev.role === "student" ? "teacher" : "student" } : null
    );
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
