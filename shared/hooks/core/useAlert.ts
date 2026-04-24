import { useCallback, useState } from "react";

const useAlert = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openAlert = useCallback(() => setIsOpen(true), []);
  const closeAlert = useCallback(() => setIsOpen(false), []);
  const toggleAlert = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    openAlert,
    closeAlert,
    toggleAlert,
  };
};

export default useAlert;
