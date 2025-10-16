import { useContext } from "react";
import { View } from "react-native";

import { FieldsProps } from "../types";

import { FormContext } from "../formContext";

import { FormFieldsStyle } from "../Form.style";

const Fields = ({ children }: FieldsProps) => {
  const { size } = useContext(FormContext);
  return <View style={FormFieldsStyle(size).FieldsSet}>{children}</View>;
};

export default Fields;
