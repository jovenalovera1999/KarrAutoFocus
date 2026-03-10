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
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserColumns | null;
  loading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  //   refreshUser: () => void;
  fieldErrors: AuthFieldsErrors;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { showAlert } = useAlert();
  const router = useRouter();

  const [user, setUser] = useState<UserColumns | null>(null);
  const [loading, setLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<AuthFieldsErrors>({});

  const fetchUser = async () => {
    try {
      const { data } = await AuthService.getUser();
      setUser(data);
    } catch (error: any) {
      setUser(null);

      if (error.response && error.response.status === 401) {
        router.replace("/");
      }

      console.error("Error fetching user: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);

      await AuthService.csrf();

      const { data: loginData } = await AuthService.login(username, password);
      setUser(loginData.user);

      setFieldErrors({});
      router.push("/car/unit/all");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setFieldErrors(error.response.data.errors);
        return;
      } else if (error.response && error.response.status === 401) {
        showAlert({
          variant: "error",
          title: "Invalid Credentials",
          message: error.response.data.message,
        });
        return;
      }

      console.error("Server error during login: ", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      const { data } = await AuthService.logout();
      setUser(null);

      router.push("/");
      showAlert({
        variant: "success",
        title: "Logged Out",
        message: data.message,
      });
    } catch (error: any) {
      console.error("Server error during logout: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fieldErrors }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
