import { TiArrowRight } from "react-icons/ti";
import { NavLinkButton } from "../../components/NavItemLink/NavLinkButton";
import { categories } from "../../data/categories";

export const CategoryArea = () => {
  // Filter the array to get only the top-level categories
  const topLevelCategories = categories.filter(
    (item) => item.parent_id === null
  );

  return (
    <section className="shop-by-category-section relative shop-by-category-section text-foreground py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <h1 className="text-[2rem] font-semibold">Shop by Category</h1>
          <p className="text-lg mt-1">
            Browse products from your favorite categories
          </p>
        </div>
        {/* Card  */}
        <div className="grid md:grid-cols-5 mt-12 gap-2 items-center">
          {topLevelCategories.map((item, index) => {
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-square bg-card border hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-6 text-white">
                  <h3 className="text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-white/80">245 products</p>
                  <div className="inline-flex items-center gap-2 text-sm mt-3 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md">
                    <NavLinkButton
                      text="View All"
                      variant="outline"
                      icon={TiArrowRight}
                      to={null}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
