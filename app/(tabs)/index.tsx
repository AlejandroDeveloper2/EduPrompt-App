import { ScrollView, View } from "react-native";

import { Button, Input } from "@/components/molecules";
import {
  Alert,
  IaResponseCard,
  PopUp,
  PromptInput,
} from "@/components/organims";
import { useAnimatedPopUp } from "@/lib/hooks/animations";
import { GlobalStyles } from "@/styles/GlobalStyles.style";
import { useState } from "react";

// import { useState } from "react";

// const options: { optionId: string; optionLabel: string }[] = [
//   { optionId: "option-1", optionLabel: "Opción 1" },
//   { optionId: "option-2", optionLabel: "Opción 2" },
//   { optionId: "option-3", optionLabel: "Opción 3" },
// ];

export default function DashboardScreen() {
  const {
    isPopUpMounted,
    animatedPopUpStyle,
    dragGesture,
    onOpenPopUp,
    onClosePopUp,
  } = useAnimatedPopUp();
  // const [selectedOption, setSelectedOption] = useState<{
  //   optionId: string;
  //   optionLabel: string;
  // } | null>(null);
  // const handleSelectedOption = (option: {
  //   optionId: string;
  //   optionLabel: string;
  // }) => {
  //   setSelectedOption(option);
  // };
  const [data, setData] = useState<{ email: string; country: string }>({
    email: "",
    country: "",
  });

  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <PopUp
          title="Pop Up title"
          icon="logo-windows"
          isPopUpMounted={isPopUpMounted}
          gesture={dragGesture}
          animatedPopUpStyle={animatedPopUpStyle}
          onClosePopUp={onClosePopUp}
        >
          <Alert
            variant="success"
            message="this is an alert message"
            acceptButtonLabel="Accept"
            acceptButtonIcon="checkmark-done"
            onCancel={onClosePopUp}
            onAccept={onClosePopUp}
          />
        </PopUp>

        <Input<{ email: string; country: string }>
          name="country"
          value={data.country}
          placeholder="Digite el país"
          onChange={(name, value) => setData({ ...data, [name]: value })}
          onClearInput={() => setData({ ...data, country: "" })}
          icon="location-outline"
        />
        <PromptInput<{ email: string; country: string }>
          onSavePrompt={() => {}}
          onSearchPrompt={() => {}}
          onGeneratePrompt={() => {}}
          name="email"
          value={data.email}
          placeholder="Escribe tu prompt"
          onChange={(name, value) => setData({ ...data, [name]: value })}
          onClearInput={() => setData({ ...data, email: "" })}
          icon="mail-outline"
        />
        <IaResponseCard
          format={"text"}
          iaGeneratedContent={`Lorem ipsum dolor sit amet consectetur. Id in blandit hac sed. Orci sed interdum dolor tortor in ipsum purus. Nunc augue sapien integer sed mauris. Viverra id molestie nunc faucibus tellus mattis convallis vel. Viverra dictum diam dolor gravida quam. Ultrices egestas fermentum gravida vel amet sit quam purus. Arcu id justo dictumst arcu. Venenatis nam enim turpis sed facilisi quam nibh amet. Lorem suspendisse eu duis a sed volutpat duis pharetra. Varius dictumst ipsum nam id aliquam. Quam pellentesque diam cursus mattis tellus tincidunt facilisis. Ipsum vitae maecenas diam rhoncus aliquam augue.

Sagittis tristique et orci maecenas tincidunt. Et vestibulum eget sem id consequat. Ornare urna fringilla ut pretium tincidunt. Eros bibendum semper amet et diam penatibus. Leo non a viverra feugiat condimentum non. Tristique proin mi lacus nulla dictum ac. Ultrices metus tincidunt faucibus suspendisse.

Sagittis tristique et orci maecenas tincidunt. Et vestibulum eget sem id consequat. Ornare urna fringilla ut pretium tincidunt. Eros bibendum semper amet et diam penatibus. Leo non a viverra feugiat condimentum non. Tristique proin mi lacus nulla dictum ac. Ultrices metus tincidunt faucibus suspendisse.`}
        />
        <Button
          icon="open-outline"
          width="auto"
          variant="primary"
          onPress={onOpenPopUp}
          label="Open PopUp"
        />
        {/* <DropdownOptionList
          optionList={options}
          optionIdkey="optionId"
          optionLabelKey="optionLabel"
          searchInputPlaceholder="Buscar elemento"
          selectedOption={selectedOption}
          onSelectOption={handleSelectedOption}
        /> */}
      </ScrollView>
    </View>
  );
}
