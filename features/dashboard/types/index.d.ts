interface Indicator {
  generatedResources: number;
  usedTokens: number;
  lastGeneratedResource: string | null;
  dowloadedResources: number;
  savedResources: number;
}

interface LocalIndicator extends Indicator {
  sync: boolean;
}

export type { Indicator, LocalIndicator };
