import { ProductCard } from "../../components/ProductCard";
import { useData } from "../../context/DataContext";
import { useEffect, useState } from "react";

export const FeaturedProducts = () => {
  const { getFeaturedProducts } = useData();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoading(true);
      try {
        const products = await getFeaturedProducts(12);
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, [getFeaturedProducts]);

  // console.log("featuredProducts", featuredProducts);

  if (loading) {
    return <div>Loading featured products...</div>;
  }

  return (
    <section className="relative bg-[#FCDDE4] text-foreground py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <h1 className="text-[2rem] font-semibold">Featured Products</h1>
          <p className="text-lg mt-1">Check our top best selling products.</p>
        </div>
        {/* Card  */}
        <ProductCard products={featuredProducts} />
      </div>
    </section>
  );
};
