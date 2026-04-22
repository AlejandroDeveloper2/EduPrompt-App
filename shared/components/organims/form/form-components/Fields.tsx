import { useContext } from "react";
import { View } from "react-native";

import { FieldsProps } from "../types";

import { FormContext } from "../formContext";

import { formFieldsStyles } from "../Form.style";

const Fields = ({ children }: FieldsProps) => {
  const { size } = useContext(FormContext);

  const styles = formFieldsStyles(size);

  return <View style={styles.FieldsSet}>{children}</View>;
};

export default Fields;
