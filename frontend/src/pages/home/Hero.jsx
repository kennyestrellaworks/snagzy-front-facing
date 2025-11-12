import image1 from "../../assets/images/photo-1505740420928-5e560c06d30e.jpg";
import image2 from "../../assets/images/photo-1576697010739-6373b63f3204.jpg";
import image3 from "../../assets/images/photo-1579586337278-3befd40fd17a.jpg";
import image4 from "../../assets/images/photo-1597892657493-6847b9640bac.jpg";
import { siteStats } from "../../data/system";
import { TiArrowRight } from "react-icons/ti";
import "./Home.css";
import { GradientLink } from "../../components/Link/GradientLink";
import { useData } from "../../context/DataContext";
import { useEffect, useState } from "react";
import { GradientButton } from "../../components/Button/GradientButton";

export const Hero = () => {
  const { getFeaturedProducts } = useData();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoading(true);
      try {
        const products = await getFeaturedProducts(4);
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, [getFeaturedProducts]);

  if (loading) {
    return <div>Loading 4 products...</div>;
  }

  return (
    <section className="relative hero-section text-foreground py-20 bg-gradient-to-br from-blue-600 via-emerald-500 to-teal-600 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-lime-100">
                Discover Amazing Products from{" "}
              </span>
              <span className="text-amber-400">Multiple Vendors</span>
            </h1>

            <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto md:mx-0">
              Shop from thousands of products across multiple categories. Find
              the best deals from trusted vendors all in one place.
            </p>

            <div className="flex flex-row gap-2">
              <GradientLink
                to="products"
                icon={TiArrowRight}
                iconPosition="right"
                variant="orange"
              >
                Explore Products
              </GradientLink>
              <GradientLink to="sellers" variant="slate" outline>
                Explore Sellers
              </GradientLink>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {siteStats.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center md:items-start"
                  >
                    <span className="text-4xl font-bold text-slate-300">
                      {item.stat}
                    </span>
                    <span className="mt-1 text-sky-200 text-md capitalize">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side (Images) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Items  */}
              {featuredProducts.map((item, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg bg-secondary overflow-hidden flex flex-col"
                >
                  <div className="relative flex-1">
                    <div className="absolute top-0 right-0">
                      <p className="py-1 px-4 bg-green-500 text-white text-lg font-semibold rounded-bl-lg">
                        ${item.price}
                      </p>
                    </div>
                    <img
                      src={item.gallery[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Dark overlay with text */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/70 p-3">
                      <h1 className="text-lg font-semibold truncate">
                        {item.name}
                      </h1>
                      <p className="text-sm opacity-90 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-4">
                        <GradientButton
                          to="sellers"
                          variant="orange"
                          size="sm"
                          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                            item.stock > 0
                              ? ""
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Items  */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
