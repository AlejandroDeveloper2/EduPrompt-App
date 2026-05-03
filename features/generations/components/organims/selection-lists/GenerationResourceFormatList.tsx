import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

import { RESOURCE_FORMATS } from "@/features/generations/constants";
import { ResourceFormat } from "@/features/generations/types";

import { useResourceGenerationStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { AppColors } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationResourceFormatList = () => {
  const router = useRouter();
  const { t, lang } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore();

  const resourceFormatList = useMemo(() => RESOURCE_FORMATS[lang], [lang]);

  const selectedFormat = useMemo(
    () =>
      resourceFormatList.find(
        (format) =>
          format.formatKey ===
          currentIaGeneration?.data.resourceFormat.formatKey,
      ),
    [resourceFormatList, currentIaGeneration],
  );

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "generations_translations.resource_format_template.resource_format_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="shapes-outline"
        />
      </View>
      <DropdownOptionList<ResourceFormat>
        optionList={resourceFormatList}
        optionIdkey="formatKey"
        optionLabelKey="formatLabel"
        searchInputPlaceholder={t(
          "generations_translations.resource_format_template.resource_format_popup_labels.search_input_placeholder",
        )}
        selectedOption={selectedFormat ?? null}
        onSelectOption={(option) => {
          if (!currentIaGeneration) return;
          updateIaGeneration(
            currentIaGeneration.generationId,
            { resourceFormat: option },
            {},
            {},
          );
          router.back();
        }}
      />
    </>
  );
};

export default GenerationResourceFormatList;
