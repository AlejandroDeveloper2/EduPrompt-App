import { Tag } from "@/features/tags/types";
import { UpdateResourceFormData } from "./validateSchema";

export interface UpdateResourceFormProps {
  isLoading: boolean;
  selectedTag: Tag | null;
  form: {
    data: Omit<UpdateResourceFormData, "sync">;
    handleChange: (
      field: keyof UpdateResourceFormData,
      value: string | number
    ) => void;
    handleClearInput: (name: keyof UpdateResourceFormData) => void;
    getFieldErrors: (
      fieldKey: keyof UpdateResourceFormData
    ) => string[] | undefined;
    handleSubmit: () => void;
  };
  onTagSelectionMode: () => void;
  onClosePopUp: () => void;
}
