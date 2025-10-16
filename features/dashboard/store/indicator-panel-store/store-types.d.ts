export interface StoreStateProps {
  generatedResources: number;
  usedTokens: number;
  lastGeneratedResource: string;
}

export interface StoreActions {
  setupIndicators: () => Promise<void>;
  getIndicators: () => Promise<void>;
  addGeneratedResource: () => Promise<void>;
  addUsedToken: () => Promise<void>;
  updateLastGeneratedResource: (lastResourceName: string) => Promise<void>;
}

export type IndicatorPanelStoreType = StoreStateProps & StoreActions;
