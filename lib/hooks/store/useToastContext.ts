import { useContext } from "react";

import { ToastContext } from "@/lib/context";

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastContextProvider"
    );
  }
  return context;
};

export default useToastContext;
