import { Link } from "react-router-dom";

const gradientVariants = {
  blue: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
  violet:
    "bg-gradient-to-r from-violet-500 to-blue-600 hover:from-cyan-600 hover:to-violet-700",
  green:
    "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
  orange:
    "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
  pink: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
  slate:
    "bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black",
};

const outlineVariants = {
  blue: "border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50",
  violet: "border-2 border-violet-500 text-violet-600 hover:bg-violet-50",
  green: "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50",
  orange: "border-2 border-orange-500 text-orange-600 hover:bg-orange-50",
  pink: "border-2 border-pink-500 text-pink-600 hover:bg-pink-50",
  slate: "border-2 border-slate-700 text-slate-700 hover:bg-slate-50",
};

const sizeVariants = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const GradientLink = ({
  variant = "blue",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  outline = false,
  children,
  className = "",
  disabled,
  to = "",
  ...props
}) => {
  const baseStyles = outline
    ? outlineVariants[variant]
    : gradientVariants[variant];
  const textColor = outline ? "" : "text-white";
  return (
    <Link
      to={to}
      className={`
        ${baseStyles}
        ${sizeVariants[size]}    
        ${textColor}
        font-semibold rounded-lg
        shadow-lg hover:shadow-xl
        transform transition-all duration-200
        hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        flex items-center justify-center gap-2
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon size={iconSizes[size]} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={iconSizes[size]} />}
    </Link>
  );
};
