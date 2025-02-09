export type Role = "admin" | "user";

export interface User {
  username: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}
