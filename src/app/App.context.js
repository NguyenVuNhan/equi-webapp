import { createContext, useState } from "react";

export const AppStateContext = createContext({
  dialPosition: 0, // 0 degree
  setDialPosition: () => {},
});

export const AppStateProvider = ({ children }) => {
  const [dialPosition, setDialPosition] = useState(0);
  return (
    <AppStateContext.Provider value={{ dialPosition, setDialPosition }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
