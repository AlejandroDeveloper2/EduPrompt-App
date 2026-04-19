import { useMemo } from "react";
import { FlatList } from "react-native";

import { EducationalResource } from "@/features/educational-resources/types";

import { useResourcesSelectionStore } from "@/features/educational-resources/hooks/store";
import { useSearchInput, useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Button, Empty, Input } from "@/shared/components/molecules";
import { ResourceToShareCard } from "../../molecules";

import { ResourcesFiltersProvider } from "@/features/educational-resources/context";

import { dynamicStyles } from "./ShareResourcePanel.style";

interface ShareResourcesPanelProps {
  resources: EducationalResource[];
  goNext: () => void;
}

const ShareResourcesPanel = ({
  resources,
  goNext,
}: ShareResourcesPanelProps) => {
  const size = useScreenDimensionsStore();
  const { selectedResourceIds } = useResourcesSelectionStore();

  const { t } = useTranslations();

  const selectedResources = useMemo(
    () => resources.filter((r) => selectedResourceIds.has(r.resourceId)),
    [resources, selectedResourceIds],
  );

  const {
    searchValue,
    filteredElements,
    onClearSearchInput,
    handleSearchChange,
  } = useSearchInput(selectedResources, "title");

  const styles = useMemo(() => dynamicStyles(size), [size]);

  return (
    <ResourcesFiltersProvider>
      <FlatList
        style={[styles.ListContainer]}
        contentContainerStyle={[styles.ListContent]}
        numColumns={size === "laptop" ? 2 : 1}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        data={filteredElements}
        renderItem={({ item }) => (
          <ResourceToShareCard
            resourceData={item}
            icon="add"
            totalRecords={filteredElements.length}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.resourceId}
        ListHeaderComponent={
          <Input<{ searchValue: string }>
            name="searchValue"
            value={searchValue}
            icon="search-outline"
            placeholder={t(
              "resources_translations.resources_to_share_list_labels.search_input_placeholder",
            )}
            onChange={(_, value) => handleSearchChange(value)}
            onClearInput={onClearSearchInput}
          />
        }
        ListEmptyComponent={
          <Empty
            message={t(
              "resources_translations.resources_to_share_list_labels.no_resources_msg",
            )}
            icon="book-outline"
          />
        }
        ListFooterComponent={
          <Button
            label={t(
              "resources_translations.resources_to_share_list_labels.next_button_label",
            )}
            icon="chevron-forward-outline"
            variant="primary"
            width="100%"
            onPress={goNext}
          />
        }
      />
    </ResourcesFiltersProvider>
  );
};

export default ShareResourcesPanel;
