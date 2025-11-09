import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export const NavLinkItem = ({
  Icon,
  children,
  dropdownList,
  to,
  dropdownPositionClass,
  defaultClass,
  hoverClass,
}) => {
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
        className={`${defaultClass} rounded-md transition-colors duration-200 ${
          isOpen ? hoverClass : null
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children}
        {Icon ? <Icon className="h-5 w-5 ml-2" /> : null}
      </button>

      {dropdownList && isOpen && (
        <div
          className={`nav-link-dropdown ${dropdownPositionClass} mt-1 w-40`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-col py-1" role="none">
            <div className="flex flex-col">
              {dropdownList.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    className={`nav-link-dropdown-item block w-full text-left px-4 py-2 text-sm`}
                    to={to}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
