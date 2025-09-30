import { ReactNode } from "react";

import { SizeType } from "@/lib/types";

interface FormProps {
  children: ReactNode | ReactNode[];
}

interface RowProps extends FormProps {
  configRows: { sm: number; md: number; lg: number };
}
type ActionsProps = RowProps;
type FieldsProps = FormProps;

// contexto para compartir tamaño y ancho del contenedor
type FormContextType = {
  size: SizeType;
  containerWidth: number;
  gap: number;
};

interface RowItemProps {
  children: ReactNode;
  span?: number;
}

export type {
  ActionsProps,
  FieldsProps,
  FormContextType,
  FormProps,
  RowItemProps,
  RowProps,
};
