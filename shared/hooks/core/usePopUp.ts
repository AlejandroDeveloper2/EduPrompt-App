import { useCallback, useState } from "react";

const usePopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopUp = useCallback(() => setIsOpen(true), []);
  const closePopUp = useCallback(() => setIsOpen(false), []);
  const togglePopUp = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    openPopUp,
    closePopUp,
    togglePopUp,
  };
};

export default usePopUp;
