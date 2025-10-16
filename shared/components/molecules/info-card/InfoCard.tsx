import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AppColors } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { Typography } from "../../atoms";

import Button from "../button/Button";

import { InfoCardStyle } from "./InfoCard.style";

interface InfoCardProps {
  title: string;
  description: string;
  buttonData?: {
    loading?: boolean;
    loadingMessage?: string;
    label?: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

const InfoCard = ({ title, description, buttonData }: InfoCardProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={InfoCardStyle(size).CardContainer}>
      <Typography
        text={title}
        weight="bold"
        type="button"
        textAlign="center"
        color={AppColors.neutral[700]}
        width="auto"
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
      {buttonData && (
        <Button
          icon={buttonData.icon}
          width="auto"
          variant="primary"
          label={buttonData?.label}
          onPress={buttonData.onPress}
          loading={buttonData.loading}
          loadingMessage={buttonData.loadingMessage}
        />
      )}
    </View>
  );
};

export default InfoCard;
