import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";

import {
  SectionComponentMap,
  SectionId,
} from "../../organims/preview-resource-list/types";

import { AppColors, Spacing } from "@/shared/styles";

import { useResourceFiltersStore } from "@/features/educational-resources/store";
import { useResourcePreviewLogic, useResourceTags } from "../../../hooks/core";

import { Typography } from "@/shared/components/atoms";
import {
  Button,
  ResourceViewer,
  Tabulator,
} from "@/shared/components/molecules";
import {
  ComposedDropdownOptionList,
  TagSelectionPanel,
} from "@/shared/components/organims";
import { UpdateResourceForm } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const UpdateResourceTemplate = () => {
  const {
    selectedResource,
    activePreviewTab,
    isTagSelection,
    viewerType,
    resourcePreviewTabs,
    setActivePreviewTab,
    setIsTagSelection,
    isPending,
    selectedTag,
    form,
    handleClose,
    t,
  } = useResourcePreviewLogic();

  const { searchTagValue, onSearchTagValueChange } = useResourceFiltersStore(
    useShallow((state) => ({
      searchTagValue: state.searchTagValue,
      onSearchTagValueChange: state.onSearchTagValueChange,
    })),
  );

  const paginatedTags = useResourceTags();

  const Section: SectionComponentMap = {
    "tab-1": (
      <ScrollView style={{ width: "100%", maxHeight: 500 }}>
        <ResourceViewer
          viewerType={viewerType}
          content={selectedResource?.content ?? "..."}
          scroll={false}
        />
      </ScrollView>
    ),
    "tab-2": (
      <UpdateResourceForm
        selectedTag={selectedTag}
        isLoading={isPending}
        form={form}
        onTagSelectionMode={() => setIsTagSelection(true)}
        onClosePopUp={handleClose}
      />
    ),
  };

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={
            isTagSelection
              ? t(
                  "resources_translations.resources_list_labels.select_tags_popup_labels.title",
                )
              : t(
                  "resources_translations.resources_list_labels.view_resource_popup_labels.title",
                )
          }
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon={isTagSelection ? "pricetag-outline" : "eye-outline"}
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
              if (
                paginatedTags.hasNextPage &&
                !paginatedTags.isFetchingNextPage
              )
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
            "resources_translations.resources_list_labels.select_tags_popup_labels.search_input_placeholder",
          )}
          selectedOption={selectedTag}
          onSelectOption={(option) => {
            form.handleChange("groupTag", option.tagId);
            setIsTagSelection(false);
          }}
          FooterComponent={
            <Button
              label={t(
                "resources_translations.resources_list_labels.select_tags_popup_labels.btn_cancel_selection",
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
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: Spacing.spacing_xl,
          }}
        >
          <Tabulator
            tabs={resourcePreviewTabs}
            activeTab={activePreviewTab}
            onSwitchTab={setActivePreviewTab}
          />
          {Section[activePreviewTab.tabId as SectionId]}
        </View>
      )}
    </>
  );
};

export default UpdateResourceTemplate;
