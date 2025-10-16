import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const toggleLoading = (loading: boolean, message: string | null): void => {
    setIsLoading(loading);
    setMessage(message);
  };

  return {
    isLoading,
    message,
    toggleLoading,
  };
};

export default useLoading;
