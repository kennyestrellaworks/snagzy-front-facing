import { NavLink } from "react-router-dom";
import "./Button.css";

export const Button = ({ text, icon: Icon, variant, className }) => {
  const baseStyle =
    "group flex items-center justify-center space-x-2 px-6 py-3 font-regular rounded-lg transition-all duration-300 transform shadow-md active:scale-98 focus:outline-none focus:ring-4";

  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "btn-primary";
      break;
    case "secondary":
      variantStyles = "btn-secondary";
      break;
    case "success":
      variantStyles =
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-300";
      break;
    case "outline":
      variantStyles = "btn-outline";
      break;
    default:
      variantStyles =
        "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300";
  }

  return (
    <button className={`${baseStyle} ${variantStyles} ${className}`}>
      <span>{text}</span>
      {Icon && (
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
};
