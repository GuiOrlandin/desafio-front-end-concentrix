import { useContext } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import { HomeContainer, ToggleThemeButton } from "./styles";
import { ThemeContext } from "../../context/ThemeContext";

export default function Home() {
  const { handleToggleTheme, theme } = useContext(ThemeContext);

  console.log(theme);

  return (
    <HomeContainer $variant={theme}>
      <ToggleThemeButton onClick={() => handleToggleTheme()}>
        {theme === "dark" ? (
          <FaRegMoon size={22} color="white" />
        ) : (
          <MdWbSunny size={24} />
        )}
      </ToggleThemeButton>
    </HomeContainer>
  );
}
