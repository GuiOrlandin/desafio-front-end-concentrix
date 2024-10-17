import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}

export const HomeContainer = styled.div<ThemeSelected>`
  width: 100vw;
  height: 100vh;
  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#2C2C2D"};
`;

export const ToggleThemeButton = styled.button`
  background: none;
  border: none;
`;
