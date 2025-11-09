export const NavItemButton = ({ Icon, defaultClass, buttonClass }) => {
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`${defaultClass} ${buttonClass} inline-flex justify-center items-center w-full rounded-md focus:outline-none transition duration-150`}
      >
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </button>
    </div>
  );
};
