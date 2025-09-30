import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";

import { FormProps } from "./types";

import { Spacing } from "@/styles";
import { FormContext } from "./formContext";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Link } from "@/components/atoms";
import { Button, Dropdown, Input, InputCode } from "@/components/molecules";
import PromptInput from "../prompt-input/PromptInput";
import Actions from "./form-components/Actions";
import Fields from "./form-components/Fields";
import Row from "./form-components/Row";
import RowItem from "./form-components/RowItem";

import { FormStyle } from "./Form.style";

const Form = ({ children }: FormProps) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const size = useScreenDimensionsStore();

  // gap en px (usa tus tokens de spacing)
  const gap = size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md;

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = Math.round(e.nativeEvent.layout.width);
    if (width && width !== containerWidth) setContainerWidth(width);
  };

  return (
    <FormContext.Provider value={{ size, containerWidth, gap }}>
      <View style={FormStyle(size).FormBody} onLayout={handleLayout}>
        {children}
      </View>
    </FormContext.Provider>
  );
};

// Tipado para adjuntar subcomponentes
type FormComponent = typeof Form & {
  Fields: typeof Fields;
  Row: typeof Row & { Item: typeof RowItem };
  Actions: typeof Actions;
  Input: typeof Input;
  Dropdown: typeof Dropdown;
  InputCode: typeof InputCode;
  Button: typeof Button;
  Link: typeof Link;
  PromptInput: typeof PromptInput;
};

Form.Fields = Fields;
Form.Row = Object.assign(Row, { Item: RowItem });
Form.Actions = Actions;
Form.Input = Input;
Form.Dropdown = Dropdown;
Form.InputCode = InputCode;
Form.Button = Button;
Form.Link = Link;
Form.PromptInput = PromptInput;

export default Form as unknown as FormComponent;
