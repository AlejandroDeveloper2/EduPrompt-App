import { createContext } from "react";

import { MultiOptionInputContextType, ProviderProps } from "./types";

const MultiOptionInputContext = createContext<
  MultiOptionInputContextType | undefined
>(undefined);

export function MultiOptionInputProvider<T, K>({
  name,
  value,
  onChange,
  multiSelect,
  children,
}: ProviderProps<T, K>) {
  const onSelectOption = (option: unknown): void => {
    if (Array.isArray(value) && multiSelect) {
      const a = [...value, option] as K;
      return onChange(name, a);
    }

    onChange(name, option as K);
  };

  return (
    <MultiOptionInputContext.Provider value={{ onSelectOption }}>
      {children}
    </MultiOptionInputContext.Provider>
  );
}

export default MultiOptionInputContext;
