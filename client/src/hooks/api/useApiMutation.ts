import { useState } from "react";

interface ApiHandlerOptions {
  apiService: () => Promise<{ status: number; data: any }>;
  onSuccess?: (data: any) => void;
  onValidationError?: (errors: any) => void;
}

export default function useApiMutation() {
  const [loading, setLoading] = useState(false);

  const execute = async ({
    apiService,
    onSuccess,
    onValidationError,
  }: ApiHandlerOptions) => {
    try {
      setLoading(true);

      const { status, data } = await apiService();

      if (status !== 200) {
        console.error("Status error api mutation: ", status);
        return;
      }

      onSuccess?.(data);
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error("Server error api mutation: ", error);
        return;
      }

      onValidationError?.(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
}
