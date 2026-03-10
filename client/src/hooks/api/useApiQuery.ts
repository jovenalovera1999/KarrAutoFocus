import { useCallback, useState } from "react";

interface UseApiQueryOptions<T> {
  apiService: () => Promise<{ status: number; data: T }>;
}

export default function useApiQuery<T>({ apiService }: UseApiQueryOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await apiService();
      setData(data);
    } catch (error) {
      console.error("Server error api query: ", error);
    } finally {
      setLoading(false);
    }
  }, [apiService]);

  return { data, loading, load };
}
