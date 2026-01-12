import { ScrollView, View } from "react-native";

import { ResourceFormatKey } from "@/features/my-files/types";

import { AppColors } from "@/shared/styles";

import { FORMAT_FILTERS } from "@/shared/constants";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, Input } from "@/shared/components/molecules";
import { FileNavigator } from "../../molecules";

import { FileListStyle } from "./DownloadedFileList.style";

interface DownloadedFileListHeaderProps {
  format: ResourceFormatKey | null;
  searchValue: string;
  onChangeFormat: (selectedFormat: ResourceFormatKey | null) => void;
  onSearchValueChange: (value: string) => void;
  onClearSearchInput: () => void;
}

const DownloadedFileListHeader = ({
  format,
  searchValue,
  onChangeFormat,
  onSearchValueChange,
  onClearSearchInput,
}: DownloadedFileListHeaderProps) => {
  const size = useScreenDimensionsStore();

  const fileListStyle = FileListStyle(size);

  return (
    <View style={fileListStyle.ListHeaderContainer}>
      <ScreenSection
        description="Revisa y gestiona fácilmente los recursos que has descargado con Edu Prompt, todo en un solo lugar."
        title="Mis archivos descargados"
        icon="document-outline"
      />
      <FileNavigator />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar archivo por nombre"
        onChange={onSearchValueChange}
        onClearInput={onClearSearchInput}
      />
      <View style={fileListStyle.FiltersContainer}>
        <Typography
          text="Listar en orden"
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <ScrollView
          contentContainerStyle={fileListStyle.Filters}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {FORMAT_FILTERS["es"].map((filter) => (
            <FilterTag
              key={filter.label}
              icon={filter.icon}
              label={filter.label}
              active={filter.formatKey === format}
              onPressFilter={() => onChangeFormat(filter.formatKey)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default DownloadedFileListHeader;
