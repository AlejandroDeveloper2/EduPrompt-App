export interface MultiOptionInputContextType {
  onSelectOption: (option: unknown) => void;
}

export interface ProviderProps<T, K> {
  name: keyof T;
  multiSelect?: boolean;
  value: K;
  children: ReactNode | ReactNode[];
  onChange: (name: keyof T, value: K) => void;
}
