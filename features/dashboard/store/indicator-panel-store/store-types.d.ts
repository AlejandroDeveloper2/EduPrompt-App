export interface StoreStateProps {
  generatedResources: number;
  usedTokens: number;
  lastGeneratedResource: string | null;
}

export interface StoreActions {
  addGeneratedResource: () => void;
  addUsedToken: (amount: number) => void;
  updateLastGeneratedResource: (lastResourceName: string) => void;
}

export type IndicatorPanelStoreType = StoreStateProps & StoreActions;
