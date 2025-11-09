import { createContext, useContext, useMemo } from "react";
import { products } from "../data/products.js";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Get product image
  const getProductImage = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product?.gallery?.[0] || null;
  };

  const getProductById = (productId) => {
    let product = products.find((p) => p._id === productId);

    if (!product) {
      product = products.find((p) => p._id.includes(productId));
    }

    if (!product) {
      product = products.find((p) => p.slug === productId);
    }

    return product || null;
  };

  // Get top 10 featured products based on order data
  const getFeaturedProducts = async () => {
    try {
      const { orders } = await import("../data/orders.js");

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
        .map((productId) => getProductById(productId))
        .filter((product) => product !== null); // Remove any null products

      return featuredProducts;
    } catch (error) {
      console.error("Error loading featured products:", error);
      return [];
    }
  };

  const value = useMemo(
    () => ({
      getProductImage,
      getProductById,
      getFeaturedProducts,
    }),
    []
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
