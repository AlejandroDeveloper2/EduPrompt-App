import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { create } from "zustand";

import { UserProfile } from "@/core/events/types";
import { LangTag } from "@/core/types";
import { LanguageStoreType } from "./store-types";

import { eventBus } from "@/core/events/EventBus";

import english from "@/core/lang/en.json";
import spanish from "@/core/lang/es.json";
import portuguese from "@/core/lang/pt.json";

const translations = {
  en: english,
  es: spanish,
  pt: portuguese,
};

const supportedLanguages: LangTag[] = ["es", "en", "pt"];

const getDefaultLanguage = (): LangTag => {
  const locale = getLocales()[0]?.languageCode ?? "es";
  return supportedLanguages.includes(locale as LangTag)
    ? (locale as LangTag)
    : "es";
};

export const i18n = new I18n(translations);
i18n.enableFallback = true;

export const LanguageStore = create<LanguageStoreType>((set) => {
  const userProfile = eventBus.getLast("userProfile.user.updated");

  const getUserSelectedLang = (user: UserProfile) => {
    const { userPreferences } = user;
    return userPreferences.language === "system"
      ? getDefaultLanguage()
      : (userPreferences.language as LangTag);
  };

  const initialLang = userProfile
    ? getUserSelectedLang(userProfile)
    : getDefaultLanguage();

  i18n.locale = initialLang;

  return {
    lang: initialLang,
    setLanguage: (langTag): void => {
      const finalLang = langTag === "system" ? initialLang : langTag;
      i18n.locale = finalLang;
      set({ lang: finalLang });
    },
  };
});
