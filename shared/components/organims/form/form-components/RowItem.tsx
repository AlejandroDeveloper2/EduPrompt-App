import { RowItemProps } from "../types";

const RowItem = ({ children, span = 1 }: RowItemProps) => {
  // Row.Item simplemente marca el span; el cálculo de ancho lo hace Row
  return <>{children}</>;
};

export default RowItem;
