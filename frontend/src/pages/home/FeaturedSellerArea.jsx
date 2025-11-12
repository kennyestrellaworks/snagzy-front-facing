import { stores } from "../../data/stores";

import { StoreProfileCard } from "../../components/StoreProfileCard";

export const FeaturedSellerArea = () => {
  return (
    <section className="relative bg-[#C1EBE2] h-full text-foreground py-20 transition-colors duration-300">
      <div className="container mx-auto px-4 min-h-[300px] ">
        <div className="flex flex-col">
          <h1 className="text-[2rem] font-semibold">Featured Sellers</h1>
          <p className="text-lg mt-1">
            Shop from our trusted and verified vendors
          </p>
        </div>
        {/* Card  */}
        <StoreProfileCard stores={stores} />
      </div>
    </section>
  );
};
