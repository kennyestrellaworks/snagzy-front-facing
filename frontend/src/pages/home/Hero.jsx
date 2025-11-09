import image1 from "../../assets/images/photo-1505740420928-5e560c06d30e.jpg";
import image2 from "../../assets/images/photo-1576697010739-6373b63f3204.jpg";
import image3 from "../../assets/images/photo-1579586337278-3befd40fd17a.jpg";
import image4 from "../../assets/images/photo-1597892657493-6847b9640bac.jpg";
import { NavLinkButton } from "../../components/NavItemLink/NavLinkButton";
import { siteStats } from "../../data/system";
import { TiArrowRight } from "react-icons/ti";
import "./Home.css";

export const Hero = () => {
  // console.log("siteStats", siteStats);

  return (
    <section className="relative hero-section text-foreground py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="hero-text-color1">
                Discover Amazing Products from{" "}
              </span>
              <span className="hero-text-color2">Multiple Vendors</span>
            </h1>

            <p className="mt-4 text-lg hero-text-color3 max-w-xl mx-auto md:mx-0">
              Shop from thousands of products across multiple categories. Find
              the best deals from trusted vendors all in one place.
            </p>

            <div className="flex flex-row gap-2">
              <NavLinkButton
                text="Explore Products"
                variant="primary"
                icon={TiArrowRight}
                to={null}
              />
              <NavLinkButton
                text="Explore Shop"
                variant="outline"
                icon={null}
                to={null}
              />
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {siteStats.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center md:items-start"
                  >
                    <span className="text-4xl font-bold hero-text-color2">
                      {item.stat}
                    </span>
                    <span className="mt-1 hero-text-color3 text-md capitalize">
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
              <div className="space-y-4">
                <div className="aspect-square rounded-lg bg-secondary overflow-hidden">
                  <img
                    src={image1}
                    alt="Featured product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg bg-accent overflow-hidden">
                  <img
                    src={image2}
                    alt="Featured product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-lg bg-accent overflow-hidden">
                  <img
                    src={image3}
                    alt="Featured product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg bg-secondary overflow-hidden">
                  <img
                    src={image4}
                    alt="Featured product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
