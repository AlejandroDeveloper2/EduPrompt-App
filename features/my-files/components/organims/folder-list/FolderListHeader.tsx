import { View } from "react-native";

import { Order } from "@/core/types";

import { AppColors } from "@/shared/styles";

import { useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, Input } from "@/shared/components/molecules";

import { FolderListStyle } from "./FolderList.style";

interface FolderListHeaderProps {
  order: Order;
  searchValue: string;
  onChangeOrder: (selectedOrder: Order) => void;
  onSearchValueChange: (value: string) => void;
  onClearSearchInput: () => void;
}

const FolderListHeader = ({
  order,
  searchValue,
  onChangeOrder,
  onSearchValueChange,
  onClearSearchInput,
}: FolderListHeaderProps) => {
  const size = useScreenDimensionsStore();

  const { t } = useTranslations();

  const folderListStyle = FolderListStyle(size);

  return (
    <View style={folderListStyle.ListHeaderContainer}>
      <ScreenSection
        description={t("my-files-translations.folder-list-labels.description")}
        title={t("my-files-translations.folder-list-labels.title")}
        icon="folder-open-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder={t(
          "my-files-translations.folder-list-labels.search-input-placeholder"
        )}
        onChange={(_name, value) => onSearchValueChange(value)}
        onClearInput={onClearSearchInput}
      />
      <View style={folderListStyle.FiltersContainer}>
        <Typography
          text={t(
            "my-files-translations.folder-list-labels.order-filters-labels.title"
          )}
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <View style={folderListStyle.Filters}>
          <FilterTag
            icon="calendar-outline"
            label={t(
              "my-files-translations.folder-list-labels.order-filters-labels.asc"
            )}
            active={order === "asc"}
            onPressFilter={() => onChangeOrder("asc")}
          />
          <FilterTag
            icon="calendar-outline"
            label={t(
              "my-files-translations.folder-list-labels.order-filters-labels.desc"
            )}
            active={order === "desc"}
            onPressFilter={() => onChangeOrder("desc")}
          />
        </View>
      </View>
    </View>
  );
};

export default FolderListHeader;
