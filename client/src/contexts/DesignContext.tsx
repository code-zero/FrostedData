
import { createContext, useContext, useState, ReactNode } from 'react';

type Design = 'classic' | 'minimal' | 'modern' | 'compact' | 'luxury';

type DesignProviderProps = {
  children: ReactNode;
  defaultDesign?: Design;
  storageKey?: string;
};

type DesignProviderState = {
  design: Design;
  setDesign: (design: Design) => void;
};

const DesignProviderContext = createContext<DesignProviderState | undefined>(undefined);

export function DesignProvider({
  children,
  defaultDesign = 'classic',
  storageKey = 'design-variant',
}: DesignProviderProps) {
  const [design, setDesign] = useState<Design>(
    () => (localStorage.getItem(storageKey) as Design) || defaultDesign
  );

  const value = {
    design,
    setDesign: (design: Design) => {
      localStorage.setItem(storageKey, design);
      setDesign(design);
    },
  };

  return (
    <DesignProviderContext.Provider value={value}>
      {children}
    </DesignProviderContext.Provider>
  );
}

export const useDesign = () => {
  const context = useContext(DesignProviderContext);
  if (context === undefined) throw new Error('useDesign must be used within a DesignProvider');
  return context;
};
