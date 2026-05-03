import { useRouter } from "expo-router";
import { View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";
import { Prompt } from "@/features/prompts/types";

import { AppColors } from "@/shared/styles";

import {
  useGenerationPromptViewStore,
  useGenerationTagsStore,
  useResourceGenerationStore,
} from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";

import { Typography } from "@/shared/components/atoms";
import { ComposedDropdownOptionList } from "@/shared/components/organims";
import PromptSelectionPanel from "../prompt-selection-panel/PromptSelectionPanel";
import GenerationPromptTagSelectionList from "./GenerationPromptTagSelectionList";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationPromptSelectionList = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore(
      useShallow((state) => ({
        currentIaGeneration: state.currentIaGeneration,
        updateIaGeneration: state.updateIaGeneration,
      })),
    );

  const { tagFilter, onTagFilterChange } = useGenerationTagsStore(
    useShallow((state) => ({
      tagFilter: state.tagFilter,
      onTagFilterChange: state.onTagFilterChange,
    })),
  );

  const { selectedPrompt, isTagSelection } = useGenerationPromptViewStore(
    useShallow((state) => ({
      selectedPrompt: state.selectedPrompt,
      isTagSelection: state.isTagSelection,
    })),
  );

  const paginatedPrompts = useEventbusValue("prompts.list.pagination.updated", {
    prompts: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const handleSelectPrompt = (prompt: Prompt) => {
    if (!currentIaGeneration) return;
    updateIaGeneration(
      currentIaGeneration.generationId,
      { resourceDescriptionPrompt: prompt.promptText },
      {},
      {},
    );
    router.back();
  };

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "generations_translations.resource_description_template.select_prompt_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="chatbox-outline"
        />
      </View>
      {isTagSelection ? (
        <GenerationPromptTagSelectionList
          selectedTag={tagFilter}
          onSelectTag={onTagFilterChange}
        />
      ) : (
        <ComposedDropdownOptionList<Prompt>
          ControlPanelComponent={<PromptSelectionPanel />}
          infinitePaginationOptions={{
            ...paginatedPrompts,
            onRefetch: () =>
              eventBus.emit("prompts.refetch.requested", undefined),
            onEndReached: () => {
              if (
                paginatedPrompts.hasNextPage &&
                !paginatedPrompts.isFetchingNextPage
              )
                eventBus.emit("prompts.fetchNextPage.requested", undefined);
            },
          }}
          optionList={paginatedPrompts.prompts}
          optionIdkey="promptId"
          optionLabelKey="promptTitle"
          searchInputPlaceholder={t(
            "generations_translations.resource_description_template.select_prompt_popup_labels.search_input_placeholder",
          )}
          onSelectOption={handleSelectPrompt}
          selectedOption={selectedPrompt}
        />
      )}
    </>
  );
};

export default GenerationPromptSelectionList;
