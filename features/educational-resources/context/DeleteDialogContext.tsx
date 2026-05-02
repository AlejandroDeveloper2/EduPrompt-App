import { createContext } from "react";

import { useAlert } from "@/shared/hooks/core";

const DeleteDialogContext = createContext<
  | {
      isOpen: boolean;
      openAlert: () => void;
      closeAlert: () => void;
      toggleAlert: () => void;
    }
  | undefined
>(undefined);

export function DeleteDialogProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const confirmResourceDeleteDialog = useAlert();
  return (
    <DeleteDialogContext.Provider value={confirmResourceDeleteDialog}>
      {children}
    </DeleteDialogContext.Provider>
  );
}

export default DeleteDialogContext;
