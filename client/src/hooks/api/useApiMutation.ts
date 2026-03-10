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

      const { data } = await apiService();
      onSuccess?.(data);
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        onValidationError?.(error.response.data.errors);
        return;
      }

      console.error("Server error api mutation: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
}
