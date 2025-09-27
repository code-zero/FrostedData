import { createContext, useContext, useState } from "react";

export type DesignVariant = "classic" | "minimal" | "modern" | "compact" | "luxury";

type DesignProviderProps = {
  children: React.ReactNode;
  defaultDesign?: DesignVariant;
  storageKey?: string;
};

type DesignProviderState = {
  design: DesignVariant;
  setDesign: (design: DesignVariant) => void;
};

const initialState: DesignProviderState = {
  design: "classic",
  setDesign: () => null,
};

const DesignProviderContext = createContext<DesignProviderState>(initialState);

export function DesignProvider({
  children,
  defaultDesign = "classic",
  storageKey = "frosteddata-design-variant",
  ...props
}: DesignProviderProps) {
  const [design, setDesign] = useState<DesignVariant>(
    () => (localStorage.getItem(storageKey) as DesignVariant) || defaultDesign
  );

  const value = {
    design,
    setDesign: (design: DesignVariant) => {
      localStorage.setItem(storageKey, design);
      setDesign(design);
    },
  };

  return (
    <DesignProviderContext.Provider {...props} value={value}>
      {children}
    </DesignProviderContext.Provider>
  );
}

export const useDesign = () => {
  const context = useContext(DesignProviderContext);

  if (context === undefined)
    throw new Error("useDesign must be used within a DesignProvider");

  return context;
};