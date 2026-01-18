import { LangSelectionTag, LangTag } from "@/core/types";

interface StoreStateProps {
  lang: LangTag;
}
interface StoreActions {
  setLanguage: (langTag: LangSelectionTag) => void;
}

export type LanguageStoreType = StoreStateProps & StoreActions;
