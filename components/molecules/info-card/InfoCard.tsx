import { View } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";

import { InfoCardStyle } from "./InfoCard.style";

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard = ({ title, description }: InfoCardProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={InfoCardStyle(size).CardContainer}>
      <Typography
        text={title}
        weight="bold"
        type="button"
        textAlign="center"
        color={AppColors.neutral[700]}
        width="100%"
        icon="information-circle-outline"
      />
      <Typography
        text={description}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={AppColors.neutral[900]}
        width="100%"
      />
    </View>
  );
};

export default InfoCard;
