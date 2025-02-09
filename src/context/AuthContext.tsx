import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, User } from "./AuthContext.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<{ username: string; role: "admin" | "user" }>(
        token
      );
      setUser(decoded);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
