import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}
interface IsSelected extends ThemeSelected {
  $isActive: boolean;
}

export const HomeContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding: 2rem 2rem 1rem 2rem;
  width: 100vw;
  min-height: 100vh;

  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#2C2C2D"};

  transition: background 0.3s ease-in-out;

  header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
  }
`;

export const ToggleThemeButton = styled.button`
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const CreateItemButtonAndToggleThemeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FilterSelect = styled.select<ThemeSelected>`
  background: ${({ $variant }) => ($variant === "light" ? "#F5F5F5" : "white")};

  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
`;

export const FilterInput = styled.input<ThemeSelected>`
  background: ${({ $variant }) => ($variant === "light" ? "#F5F5F5" : "white")};
  margin-right: 1rem;
  width: 20rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
`;

export const FilterContainer = styled.div`
  display: flex;
`;
export const CardItemContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 2rem;

  margin-bottom: 2rem;
`;

export const PaginationContainer = styled.div<ThemeSelected>`
  display: flex;
  gap: 0.1rem;
  justify-content: center;
`;

export const PaginationButton = styled.button<IsSelected>`
  color: ${({ $isActive, $variant }) =>
    $variant === "light" && !$isActive ? "#3F3D45" : "#FFFEFE"};
  color: ${({ $isActive, $variant }) =>
    $isActive && $variant === "light" && "#B9B0B0"};
  color: ${({ $isActive, $variant }) =>
    $isActive && $variant === "dark" && "#B9B0B0"};
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: ${({ $variant }) => ($variant === "light" ? "#9D9292" : "#B9B0B0")};
  }
`;
