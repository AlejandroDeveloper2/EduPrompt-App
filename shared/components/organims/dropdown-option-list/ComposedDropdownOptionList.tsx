import { ReactNode } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useAnimatedRef } from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { DropdownOption, Empty, LoadingTextIndicator } from "../../molecules";
import { DropdownOptionListProps } from "./DropdownOptionList";

import { getIsSelectedOption } from "@/shared/helpers";
import { DropdownOptionListStyle } from "./DropdownOptionList.style";

interface ComposedDropdownOptionListProps<T>
  extends DropdownOptionListProps<T> {
  ControlPanelComponent: ReactNode | ReactNode[];
  FooterComponent?: ReactNode | ReactNode[];
  infinitePaginationOptions: {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refreshing: boolean;
    onRefetch: () => void;
    onEndReached: () => void;
  };
}

function ComposedDropdownOptionList<T>({
  optionList,
  optionIdkey,
  optionLabelKey,
  searchInputPlaceholder,
  selectedOption,
  onSelectOption,
  ControlPanelComponent,
  FooterComponent,
  infinitePaginationOptions,
}: ComposedDropdownOptionListProps<T>) {
  const { onEndReached, isFetchingNextPage, refreshing, onRefetch } =
    infinitePaginationOptions;

  const listRef = useAnimatedRef<FlatList<T>>();
  const size = useScreenDimensionsStore();

  const dropdownOptionListStyle = DropdownOptionListStyle(size);

  return (
    <FlatList
      ref={listRef}
      scrollEventThrottle={16}
      simultaneousHandlers={listRef}
      style={dropdownOptionListStyle.ListContainer}
      contentContainerStyle={dropdownOptionListStyle.ListContent}
      numColumns={size === "laptop" ? 2 : 1}
      data={optionList}
      renderItem={({ item }) => (
        <DropdownOption
          option={item}
          optionLabelKey={optionLabelKey}
          isSelected={getIsSelectedOption(item, selectedOption, optionIdkey)}
          onSelectOption={onSelectOption}
        />
      )}
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item[optionIdkey] as string}
      ListEmptyComponent={
        <Empty message="No hay resultados" icon="close-circle-outline" />
      }
      ListHeaderComponent={<>{ControlPanelComponent}</>}
      onEndReachedThreshold={0.4}
      onEndReached={onEndReached}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <LoadingTextIndicator
            color={AppColors.primary[400]}
            message="Cargando mas resultados..."
          />
        ) : (
          FooterComponent
        )
      }
      refreshing={refreshing}
      onRefresh={onRefetch}
    />
  );
}

export default ComposedDropdownOptionList;
