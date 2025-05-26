import { Pressable } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Ionicon } from "../icon/Icon";

import { CheckboxStyle } from "./Checkbox.style";

interface CheckboxProps {
  checked: boolean;
  onCheck: () => void;
}

const Checkbox = ({ checked, onCheck }: CheckboxProps) => {
  const size = useScreenDimensionsStore();

  return (
    <Pressable onPress={onCheck} style={CheckboxStyle(size, checked).checkbox}>
      {checked && (
        <Ionicon name="checkmark" size={20} color={AppColors.neutral[1000]} />
      )}
    </Pressable>
  );
};

export default Checkbox;
