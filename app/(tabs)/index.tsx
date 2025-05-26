import { ScrollView, View } from "react-native";

import { Button, Input } from "@/components/molecules";
import {
  Alert,
  BackgroundProcessPanel,
  PopUp,
  PromptInput,
} from "@/components/organims";
import { useAnimatedPopUp } from "@/lib/hooks/animations";
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
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 24,
        backgroundColor: "#fff",
      }}
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
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 16,
          paddingHorizontal: 24,
          backgroundColor: "#FFF",
          paddingBottom: 180,
        }}
      >
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
        {/* <TokenPackageCard
          packageId="package_id_1"
          price="$12.000 COPS"
          packageTitle="Paquete Básico"
          description="¡Hasta 100 tokens instantáneos! "
          SvgIcon={<BasicPackageToken />}
          onBuyPackage={() => {}}
        /> */}
        {/* <SubprocessList subprocesses={subsprocesses} />
        <Loader
          title="Generando recurso..."
          description="Se esta generando el recurso educativo que ha solicitado. El proceso puede tomar unos segundos."
          icon="bulb-outline"
          progressConfig={{
            mode: "duration-timer",
            limit: 6000,
          }}
        /> */}
        <BackgroundProcessPanel />
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
      </View>
    </ScrollView>
  );
}
