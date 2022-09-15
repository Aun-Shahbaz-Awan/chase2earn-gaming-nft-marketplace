import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function ContextWrapper({ children }) {
  const [bearerToken, setBearerToken] = useState('')
  return (
    <AppContext.Provider value={{bearerToken, setBearerToken}}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
