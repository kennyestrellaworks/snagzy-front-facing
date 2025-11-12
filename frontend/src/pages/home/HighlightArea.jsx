import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, CircleDot, Circle } from "lucide-react";
import { highlightProducts } from "../../data/highlight";
import { GradientButton } from "../../components/Button/GradientButton";
import { useData } from "../../context/DataContext";

export const HighlightArea = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const AUTO_ADVANCE_DELAY = 5000; // 5 seconds
  const { getProduct } = useData();

  const primaryHighlight = highlightProducts.filter((item) => {
    return item.type === "primary";
  });
  // console.log("primaryHighlight", primaryHighlight);
  // console.log("primaryHighlight", primaryHighlight.length);
  const totalSlides = primaryHighlight.length;

  const secondaryHighlight = highlightProducts.filter((item) => {
    return item.type === "secondary";
  });

  // Function to move to the next slide, wrapping around
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // Function to move to the previous slide, wrapping around
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  // Auto-advance functionality using useEffect
  useEffect(() => {
    const timer = setInterval(nextSlide, AUTO_ADVANCE_DELAY);
    // Cleanup function to clear the interval when the component unmounts or nextSlide changes
    return () => clearInterval(timer);
  }, [nextSlide, AUTO_ADVANCE_DELAY]);

  // Handle clicking on the indicator dots
  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  // const currentItem = highlightProducts[currentSlide];

  return (
    <section className="shop-by-category-section relative shop-by-category-section text-foreground py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <h1 className="text-[2rem] font-semibold">Best Deals</h1>
          <p className="text-lg mt-1">Shop from our best deals for today</p>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-12">
          <div className="lg:col-span-2">
            {/* Existing Carousel Outer Container */}
            <div
              className={`relative w-full shadow-md rounded-xl overflow-hidden transition-colors duration-1000`}
            >
              {/* Carousel Content Container */}
              <div className={`relative h-[400px] overflow-hidden`}>
                {primaryHighlight.map((item, index) => {
                  const product = getProduct(item.productId);
                  return (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                        index === currentSlide
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                      style={{
                        backgroundColor: item.color,
                      }}
                    >
                      {/* Diagonal - stays behind the image */}
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          // Angle and stops adjusted for LEFT SIDE white diagonal
                          backgroundImage: `linear-gradient(100deg, ${item.color} 0%, ${item.color} 40%, transparent 26%)`,
                          opacity: 1,
                          filter: "brightness(0.9)",
                        }}
                        aria-hidden="true"
                      ></div>

                      {/* Image - same positioning as your original */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full relative z-10"
                      />

                      <div
                        className="absolute inset-0 flex items-center justify-end overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%)",
                        }}
                      >
                        {/* Text Wrapper for Slide-In Effect (Right Side) */}
                        <div
                          className={`relative p-6 text-white transition-transform w-[300px] duration-500 ease-out text-left mr-[100px] ${
                            index === currentSlide
                              ? "translate-x-0"
                              : "translate-x-full"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <p
                              className="relative inline-block text-white font-semibold py-1 px-3 rounded-md shadow-md overflow-hidden"
                              style={{ backgroundColor: item.color }}
                            >
                              <span className="relative z-10">
                                ${product.price}
                              </span>
                              <span className="absolute inset-0 bg-black/40"></span>
                            </p>

                            <p className="text-slate-300">
                              {product.stock > 0
                                ? `${product.stock} in stock`
                                : "Out of Stock"}
                            </p>
                          </div>

                          <div className="flex flex-col mt-4">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
                              {product.name}
                            </h2>
                            <p className="text-base sm:text-xl drop-shadow-lg font-light">
                              {product.description}
                            </p>
                          </div>
                          <div className="flex mt-6">
                            <GradientButton
                              to="sellers"
                              variant="orange"
                              size="sm"
                              className={`py-2 px-4 rounded-md font-medium transition-colors ${
                                product.stock > 0
                                  ? ""
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {product.stock > 0
                                ? "Add to Cart"
                                : "Out of Stock"}
                            </GradientButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Navigation Controls (Left Button) - z-10 ensures they are above the slides */}
                <div className="absolute inset-y-0 left-0 flex items-center z-10">
                  <button
                    onClick={prevSlide}
                    className="p-2 m-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all duration-300 backdrop-blur-sm shadow-md focus:outline-none focus:ring-4 focus:ring-white/50"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-8 sm:h-8" />
                  </button>
                </div>

                {/* Navigation Controls (Right Button) */}
                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                  <button
                    onClick={nextSlide}
                    className="p-2 m-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all duration-300 backdrop-blur-sm shadow-md focus:outline-none focus:ring-4 focus:ring-white/50"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-8 sm:h-8" />
                  </button>
                </div>

                {/* Indicators (Dots) */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {primaryHighlight.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleIndicatorClick(index)}
                      className="text-white hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {index === currentSlide ? (
                        // Filled dot for current slide
                        <CircleDot className="w-3 h-3 sm:w-4 sm:h-4 fill-white text-white" />
                      ) : (
                        // Hollow dot for inactive slides
                        <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-white opacity-70" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (panels auto-match left height) */}
          <div className="lg:col-span-1 flex flex-col justify-between h-full gap-6">
            {secondaryHighlight.map((item, index) => {
              const product = getProduct(item.productId);
              return (
                <div
                  key={index}
                  className="flex-1 bg-white rounded-xl overflow-hidden shadow-xl items-center justify-center"
                >
                  <div
                    className="w-full h-full bg-gray-100 rounded-3xl flex flex-col md:flex-row items-center shadow-lg"
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-full w-full">
                      {/* Gradient Overlay */}
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          backgroundImage: `linear-gradient(100deg, ${item.color} 0%, ${item.color} 60%, transparent 26%)`,
                          opacity: 1,
                          filter: "brightness(0.7)",
                        }}
                        aria-hidden="true"
                      ></div>

                      {/* Image — now positioned */}
                      <img
                        src={item.image}
                        alt="Sample"
                        className="w-full h-full rounded-2xl relative z-10 object-cover"
                      />
                    </div>

                    {/* Text Section */}
                    <div className="space-y-4 w-[620px] mr-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <p
                            className="relative inline-block text-white font-semibold px-3 rounded-md shadow-md overflow-hidden"
                            style={{ backgroundColor: item.color }}
                          >
                            <span className="relative z-10 text-[12px]">
                              ${product.price}
                            </span>
                            <span className="absolute inset-0 bg-black/20"></span>
                          </p>

                          <p className="text-slate-600 text-[14px]">
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of Stock"}
                          </p>
                        </div>
                        <h2 className="text-lg mt-2 font-bold drop-shadow-lg leading-tight">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 text-[14px]">
                          {product.description.length > 50
                            ? product.description.slice(0, 50) + "..."
                            : product.description}
                        </p>
                      </div>
                      <div className="flex mt-6">
                        <GradientButton
                          to="sellers"
                          variant="orange"
                          size="sm"
                          className={`py-2 px-4 rounded-md font-medium transition-colors ${
                            product.stock > 0
                              ? ""
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
