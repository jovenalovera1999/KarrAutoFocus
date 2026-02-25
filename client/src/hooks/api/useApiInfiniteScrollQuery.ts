"use client";

import { useCallback, useRef, useState } from "react";

interface UseApiInfiniteScrollQueryOptions<T> {
  apiService: (page: number) => Promise<{
    status: number;
    data: {
      data: T[];
      lastPage: number;
    };
  }>;
}

export default function useApiInfiniteScrollQuery<T>({
  apiService,
}: UseApiInfiniteScrollQueryOptions<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastPage, setLastPage] = useState<number | null>(null);

  const pageRef = useRef(1);

  const load = useCallback(
    async (page: number) => {
      if (
        (page === 1 && isLoading) ||
        (page > 1 && isLoadingMore) ||
        (lastPage !== null && page > lastPage)
      ) {
        return;
      }

      page === 1 ? setIsLoading(true) : setIsLoadingMore(true);

      try {
        const { status, data } = await apiService(page);

        if (status !== 200) {
          console.error("Status error api infinite scroll query: ", status);
          return;
        }

        setItems((prev) => (page === 1 ? data.data : [...prev, ...data.data]));

        setLastPage(data.lastPage);
        pageRef.current = page;

        console.log(items);
      } catch (error) {
        console.error("Server error api infinite scroll query: ", error);
      } finally {
        page === 1 ? setIsLoading(false) : setIsLoadingMore(false);
      }
    },
    [apiService, isLoading, isLoadingMore, lastPage],
  );

  const handleScroll = useCallback(
    (container: HTMLElement | null) => {
      if (
        !container ||
        isLoading ||
        isLoadingMore ||
        (lastPage && pageRef.current >= lastPage)
      ) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        load(pageRef.current + 1);
      }
    },
    [isLoading, isLoadingMore, lastPage, load],
  );

  const reset = () => {
    setItems([]);
    setLastPage(null);
    pageRef.current = 1;
  };

  return { items, load, handleScroll, isLoading, isLoadingMore, reset };
}
