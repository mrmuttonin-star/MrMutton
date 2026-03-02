import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

interface UserData {
  id: number;
  email: string;
  full_name: string | null;
  phone: string | null;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: {
    full_name?: string;
    phone?: string;
  }) => Promise<{ error: any }>;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // App load hone pe localStorage se token check karo
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });
      const data = await res.json();

      if (!res.ok) return { error: { message: data.error } };

      // Auto login after signup
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      return { error: null };
    } catch (err) {
      return { error: { message: "Network error. Please try again." } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
  return { error: { message: data.message || "Login failed" } };
}

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return { error: null };
    } catch (err) {
      return { error: { message: "Network error. Please try again." } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates: {
    full_name?: string;
    phone?: string;
  }) => {
    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const data = await res.json();
        return { error: { message: data.error } };
      }

      // Update local state
      const updatedUser = { ...user!, ...updates };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));

      return { error: null };
    } catch (err) {
      return { error: { message: "Network error." } };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut, updateProfile, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
