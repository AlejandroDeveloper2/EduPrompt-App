import { ScrollView, View } from "react-native";

import { EducationalResource } from "@/lib/types/data-types";

import { FORMAT_FILTERS } from "@/lib/constants";
import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { ScreenSection, Typography } from "@/components/atoms";
import { FilterTag, Input } from "@/components/molecules";

import { PreviewResourceListStyle } from "./PreviewResourceList.style";

interface PreviewResourceHeaderProps {
  filteredElements: EducationalResource[];
  searchValue: string;
  handleSearchChange: (text: string) => void;
  onClearSearchInput: () => void;
}

const tagFilters: { tagId: string; tagName: string }[] = [];

const PreviewResourceHeader = ({
  searchValue,
  handleSearchChange,
  onClearSearchInput,
}: PreviewResourceHeaderProps) => {
  const size = useScreenDimensionsStore();

  const previewResourceListStyle = PreviewResourceListStyle(size);

  return (
    <View style={previewResourceListStyle.ListHeaderContainer}>
      <ScreenSection
        description="Revisa y gestiona fácilmente las vistas previas de todos los recursos que has generado con Edu Prompt, todo en un solo lugar. "
        title="Mis Recursos"
        icon="book-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar recurso por nombre"
        onChange={handleSearchChange}
        onClearInput={onClearSearchInput}
      />
      <View style={previewResourceListStyle.FilterSection}>
        <Typography
          text="Filtrar por formato"
          weight="medium"
          type="paragraph"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <ScrollView
          contentContainerStyle={previewResourceListStyle.Filters}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {FORMAT_FILTERS["es"].map((filter) => (
            <FilterTag
              key={filter.label}
              icon={filter.icon}
              label={filter.label}
              active={false}
              onPressFilter={() => console.log("")}
            />
          ))}
        </ScrollView>
      </View>
      {tagFilters.length > 0 && (
        <View style={previewResourceListStyle.FilterSection}>
          <Typography
            text="Filtrar por etiqueta"
            weight="medium"
            type="paragraph"
            textAlign="left"
            color={AppColors.neutral[1000]}
            width="auto"
            icon="filter-outline"
          />
          <ScrollView
            contentContainerStyle={previewResourceListStyle.Filters}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PreviewResourceHeader;
