import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("token");
    if (u && t) setUser(JSON.parse(u));
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
    }
    return res;
  };

  const register = async (fullName, email, password) => {
    const res = await api.register({ fullName, email, password });
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
