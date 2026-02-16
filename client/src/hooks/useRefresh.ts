import { useCallback, useState } from "react";

export const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  return { refresh, handleRefresh };
};
