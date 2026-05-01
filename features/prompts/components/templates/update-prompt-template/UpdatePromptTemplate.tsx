import { View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";
import { AppColors, Spacing } from "@/shared/styles";

import {
  usePromptTags,
  usePromptViewLogic,
} from "@/features/prompts/hooks/core";
import { usePromptFiltersStore } from "@/features/prompts/store";

import { Typography } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";
import {
  ComposedDropdownOptionList,
  TagSelectionPanel,
} from "@/shared/components/organims";
import { UpdatePromptForm } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const UpdatePromptTemplate = () => {
  const {
    isTagSelection,
    setIsTagSelection,
    isPending,
    selectedTag,
    form,
    handleClose,
    t,
  } = usePromptViewLogic();

  const { searchTagValue, onSearchTagValueChange } = usePromptFiltersStore(
    useShallow((state) => ({
      searchTagValue: state.searchTagValue,
      onSearchTagValueChange: state.onSearchTagValueChange,
    })),
  );

  const paginatedTags = usePromptTags();

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
              : t("prompts_translations.update_prompt_template.title")
          }
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon={isTagSelection ? "pricetag-outline" : "pencil-outline"}
        />
      </View>
      {isTagSelection ? (
        <ComposedDropdownOptionList<{
          tagId: string;
          type: "prompt_tag" | "resource_tag";
          name: string;
        }>
          ControlPanelComponent={
            <TagSelectionPanel
              tagType="prompt_tag"
              searchValue={searchTagValue}
              onSearchChange={onSearchTagValueChange}
            />
          }
          infinitePaginationOptions={{
            ...paginatedTags,
            onRefetch: () =>
              eventBus.emit("tags.promptType.refetch.requested", undefined),
            onEndReached: () => {
              if (
                paginatedTags.hasNextPage &&
                !paginatedTags.isFetchingNextPage
              )
                eventBus.emit(
                  "tags.promptType.fetchNextPage.requested",
                  undefined,
                );
            },
          }}
          optionList={paginatedTags.tags}
          optionIdkey="tagId"
          optionLabelKey="name"
          searchInputPlaceholder={t(
            "prompts_translations.prompt_list_labels.tag_list_labels_popup.search_input_placeholder",
          )}
          selectedOption={selectedTag}
          onSelectOption={(option) => {
            form.handleChange("tag", option.tagId);
            setIsTagSelection(false);
          }}
          FooterComponent={
            <Button
              label={t(
                "prompts_translations.prompt_list_labels.tag_list_labels_popup.btn_cancel_selection",
              )}
              icon="close-outline"
              width="100%"
              variant="neutral"
              onPress={() => setIsTagSelection(false)}
              style={{ marginVertical: Spacing.spacing_xl }}
            />
          }
        />
      ) : (
        <UpdatePromptForm
          isLoading={isPending}
          selectedTag={selectedTag}
          form={form}
          onTagSelectionMode={() => setIsTagSelection(true)}
          onClosePopUp={handleClose}
        />
      )}
    </>
  );
};

export default UpdatePromptTemplate;
