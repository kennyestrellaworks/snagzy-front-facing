import { createContext, useContext, useMemo } from "react";
import { users } from "../data/users.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUserByShopId = (storeId) => {
    return (
      users.find((user) => user.shop && user.shop.includes(storeId)) || null
    );
  };

  const value = useMemo(
    () => ({
      getUserByShopId,
      users,
    }),
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
