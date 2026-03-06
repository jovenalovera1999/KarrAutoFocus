"use client";

import { UserColumns } from "@/interfaces/UserInterface";
import AuthService from "@/services/AuthService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAlert } from "./AlertContext";
import { AuthFieldsErrors } from "@/interfaces/AuthInterface";

interface AuthContextType {
  user: UserColumns | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => void;
  fieldErrors: AuthFieldsErrors;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { showAlert } = useAlert();
  const [user, setUser] = useState<UserColumns | null>(null);
  const [loading, setLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<AuthFieldsErrors>({});

  const refreshUser = async () => {
    try {
      const { status, data } = await AuthService.me();

      if (status !== 200) {
        console.error("Status error refreshing user: ", status);
        setUser(null);
        return;
      }

      setUser(data);
    } catch (error: any) {
      console.error("Server error refreshing user: ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const { status } = await AuthService.login(username, password);

      if (status !== 200) {
        console.error("Status error logging user in: ", status);
        return false;
      }

      await refreshUser();
      return true;
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setFieldErrors(error.response.data.errors);
        return false;
      } else if (error.response && error.response.status === 401) {
        showAlert({
          variant: "error",
          title: "Invalid Credentials",
          message: error.response.data.message,
        });
        return false;
      }

      console.error("Server error logging user in: ", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error: any) {
      console.error("Server error logging user out: ", error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser, fieldErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
