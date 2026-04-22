import { Image, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useResponsive, useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";

import EmptyGenerationImage from "@/assets/images/empty-generations-list.png";

import { dynamicStyles } from "./GenerationCardList.style";

const GenerationEmpty = () => {
  const size = useResponsive();
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.EmptyContainer}>
      <Image
        source={EmptyGenerationImage}
        style={{ transform: [{ scale: size === "mobile" ? 0.8 : 1 }] }}
      />
      <Typography
        text={t(
          "generations_translations.generation_list_labels.empty_list_label",
        )}
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
