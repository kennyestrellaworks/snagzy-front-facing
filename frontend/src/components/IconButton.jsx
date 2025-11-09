import { useRef, useState } from "react";

export const IconButton = ({ Icon, dropdownList, theme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const leaveTimer = useRef(null);

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
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`nav-btn flex items-center justify-between p-2 ${
          isOpen ? "nav-btn-hover" : null
        } rounded-md transition-colors duration-200`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </button>

      {dropdownList && isOpen && (
        <div
          className={`nav-btn-dropdown origin-top-right absolute right-0 mt-1 w-40`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-col py-1" role="none">
            <h1 className="py-1 px-4">Choose theme</h1>
            <div className="flex flex-col m-1 gap-1">
              {dropdownList.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`nav-btn-dropdown-item block w-full text-left px-4 py-2 text-sm ${
                      theme === item.slug ? "nav-btn-dropdown-item-hover" : null
                    }`}
                    onClick={() => onThemeChange(item.slug)}
                  >
                    <div className="flex flex-col">
                      <span> {item.name}</span>
                      <span className="nav-item-slug"> {item.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
