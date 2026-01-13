import { TranslateOptions } from "i18n-js";

import { i18n } from "@/core/store";
import { useLanguageStore } from "../store";

const useTranslations = () => {
  const t = (key: string, options?: TranslateOptions) => i18n.t(key, options);
  const { lang } = useLanguageStore();

  return { t, lang };
};
export default useTranslations;
