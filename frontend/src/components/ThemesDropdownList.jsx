import { useTheme } from "../context/ThemeContext";
import { themeOptions } from "../data/system";
import { IconButton } from "./IconButton";
import { MdOutlinePalette } from "react-icons/md";

export const ThemesDropdownList = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      Icon={MdOutlinePalette}
      dropdownList={themeOptions}
      theme={theme}
      onThemeChange={toggleTheme}
    />
  );
};
