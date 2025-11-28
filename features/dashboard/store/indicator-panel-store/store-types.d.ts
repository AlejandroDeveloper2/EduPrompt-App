import { LocalIndicator } from "../../types";

export interface StoreStateProps {
  indicators: LocalIndicator;
}

export interface StoreActions {
  loadIndicators: () => LocalIndicator;
  setIndicators: (indicators: Partial<LocalIndicator>) => void;
}

export type IndicatorPanelStoreType = StoreStateProps & StoreActions;
