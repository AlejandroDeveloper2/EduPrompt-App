import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

import { COUNTRIES } from "@/features/generations/constants";
import { Country } from "@/features/generations/types";
import { AppColors } from "@/shared/styles";

import { useResourceGenerationStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationCountryList = () => {
  const router = useRouter();
  const { t, lang } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore();

  const countryList = useMemo(() => COUNTRIES[lang], [lang]);

  const selectedCountry = useMemo(
    () =>
      countryList.find(
        (country) =>
          country.countryId === currentIaGeneration?.data.country.countryId,
      ),
    [countryList, currentIaGeneration],
  );

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "generations_translations.country_template.countries_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="flag-outline"
        />
      </View>
      <DropdownOptionList<Country>
        optionList={countryList}
        optionIdkey="countryId"
        optionLabelKey="countryName"
        searchInputPlaceholder={t(
          "generations_translations.country_template.countries_popup_labels.search_input_placeholder",
        )}
        selectedOption={selectedCountry ?? null}
        onSelectOption={(option) => {
          if (!currentIaGeneration) return;
          updateIaGeneration(
            currentIaGeneration.generationId,
            { country: option },
            {},
            {},
          );
          router.back();
        }}
      />
    </>
  );
};

export default GenerationCountryList;
