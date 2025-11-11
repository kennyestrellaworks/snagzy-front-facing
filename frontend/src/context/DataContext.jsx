import { createContext, useContext, useMemo } from "react";
import { products } from "../data/products.js";
import { stores } from "../data/stores.js";
import { users } from "../data/users.js";
import { orders } from "../data/orders.js";
import { categories } from "../data/categories.js";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // System-related functions
  const getTopLevelCategories = categories.filter((item) => {
    return item.parent_id === null;
  });

  // User-related functions
  const getUserData = (ownerId) => {
    let user = users.find((user) => user._id === ownerId);
    return user || null;
  };

  // Product-related functions
  const getProduct = (productId) => {
    let product = products.find((p) => p._id === productId);
    return product || null;
  };

  const getProductImage = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product?.gallery?.[0] || null;
  };

  // Get top 10 featured products based on order data
  const getFeaturedProducts = () => {
    const productCount = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productId = item.productId;
        productCount[productId] =
          (productCount[productId] || 0) + item.quantity;
      });
    });

    // Sort products by order count (most popular first)
    const sortedProductIds = Object.entries(productCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([productId]) => productId)
      .slice(0, 12); // Set number limit here, example top 10

    // Get full product data for the top 10
    const featuredProducts = sortedProductIds
      .map((productId) => getProduct(productId))
      .filter((product) => product !== null); // Remove any null products

    return featuredProducts;
  };

  // Store-related functions
  const getStoreData = (storeId) => {
    return stores.find((store) => store._id === storeId) || null;
  };

  const value = useMemo(
    () => ({
      getTopLevelCategories,
      getUserData,
      getProductImage,
      getProduct,
      getFeaturedProducts,
      getStoreData,
    }),
    []
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
