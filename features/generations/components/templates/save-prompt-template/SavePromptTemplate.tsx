import { useRouter } from "expo-router";
import { View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { AppColors } from "@/shared/styles";

import { useSavePromptFormLogic } from "@/features/generations/hooks/forms";
import { useGenerationPromptViewStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import {
  GenerationPromptTagSelectionList,
  SavePromptForm,
} from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const SavePromptTemplate = () => {
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

  const { isLoading, selectedTag, form, onTagTypeChange } =
    useSavePromptFormLogic(() => router.back());

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={
            isTagSelection
              ? t(
                  "prompts_translations.prompt_list_labels.tag_list_labels_popup.title",
                )
              : t(
                  "generations_translations.resource_description_template.save_prompt_popup_labels.title",
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
        <GenerationPromptTagSelectionList
          selectedTag={selectedTag}
          onSelectTag={(tag) => form.handleChange("tag", tag?.tagId ?? "")}
        />
      ) : (
        <SavePromptForm
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

export default SavePromptTemplate;
