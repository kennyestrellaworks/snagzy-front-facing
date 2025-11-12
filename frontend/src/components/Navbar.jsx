import logo from "../assets/images/logo.svg";
import { IoSearch } from "react-icons/io5";
import { CategoriesDropdownList } from "./CategoriesDropdownList";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { ThemesDropdownList } from "./ThemesDropdownList";
import { IconButton } from "./IconButton";
import { NavLinkItem } from "./NavLinkItem";

export const Navbar = () => {
  // Filter the array to get only the top-level categories
  const topLevelCategories = categories.filter(
    (item) => item.parent_id === null
  );

  return (
    <div className="flex h-16 w-full items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src={logo} alt="Snagzy logo" className="h-[2rem]" />
        </Link>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="hidden md:flex">
          <CategoriesDropdownList dropdownList={topLevelCategories} />
        </div>

        {/* Search  */}
        <div className="hidden w-[30rem] navbar-search lg:flex flex-1">
          <div className="relative w-full">
            <input
              id="search"
              type="search"
              placeholder="Search something..."
              className={`header-searchbar flex h-10 w-full pl-10 navbar-search-input rounded-md px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-200`}
            />
            <IoSearch
              className={`header-searchbar-icon absolute left-3 top-1/2 navbar-search-icon transform -translate-y-1/2 h-4 w-4`}
            />
          </div>
        </div>
      </div>

      {/* Right side  */}
      <div className="flex flex-row items-center gap-1">
        {/* Theme toggle / switcher  */}
        {/* <ThemesDropdownList /> */}

        {/* Bookmark button */}
        <IconButton Icon={FaRegHeart} />

        {/* Cart button */}
        <IconButton Icon={IoCartOutline} />

        {/* Sign up and sign in link  */}
        <nav className="flex flex-row flex-nowrap gap-1">
          <NavLinkItem
            Icon={null}
            dropdownList={null}
            to="/"
            dropdownPositionClass={"origin-top-right absolute right-0"}
            defaultClass={
              "nav-btn flex items-center justify-between px-2 py-2 text-white text-sm rounded-md transition-colors duration-200"
            }
            hoverClass={"nav-btn-hover"}
          >
            Sign up
          </NavLinkItem>
          <NavLinkItem
            Icon={null}
            dropdownList={null}
            to="/"
            dropdownPositionClass={"origin-top-right absolute right-0"}
            defaultClass={
              "nav-btn flex items-center justify-between px-2 py-2 text-white text-sm rounded-md transition-colors duration-200"
            }
            hoverClass={"nav-btn-hover"}
          >
            Sign in
          </NavLinkItem>

          {/* <NavLinkItem
            Icon={null}
            dropdownList={topLevelCategories}
            to="/"
            dropdownPositionClass={"origin-top-right absolute right-0"}
            defaultClass={
              "nav-btn flex items-center justify-between px-4 py-2 text-white text-sm rounded-md transition-colors duration-200"
            }
            hoverClass={"nav-btn-hover"}
          >
            Test
          </NavLinkItem> */}
        </nav>
      </div>
    </div>
  );
};
