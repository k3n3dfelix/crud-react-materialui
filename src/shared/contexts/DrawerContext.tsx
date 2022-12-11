import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen?: boolean;
  toogleDrawerOpen?: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOption: (newDrawerOption: IDrawerOption[]) => void
  children?: React.ReactNode;
}

interface IDrawerOption {
  icon: string;
  label: string;
  path: string;
}
const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};
export const DrawerProvider: React.FC<IDrawerContextData> = ({ children }) => {
  const [ isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  
  const toogleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen );
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{isDrawerOpen, drawerOptions, toogleDrawerOpen, setDrawerOption: handleSetDrawerOptions}}>
      {children}
    </DrawerContext.Provider>
  );
};
