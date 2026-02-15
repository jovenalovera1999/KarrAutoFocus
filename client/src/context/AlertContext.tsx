"use client";

import Alert from "@/components/ui/alert/Alert";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertOptions {
  variant: AlertVariant;
  title: string;
  message: string;
  duration?: number;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlert(options);
    setIsVisible(true);
    setIsClosing(false);

    const duration = options.duration || 4000;

    setTimeout(() => {
      setIsClosing(true);

      setTimeout(() => {
        setIsVisible(false);
        setAlert(null);
      }, 300);
    }, duration);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <div
          className={`fixed bottom-6 right-6 z-999999 w-full max-w-sm ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
        >
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }

  return context;
};
