import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

import { EDUCATIONAL_RESOURCE_TYPES } from "@/features/generations/constants";
import { ResourceType } from "@/features/generations/types";

import { useResourceGenerationStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { AppColors } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationResourceTypeList = () => {
  const router = useRouter();
  const { t, lang } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore();

  const resourceTypeList = useMemo(
    () => EDUCATIONAL_RESOURCE_TYPES[lang],
    [lang],
  );

  const selectedResourceType = useMemo(
    () =>
      resourceTypeList.find(
        (type) =>
          type.resourceTypeId ===
          currentIaGeneration?.data.resourceType.resourceTypeId,
      ),
    [resourceTypeList, currentIaGeneration],
  );

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "generations_translations.resource_type_template.resource_type_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="text-outline"
        />
      </View>
      <DropdownOptionList<ResourceType>
        optionList={resourceTypeList}
        optionIdkey="resourceTypeId"
        optionLabelKey="resourceTypeLabel"
        searchInputPlaceholder={t(
          "generations_translations.resource_type_template.resource_type_popup_labels.search_input_placeholder",
        )}
        selectedOption={selectedResourceType ?? null}
        onSelectOption={(option) => {
          if (!currentIaGeneration) return;
          updateIaGeneration(
            currentIaGeneration.generationId,
            { resourceType: option },
            {},
            {},
          );
          router.back();
        }}
      />
    </>
  );
};

export default GenerationResourceTypeList;
