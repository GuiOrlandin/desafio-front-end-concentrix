import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}

export const HomeContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding: 2rem;
  width: 100vw;
  height: 100vh;

  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#2C2C2D"};

  header {
    display: flex;
    justify-content: flex-end;
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
export const CardItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;
