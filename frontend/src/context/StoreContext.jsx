import React, { createContext, useContext, useMemo } from "react";
import { stores } from "../data/stores.js";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const getStore = (storeId) => {
    return stores.find((store) => store._id === storeId) || null;
  };

  const value = useMemo(
    () => ({
      getStore,
      stores,
    }),
    []
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
