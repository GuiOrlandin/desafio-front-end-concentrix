import { useContext, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import {
  CardItemContainer,
  HomeContainer,
  PaginationContainer,
  ToggleThemeButton,
} from "./styles";
import { ThemeContext } from "../../context/ThemeContext";
import CardItem from "../../components/cardItem";
import { ItemsContext } from "../../context/ItemsContext";
import EditOrCreateItemDialog from "../../components/createOrEditItemDialog";

export default function Home() {
  const { handleToggleTheme, theme } = useContext(ThemeContext);
  const { items } = useContext(ItemsContext);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  const sortedItems = items.sort(
    (itemA, itemB) =>
      new Date(itemB.date).getTime() - new Date(itemA.date).getTime()
  );

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = sortedItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

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
        {paginatedItems.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </CardItemContainer>

      <PaginationContainer $variant={theme}>
        {pages.map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
      </PaginationContainer>
    </HomeContainer>
  );
}
