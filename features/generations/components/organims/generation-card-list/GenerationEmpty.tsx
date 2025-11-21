import { Image, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Typography } from "@/shared/components/atoms";

import EmptyGenerationImage from "@/assets/images/empty-generations-list.png";

import { GenerationCardListStyle } from "./GenerationCardList.style";

const GenerationEmpty = () => {
  const size = useScreenDimensionsStore();
  return (
    <View style={GenerationCardListStyle(size).EmptyContainer}>
      <Image
        source={EmptyGenerationImage}
        style={{ transform: [{ scale: size === "mobile" ? 0.8 : 1 }] }}
      />
      <Typography
        text="No hay generaciones iniciadas"
        weight="regular"
        type="button"
        textAlign="center"
        color={AppColors.neutral[600]}
        width="auto"
      />
    </View>
  );
};

export default GenerationEmpty;
