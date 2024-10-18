import { useContext, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import { CardItemContainer, HomeContainer, ToggleThemeButton } from "./styles";
import { ThemeContext } from "../../context/ThemeContext";
import CardItem from "../../components/cardItem";
import { Item, ItemsContext } from "../../context/ItemsContext";

export default function Home() {
  const [item, SetItem] = useState<Item>();
  const { handleToggleTheme, theme } = useContext(ThemeContext);
  const { items, createItem, deleteItem, editItem } = useContext(ItemsContext);

  function handleCreateItem() {
    createItem({
      description: item!.description,
      date: new Date(),
      id: "a2w4124asafa1",
      name: item!.name,
      property: item!.property,
    });
  }
  function handleEditItem() {
    editItem({
      description: "foi editado",
      date: new Date(),
      id: "a2w4124asafa1",
      name: "Foi editado",
      property: "muito alto",
    });
  }
  function handleDeleteItem() {
    deleteItem("a2w41241");
  }

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
      </CardItemContainer>
    </HomeContainer>
  );
}
