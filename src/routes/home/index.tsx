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
  PaginationButton,
  FilterSelectContainer,
  CardWithoutItemContainer,
} from "./styles";
import CardItem from "../../components/cardItem";
import { ItemsContext } from "../../context/ItemsContext";
import EditOrCreateItemDialog from "../../components/createOrEditItemDialog";
import { ThemeContext } from "../../context/ThemeContext";

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
          <FilterSelectContainer>
            <FilterSelect
              $variant={theme}
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              data-testid="filter-item-by-priority"
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
              data-testid="filter-item-by-age"
            >
              <option value="newest">Mais Novos</option>
              <option value="oldest">Mais Antigos</option>
            </FilterSelect>
          </FilterSelectContainer>
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

      {paginatedItems.length > 0 ? (
        <CardItemContainer>
          {paginatedItems.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </CardItemContainer>
      ) : (
        <CardWithoutItemContainer $variant={theme}>
          <h1>Não contém nenhum item.</h1>
        </CardWithoutItemContainer>
      )}

      <PaginationContainer $variant={theme}>
        {pages.map((page) => (
          <PaginationButton
            key={page}
            onClick={() => setCurrentPage(page)}
            $isActive={currentPage === page}
            $variant={theme}
          >
            {page}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </HomeContainer>
  );
}
