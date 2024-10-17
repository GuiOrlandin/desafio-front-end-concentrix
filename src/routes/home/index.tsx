import { useContext } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import { CardItemContainer, HomeContainer, ToggleThemeButton } from "./styles";
import { ThemeContext } from "../../context/ThemeContext";
import CardItem from "../../components/cardItem";

export default function Home() {
  const { handleToggleTheme, theme } = useContext(ThemeContext);

  return (
    <HomeContainer $variant={theme}>
      <header>
        <ToggleThemeButton onClick={() => handleToggleTheme()}>
          {theme === "dark" ? (
            <FaRegMoon size={22} color="white" />
          ) : (
            <MdWbSunny size={24} />
          )}
        </ToggleThemeButton>
      </header>

      <CardItemContainer>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </CardItemContainer>
    </HomeContainer>
  );
}
