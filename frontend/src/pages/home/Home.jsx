import { CategoryArea } from "./CategoryArea";
import { FeaturedProducts } from "./FeaturedProducts";
import { FeaturedSellerArea } from "./FeaturedSellerArea";
import { Hero } from "./Hero";
import { HighlightArea } from "./HighlightArea";

export const Home = () => {
  return (
    <>
      <Hero />
      <CategoryArea />
      <FeaturedSellerArea />
      <HighlightArea />
      <FeaturedProducts />
    </>
  );
};
