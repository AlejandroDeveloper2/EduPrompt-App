import { LangTag } from "@/core/types";

interface StoreStateProps {
  lang: LangTag;
}
interface StoreActions {
  setLanguage: (langTag: LangTag) => void;
}

export type LanguageStoreType = StoreStateProps & StoreActions;
