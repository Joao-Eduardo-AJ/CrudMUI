import { createContext, useCallback, useState, useContext } from 'react';

interface IDraweContextData {
  isDrawerOpen?: boolean;
  toggleDrawerOpen?: () => void;
  children?: React.ReactNode;
}

const DrawerContext = createContext({} as IDraweContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }: IDraweContextData) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(prevState => !prevState);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
