import { Pressable } from "react-native";

import { AppColors } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon } from "../icon/Icon";

import { CheckboxStyle } from "./Checkbox.style";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onCheck: () => void;
}

const Checkbox = ({ checked, onCheck, disabled }: CheckboxProps) => {
  const size = useScreenDimensionsStore();

  return (
    <Pressable
      disabled={disabled}
      onPress={onCheck}
      style={CheckboxStyle(size, checked, disabled).checkbox}
    >
      {checked && (
        <Ionicon name="checkmark" size={20} color={AppColors.neutral[1000]} />
      )}
    </Pressable>
  );
};

export default Checkbox;
