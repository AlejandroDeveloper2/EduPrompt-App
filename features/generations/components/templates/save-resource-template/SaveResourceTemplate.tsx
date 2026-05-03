import { useRouter } from "expo-router";
import { View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { AppColors } from "@/shared/styles";

import { useSaveResourceFormLogic } from "@/features/generations/hooks/forms";
import { useGenerationPromptViewStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import {
  GenerationResourceTagSelectionList,
  SaveResourceForm,
} from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const SaveResourceTemplate = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const { isTagSelection, setIsTagSelection, reset } =
    useGenerationPromptViewStore(
      useShallow((state) => ({
        isTagSelection: state.isTagSelection,
        setIsTagSelection: state.setIsTagSelection,
        reset: state.reset,
      })),
    );

  const { isLoading, selectedTag, onTagTypeChange, form } =
    useSaveResourceFormLogic(() => router.back());

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={
            isTagSelection
              ? t(
                  "generations_translations.ia_response_card_labels.select_tag_popup_labels.title",
                )
              : t(
                  "generations_translations.ia_response_card_labels.save_resource_popup_labels.title",
                )
          }
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon={isTagSelection ? "pricetag-outline" : "save-outline"}
        />
      </View>
      {isTagSelection ? (
        <GenerationResourceTagSelectionList
          selectedTag={selectedTag}
          onSelectTag={(tag) => form.handleChange("groupTag", tag?.tagId ?? "")}
        />
      ) : (
        <SaveResourceForm
          isLoading={isLoading}
          selectedTag={selectedTag}
          form={form}
          onTagSelectionMode={() => setIsTagSelection(true)}
          onClosePopUp={() => {
            reset();
            router.back();
          }}
          setTagType={onTagTypeChange}
        />
      )}
    </>
  );
};

export default SaveResourceTemplate;
