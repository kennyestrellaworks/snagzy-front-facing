import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const NavItemButtonDropdown = ({
  listItems,
  Icon,
  defaultClass,
  buttonClass,
  dropdownPositionClass,
  dropdownList,
  dropdownListItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const leaveTimer = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // console.log("theme", theme);

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
    }, 200);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`${defaultClass} ${buttonClass} ${
          isOpen ? "nav-item-button-icon-hover" : null
        } inline-flex justify-center items-center w-full rounded-md focus:outline-none transition duration-150`}
      >
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </button>

      {isOpen && (
        <div
          className={`${dropdownPositionClass} origin-top-right absolute mt-1 w-40 rounded-md shadow-lg ${dropdownList} z-10`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-col m-1 gap-1" role="none">
            <h1 className="py-1 px-4 nav-item-dropdown-theme-title">
              Choose theme
            </h1>
            {listItems.map((item) => (
              <button
                key={item}
                className={`${dropdownListItem} ${
                  theme === item.slug
                    ? "nav-item-dropdown-theme-highlight"
                    : null
                } flex flex-col px-4 py-2 rounded-[5px] text-sm transition duration-100`}
                to=""
                onClick={() => toggleTheme(item.slug)}
              >
                <span className={`nav-item-dropdown-theme-name-text`}>
                  {item.name}
                </span>
                <span className={`nav-item-dropdown-theme-name-desc`}>
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
