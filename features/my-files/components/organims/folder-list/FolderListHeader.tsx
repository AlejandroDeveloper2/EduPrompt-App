import { View } from "react-native";

import { Order } from "@/core/types";

import { AppColors } from "@/shared/styles";

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

  const folderListStyle = FolderListStyle(size);

  return (
    <View style={folderListStyle.ListHeaderContainer}>
      <ScreenSection
        description="Revisa y gestiona fácilmente los recursos que has descargado con Edu Prompt, todo en un solo lugar."
        title="Mis archivos descargados"
        icon="folder-open-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar carpeta por nombre"
        onChange={(_name, value) => onSearchValueChange(value)}
        onClearInput={onClearSearchInput}
      />
      <View style={folderListStyle.FiltersContainer}>
        <Typography
          text="Listar en orden"
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
            label="Ascendente"
            active={order === "asc"}
            onPressFilter={() => onChangeOrder("asc")}
          />
          <FilterTag
            icon="calendar-outline"
            label="Descendente"
            active={order === "desc"}
            onPressFilter={() => onChangeOrder("desc")}
          />
        </View>
      </View>
    </View>
  );
};

export default FolderListHeader;
