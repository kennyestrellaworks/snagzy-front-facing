import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { useData } from "../context/DataContext";

export const ProductCard = ({ products }) => {
  const isBookmarked = false;
  const { getStoreData } = useData();

  return (
    <div className="grid md:grid-cols-6 mt-12 gap-2 items-center">
      {products.map((item, index) => {
        const store = getStoreData(item.storeId);
        // console.log("store", store);

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={item.gallery[0]}
                alt={item.name}
                className="w-full h-[280px] object-cover"
              />

              {/* Bookmark Button */}
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                {isBookmarked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-600" />
                )}
              </button>

              {/* Stock Status Badge */}
              {item.stock <= 5 && item.stock > 0 && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Low Stock
                </div>
              )}
              {item.stock === 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Rest of your product info remains the same */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {item.name}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <img
                  src={store.logoUrl}
                  alt={store.storeName}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{store.storeName}</span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center mb-3">
                <div className="flex items-center gap-1">
                  <MdOutlineStar className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                  <span>
                    {!item.rating.average
                      ? "No ratings yet"
                      : item.rating.average}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.price}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                </div>
              </div>

              <button
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  item.stock > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={item.stock === 0}
              >
                {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
