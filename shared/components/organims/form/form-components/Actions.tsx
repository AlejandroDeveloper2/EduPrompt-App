import { View } from "react-native";

import { ActionsProps } from "../types";

import Row from "./Row";

import { formActionsStyles } from "../Form.style";

const Actions = ({ children, configRows }: ActionsProps) => {
  // Actions reusa la lógica de Row pero con estilos propios (alineación, por ejemplo)
  return (
    <View style={formActionsStyles.FormActions}>
      <Row configRows={configRows}>{children}</Row>
    </View>
  );
};

export default Actions;
