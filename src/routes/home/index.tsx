import { useContext } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import { CardItemContainer, HomeContainer, ToggleThemeButton } from "./styles";
import { ThemeContext } from "../../context/ThemeContext";
import CardItem from "../../components/cardItem";
import { ItemsContext } from "../../context/ItemsContext";
import EditOrCreateItemDialog from "../../components/createOrEditItem";

export default function Home() {
  const { handleToggleTheme, theme } = useContext(ThemeContext);
  const { items } = useContext(ItemsContext);

  return (
    <HomeContainer $variant={theme}>
      <header>
        <EditOrCreateItemDialog dialogType="create" />
        <ToggleThemeButton onClick={() => handleToggleTheme()}>
          {theme === "dark" ? (
            <FaRegMoon size={22} color="white" />
          ) : (
            <MdWbSunny size={24} />
          )}
        </ToggleThemeButton>
      </header>

      <CardItemContainer>
        {items.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </CardItemContainer>
    </HomeContainer>
  );
}
