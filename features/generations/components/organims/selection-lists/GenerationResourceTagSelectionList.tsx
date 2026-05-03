import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";

import { Tag } from "@/core/events/types";
import { Spacing } from "@/shared/styles";

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

interface GenerationResourceTagSelectionListProps {
  selectedTag: Tag | null;
  onSelectTag: (tag: Tag | null) => void;
}

const GenerationResourceTagSelectionList = ({
  selectedTag,
  onSelectTag,
}: GenerationResourceTagSelectionListProps) => {
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
          tagType="resource_tag"
          searchValue={searchTagValue}
          onSearchChange={onSearchTagValueChange}
        />
      }
      infinitePaginationOptions={{
        ...paginatedTags,
        onRefetch: () =>
          eventBus.emit("tags.resourceType.refetch.requested", undefined),
        onEndReached: () => {
          if (paginatedTags.hasNextPage && !paginatedTags.isFetchingNextPage)
            eventBus.emit(
              "tags.resourceType.fetchNextPage.requested",
              undefined,
            );
        },
      }}
      optionList={paginatedTags.tags}
      optionIdkey="tagId"
      optionLabelKey="name"
      searchInputPlaceholder={t(
        "generations_translations.ia_response_card_labels.select_tag_popup_labels.search_input_placeholder",
      )}
      selectedOption={selectedTag}
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

export default GenerationResourceTagSelectionList;
