import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";
import { Spacing } from "@/shared/styles";

import { Tag } from "@/features/tags/types";

import { useGenerationTags } from "@/features/generations/hooks/core";
import {
  useGenerationPromptViewStore,
  useGenerationTagsStore,
} from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Button } from "@/shared/components/molecules";
import {
  ComposedDropdownOptionList,
  TagSelectionPanel,
} from "@/shared/components/organims";

interface GenerationPromptTagSelectionListProps {
  selectedTag: Tag | null;
  onSelectTag: (tag: Tag | null) => void;
}

const GenerationPromptTagSelectionList = ({
  selectedTag,
  onSelectTag,
}: GenerationPromptTagSelectionListProps) => {
  const { t } = useTranslations();

  const { searchTagValue, onSearchTagValueChange } = useGenerationTagsStore(
    useShallow((state) => ({
      searchTagValue: state.searchTagValue,
      onSearchTagValueChange: state.onSearchTagValueChange,
    })),
  );

  const setIsTagSelection = useGenerationPromptViewStore(
    useShallow((state) => state.setIsTagSelection),
  );

  const paginatedTags = useGenerationTags();

  return (
    <ComposedDropdownOptionList<Tag>
      ControlPanelComponent={
        <TagSelectionPanel
          tagType="prompt_tag"
          searchValue={searchTagValue}
          onSearchChange={(value) => onSearchTagValueChange(value)}
        />
      }
      infinitePaginationOptions={{
        ...paginatedTags,
        onRefetch: () =>
          eventBus.emit("tags.promptType.refetch.requested", undefined),
        onEndReached: () => {
          if (paginatedTags.hasNextPage && !paginatedTags.isFetchingNextPage)
            eventBus.emit("tags.promptType.fetchNextPage.requested", undefined);
        },
      }}
      optionList={paginatedTags.tags}
      optionIdkey="tagId"
      optionLabelKey="name"
      selectedOption={selectedTag}
      searchInputPlaceholder={t(
        "prompts_translations.prompt_list_labels.tag_list_labels_popup.search_input_placeholder",
      )}
      onSelectOption={(option) => {
        onSelectTag(option);
        setIsTagSelection(false);
      }}
      FooterComponent={
        <Button
          label={t(
            "generations_translations.ia_response_card_labels.select_tag_popup_labels.btn_cancel",
          )}
          icon="close-outline"
          width="100%"
          variant="neutral"
          onPress={() => setIsTagSelection(false)}
          style={{ marginVertical: Spacing.spacing_xl }}
        />
      }
    />
  );
};

export default GenerationPromptTagSelectionList;
