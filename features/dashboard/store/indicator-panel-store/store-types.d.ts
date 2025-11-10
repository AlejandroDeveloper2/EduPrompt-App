export interface StoreStateProps {
  generatedResources: number;
  usedTokens: number;
  lastGeneratedResource: string;
}

export interface StoreActions {
  getIndicators: () => Promise<void>;
  addGeneratedResource: () => Promise<void>;
  addUsedToken: (amount: number) => Promise<void>;
  updateLastGeneratedResource: (lastResourceName: string) => Promise<void>;
}

export type IndicatorPanelStoreType = StoreStateProps & StoreActions;
