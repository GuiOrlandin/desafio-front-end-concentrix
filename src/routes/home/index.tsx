import { useContext, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import {
  CardItemContainer,
  FilterContainer,
  FilterInput,
  HomeContainer,
  PaginationContainer,
  ToggleThemeButton,
  FilterSelect,
  CreateItemButtonAndToggleThemeContainer,
} from "./styles";
import { ThemeContext } from "../../context/ThemeContext";
import CardItem from "../../components/cardItem";
import { ItemsContext } from "../../context/ItemsContext";
import EditOrCreateItemDialog from "../../components/createOrEditItemDialog";

export default function Home() {
  const { handleToggleTheme, theme } = useContext(ThemeContext);
  const { items } = useContext(ItemsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterPriority, setFilterPriority] = useState("");
  const limit = 10;

  const filteredItems = items
    .filter((item) =>
      filterPriority ? item.priority.toLowerCase() === filterPriority : true
    )
    .filter((item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / limit);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <HomeContainer $variant={theme}>
      <header>
        <FilterContainer>
          <FilterInput
            $variant={theme}
            type="text"
            placeholder="Filtrar por nome"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <FilterSelect
            $variant={theme}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">Todas as Prioridades</option>
            <option value="alta">Alta</option>
            <option value="média">Média</option>
            <option value="baixa">Baixa</option>
          </FilterSelect>
          <FilterSelect
            $variant={theme}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Mais Novos</option>
            <option value="oldest">Mais Antigos</option>
          </FilterSelect>
        </FilterContainer>
        <CreateItemButtonAndToggleThemeContainer>
          <EditOrCreateItemDialog dialogType="create" />
          <ToggleThemeButton onClick={() => handleToggleTheme()}>
            {theme === "dark" ? (
              <FaRegMoon size={22} color="white" />
            ) : (
              <MdWbSunny size={24} />
            )}
          </ToggleThemeButton>
        </CreateItemButtonAndToggleThemeContainer>
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
