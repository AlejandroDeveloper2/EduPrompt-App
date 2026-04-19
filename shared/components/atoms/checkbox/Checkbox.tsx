import { useMemo } from "react";
import { Pressable } from "react-native";

import { AppColors } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon } from "../icon/Icon";

import { dynamicStyles } from "./Checkbox.style";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onCheck: () => void;
}

const Checkbox = ({ checked, onCheck, disabled }: CheckboxProps) => {
  const size = useScreenDimensionsStore();

  const styles = useMemo(
    () => dynamicStyles(size, checked, disabled),
    [checked, disabled, size],
  );

  return (
    <Pressable disabled={disabled} onPress={onCheck} style={styles.checkbox}>
      {checked && (
        <Ionicon name="checkmark" size={20} color={AppColors.neutral[1000]} />
      )}
    </Pressable>
  );
};

export default Checkbox;
