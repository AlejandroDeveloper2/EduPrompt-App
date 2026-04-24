import { Pressable } from "react-native";

import { AppColors } from "../../../styles";

import useResponsive from "@/shared/hooks/core/useResponsive";

import { Ionicon } from "../icon/Icon";

import { dynamicStyles } from "./Checkbox.style";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onCheck: () => void;
}

const Checkbox = ({ checked, onCheck, disabled }: CheckboxProps) => {
  const size = useResponsive();

  const styles = dynamicStyles(size, checked, disabled);

  return (
    <Pressable disabled={disabled} onPress={onCheck} style={styles.checkbox}>
      {checked && (
        <Ionicon name="checkmark" size={20} color={AppColors.neutral[1000]} />
      )}
    </Pressable>
  );
};

export default Checkbox;
