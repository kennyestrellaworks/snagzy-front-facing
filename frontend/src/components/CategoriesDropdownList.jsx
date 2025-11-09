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
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setIsOpen(false);
      setActiveCategory(null);
    }, 200);
  };

  const handleCategoryEnter = (category, event) => {
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
  const topLevelCategories = categories.filter(
    (item) => item.parent_id === null
  );

  const handleSubcategories = (category, allCategories) => {
    category.subcategories = allCategories
      .filter((sub) => sub.parent_id === category._id)
      .map((sub) => handleSubcategories({ ...sub }, allCategories));
    return category;
  };

  const nestedCategories = topLevelCategories.map((cat) =>
    handleSubcategories({ ...cat }, categories)
  );

  // Find the active category with its subcategories
  const getActiveCategoryWithSubs = () => {
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

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink
          className={`category-btn flex items-center justify-between px-4 py-2 text-white font-semibold rounded-md shadow-md transition-colors duration-200 ${
            isOpen ? "category-btn-hover" : null
          }`}
        >
          Categories
          <MdKeyboardArrowDown
            className={`h-5 w-5 ml-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </NavLink>

        {isOpen && (
          <div className="flex absolute left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            {/* Main categories menu */}
            <div
              className="w-48 py-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              {nestedCategories.map((category) => (
                <div
                  key={category._id}
                  className="relative"
                  ref={(el) => (categoryItemsRef.current[category._id] = el)}
                  onMouseEnter={(e) => handleCategoryEnter(category, e)}
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
              ))}
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
