import { useState } from "react";
import { FlatList } from "react-native";

import { EducationalResource } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useSearchInput } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { ResourceCard } from "../../molecules";
import PreviewResourceHeader from "./PreviewResourceHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { PreviewResourceListStyle } from "./PreviewResourceList.style";

const resources: EducationalResource[] = [
  {
    resourceId: "resource-id",
    title: "Recurso 1",
    content: "algun contenido",
    format: "Texto",
    formatKey: "text",
    groupTag: "Talleres",
    creationDate: "20/08/2025",
  },
];

const PreviewResourceList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const size = useScreenDimensionsStore();
  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(resources, "title");

  const previewResourceListStyle = PreviewResourceListStyle(size);

  return (
    <FlatList
      style={[
        previewResourceListStyle.ListContainer,
        GlobalStyles.PageDimensions,
      ]}
      contentContainerStyle={[
        previewResourceListStyle.ListContent,
        GlobalStyles.PageContent,
      ]}
      numColumns={size === "laptop" ? 2 : 1}
      windowSize={5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      data={filteredElements}
      renderItem={({ item }) => (
        <ResourceCard
          resourceData={item}
          icon="add"
          onViewResource={() => console.log(item.title)}
        />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.resourceId}
      ListHeaderComponent={
        <PreviewResourceHeader
          filteredElements={filteredElements}
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          onClearSearchInput={onClearSearchInput}
        />
      }
      ListEmptyComponent={
        <Empty message="No hay recursos guardados" icon="book-outline" />
      }
      onEndReached={(info) =>
        info.distanceFromEnd === 0 ? setLoading(true) : setLoading(false)
      }
      ListFooterComponent={
        loading ? (
          <LoadingTextIndicator
            message="Cargando recursos guardados..."
            color={AppColors.primary[400]}
          />
        ) : null
      }
    />
  );
};

export default PreviewResourceList;
