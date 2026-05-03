import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { AppColors } from "@/shared/styles";

import { usePromptSelectionPanel } from "@/features/generations/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { FilterTag, Input, NavItem } from "@/shared/components/molecules";

import { styles } from "./PromptSelectionPanel.style";

const PromptSelectionPanel = () => {
  const {
    tagFilter,
    tags,
    searchValue,
    setSearchValue,
    onTagFilterChange,
    setIsTagSelection,
  } = usePromptSelectionPanel();

  return (
    <View style={styles.Container}>
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar prompts por titulo"
        onChange={(_, value) => setSearchValue(value)}
        onClearInput={() => setSearchValue("")}
      />
      <View style={styles.FiltersContainer}>
        <Typography
          text="Filtrar por etiqueta"
          weight="bold"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <ScrollView
          horizontal
          contentContainerStyle={styles.FilterList}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <FilterTag
            icon="star-outline"
            label="Todas"
            active={tagFilter === null}
            onPressFilter={() => onTagFilterChange(null)}
          />
          {tags.slice(0, 3).map((tag) => (
            <FilterTag
              key={tag.tagId}
              icon="pricetag-outline"
              label={tag.name}
              active={tagFilter?.tagId === tag.tagId}
              onPressFilter={() => onTagFilterChange(tag)}
            />
          ))}
          <NavItem
            active={false}
            icon="search-outline"
            onPress={() => setIsTagSelection(true)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PromptSelectionPanel;
