import { View } from "react-native";

import { ActionsProps } from "../types";

import Row from "./Row";

import { FormActionsStyle } from "../Form.style";

const Actions = ({ children, configRows }: ActionsProps) => {
  // Actions reusa la lógica de Row pero con estilos propios (alineación, por ejemplo)
  return (
    <View style={FormActionsStyle.FormActions}>
      <Row configRows={configRows}>{children}</Row>
    </View>
  );
};

export default Actions;
