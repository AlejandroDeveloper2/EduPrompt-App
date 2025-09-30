import { Children, isValidElement, useContext, useMemo } from "react";
import { View, ViewStyle } from "react-native";

import { RowItemProps, RowProps } from "../types";

import { FormContext } from "../formContext";

import RowItem from "./RowItem";

import { FormRowStyle } from "../Form.style";

const Row = ({ children, configRows }: RowProps) => {
  const { size, containerWidth, gap } = useContext(FormContext);

  // número de columnas según breakpoint
  const columns = useMemo(() => {
    if (size === "mobile") return configRows.sm;
    if (size === "tablet") return configRows.md;
    return configRows.lg;
  }, [size, configRows]);

  // ancho por columna en px (cuando conocemos containerWidth)
  const colBasePx =
    containerWidth > 0
      ? Math.floor((containerWidth - gap * (columns - 1)) / columns)
      : 0;

  // convertimos children en array y leemos span si viene de Row.Item
  const items = Children.toArray(children);

  return (
    <View style={FormRowStyle(gap).FormRow}>
      {items.map((child, idx) => {
        // detectar si el child es nuestro RowItem para extraer span
        let span = 1;
        if (isValidElement(child) && child.type === RowItem) {
          span = (child.props as RowItemProps).span || 1;
          // extraer el verdadero elemento interno
          // child = child.props.children; // no reasignamos, sólo renderizamos child.props.children
        }

        // si tenemos containerWidth calculado, usamos px; si no, fallback a %
        const itemWidthStyle: ViewStyle =
          containerWidth > 0
            ? { width: colBasePx * span + gap * (span - 1) }
            : { width: `${(span / columns) * 100}%` };

        // cada item tendrá padding para simular gap
        return (
          <View
            key={idx}
            style={[
              {
                paddingHorizontal: gap / 2,
                marginBottom: gap,
                paddingVertical: 0,
              },
              itemWidthStyle,
            ]}
          >
            {/* si es RowItem, renderizamos su children; si no, renderizamos el propio elemento */}
            {isValidElement(child) && child.type === RowItem
              ? (child.props as RowItemProps).children
              : child}
          </View>
        );
      })}
    </View>
  );
};

export default Row;
