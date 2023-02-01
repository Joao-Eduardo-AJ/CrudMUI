import { createContext, useCallback, useState, useContext } from "react";

interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
  toggleDrawerOpen: () => void;
}

interface IDrawerProvider {
  children: React.ReactNode;
}

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }: IDrawerProvider) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(prevState => !prevState);
  }, []);

  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IDrawerOption[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    []
  );

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
