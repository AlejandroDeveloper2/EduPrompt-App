import { View } from "react-native";

import { TagType } from "@/features/tags/types";
import { AppColors } from "@/shared/styles";

import { useSyncTagMutation } from "@/features/tags/hooks/mutations";
import { useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, InfoCard, Input } from "@/shared/components/molecules";

import { TagCardListStyle } from "./TagCardList.style";

interface TagListHeaderProps {
  isDataSync: boolean;
  selectedFilter: TagType;
  searchValue: string;
  onChangeFilter: (filter: TagType) => void;
  handleSearchChange: (text: string) => void;
  onClearSearchInput: () => void;
}

const TagCardListHeader = ({
  isDataSync,
  selectedFilter,
  searchValue,
  handleSearchChange,
  onClearSearchInput,
  onChangeFilter,
}: TagListHeaderProps) => {
  const size = useScreenDimensionsStore();

  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const { isPending, syncTags } = useSyncTagMutation();

  const tagCardListStyle = TagCardListStyle(size);

  return (
    <View style={tagCardListStyle.ListHeaderContainer}>
      {userProfile && !isDataSync && !userProfile.userPreferences.autoSync && (
        <InfoCard
          title="Sincronización de datos"
          description="Hay datos sin sincronizar toca el siguiente botón para sincronizar tus datos"
          buttonData={{
            onPress: syncTags,
            icon: "sync-outline",
            label: "Sincronizar",
            loading: isPending,
            loadingMessage: "Sincronizando datos...",
          }}
        />
      )}
      <ScreenSection
        description="Gestiona el conjunto de etiquetas para tus recursos educativos y prompts personalizados."
        title="Etiquetas"
        icon="pricetag-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar etiquetas por nombre"
        onChange={(_, value) => handleSearchChange(value)}
        onClearInput={onClearSearchInput}
      />
      <View style={tagCardListStyle.FiltersContainer}>
        <Typography
          text="Filtrar por tipo"
          weight="bold"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <View style={tagCardListStyle.FiltersRow}>
          <FilterTag
            icon="book-outline"
            label="Recursos educativos"
            active={selectedFilter === "resource_tag"}
            onPressFilter={() => onChangeFilter("resource_tag")}
          />
          <FilterTag
            icon="chatbox-ellipses-outline"
            label="Prompts"
            active={selectedFilter === "prompt_tag"}
            onPressFilter={() => onChangeFilter("prompt_tag")}
          />
        </View>
      </View>
    </View>
  );
};

export default TagCardListHeader;
