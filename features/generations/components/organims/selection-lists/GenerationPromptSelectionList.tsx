import { View } from "react-native";

import { eventBus } from "@/core/events/EventBus";
import { Prompt } from "@/features/prompts/types";

import { AppColors } from "@/shared/styles";

import { useGenerationPromptSelectionList } from "@/features/generations/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { ComposedDropdownOptionList } from "@/shared/components/organims";
import PromptSelectionPanel from "../prompt-selection-panel/PromptSelectionPanel";
import GenerationPromptTagSelectionList from "./GenerationPromptTagSelectionList";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationPromptSelectionList = () => {
  const {
    t,
    tagFilter,
    selectedPrompt,
    isTagSelection,
    paginatedPrompts,
    onTagFilterChange,
    handleSelectPrompt,
  } = useGenerationPromptSelectionList();

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
