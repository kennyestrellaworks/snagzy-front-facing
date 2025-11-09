import { CategoryArea } from "./CategoryArea";
import { FeaturedProducts } from "./FeaturedProducts";
import { FeaturedSellerArea } from "./FeaturedSellerArea";
import { Hero } from "./Hero";

export const Home = () => {
  return (
    <>
      <Hero />
      <CategoryArea />
      <FeaturedSellerArea />
      <FeaturedProducts />
    </>
  );
};
