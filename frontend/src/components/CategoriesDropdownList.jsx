import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { categories } from "../data/categories";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

export const CategoriesDropdownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeCategoryPosition, setActiveCategoryPosition] = useState(0);
  const leaveTimer = useRef(null);
  const categoryItemsRef = useRef({});

  const handleMouseEnter = () => {
    // console.log("runs");
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // console.log("runs");
    leaveTimer.current = setTimeout(() => {
      setIsOpen(false);
      setActiveCategory(null);
    }, 200);
  };

  const handleCategoryEnter = (category) => {
    // console.log("runs");
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setActiveCategory(category);

    // Get the position of the hovered category item
    if (categoryItemsRef.current[category._id]) {
      const rect =
        categoryItemsRef.current[category._id].getBoundingClientRect();
      setActiveCategoryPosition(rect.top);
    }
  };

  // Filter the array to get only the top-level categories
  const topLevelCategories = categories.filter((item) => {
    // console.log("runs");
    // Runs on load
    return item.parent_id === null;
  });

  const handleSubcategories = (category, allCategories) => {
    // console.log("category", category);
    // Runs on load
    category.subcategories = allCategories
      .filter((sub) => sub.parent_id === category._id)
      .map((sub) => handleSubcategories({ ...sub }, allCategories));
    return category;
  };

  const nestedCategories = topLevelCategories.map((cat) => {
    // console.log("cat ", cat);
    // console.log("cat ", { ...cat }, categories);
    // Runs on load
    return handleSubcategories({ ...cat }, categories);
  });

  // Find the active category with its subcategories
  const getActiveCategoryWithSubs = () => {
    // console.log("runs");
    // Runs on load
    if (!activeCategory) return null;

    const findCategory = (items) => {
      for (const item of items) {
        if (item._id === activeCategory._id) {
          return item;
        }
        if (item.subcategories && item.subcategories.length > 0) {
          const found = findCategory(item.subcategories);
          if (found) return found;
        }
      }
      return null;
    };

    return findCategory(nestedCategories);
  };

  const activeCategoryWithSubs = getActiveCategoryWithSubs();
  // console.log("activeCategoryWithSubs", activeCategoryWithSubs);
  // Runs on load but null

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105 flex items-center justify-between px-6 py-2 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 ${
            isOpen
              ? "bg-gradient-to-r from-cyan-600 to-blue-700 scale-105"
              : null
          }`}
        >
          Categories
          <MdKeyboardArrowDown
            className={`h-5 w-5 ml-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <div className="flex absolute left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            {/* Main categories menu */}
            <div
              className="w-48 py-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              {nestedCategories.map((category) => {
                // console.log("category ddddd ", category);
                return (
                  <div
                    key={category._id}
                    className="relative"
                    ref={(el) => (categoryItemsRef.current[category._id] = el)}
                    onMouseEnter={() => handleCategoryEnter(category)}
                  >
                    <NavLink
                      className={`nav-link-dropdown-item flex items-center justify-between w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        activeCategory?._id === category._id ? "bg-gray-50" : ""
                      }`}
                      to={""}
                    >
                      {category.name}
                      {category.subcategories &&
                        category.subcategories.length > 0 && (
                          <MdKeyboardArrowRight className="h-4 w-4 text-gray-400" />
                        )}
                    </NavLink>
                  </div>
                );
              })}
            </div>

            {/* Subcategories menu - positioned aligned with parent */}
            {activeCategoryWithSubs &&
              activeCategoryWithSubs.subcategories &&
              activeCategoryWithSubs.subcategories.length > 0 && (
                <div
                  className="w-48 py-2 border-l border-gray-200"
                  style={{
                    position: "absolute",
                    left: "100%",
                    top: `${activeCategoryPosition}px`,
                    transform: "translateY(-50%)",
                  }}
                  onMouseEnter={() => handleCategoryEnter(activeCategory)}
                >
                  <div className="bg-white rounded-md shadow-lg border border-gray-200">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      {activeCategoryWithSubs.name}
                    </div>
                    <div className="py-1">
                      {activeCategoryWithSubs.subcategories.map(
                        (subcategory) => (
                          <NavLink
                            key={subcategory._id}
                            className="nav-link-dropdown-item block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            to={""}
                          >
                            {subcategory.name}
                          </NavLink>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  );
};
