import { NavLink } from "react-router-dom";

export const NavItemLink = ({ defaultClass, buttonClass, children, to }) => {
  return (
    <div className="relative inline-block text-left">
      <NavLink
        to={to}
        type="button"
        className={`${defaultClass} ${buttonClass} inline-flex justify-center items-center w-full rounded-md focus:outline-none transition duration-150`}
      >
        {children}
      </NavLink>
    </div>
  );
};
