import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}

export const CardItemContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 1rem 2rem;
  width: 16rem;
  height: 21rem;
  border-radius: 8px;
  position: relative;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  background: ${({ $variant }) =>
    $variant === "light" ? "#F5F5F5" : "#3F3D45"};

  color: ${({ $variant }) => ($variant === "light" ? "#3F3D45" : "#FFFEFE")};

  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const NameAndEditOrRemoveButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;

  h1 {
    font-size: 1rem;
    max-width: 11rem;
  }
`;

export const EditOrRemoveButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const Description = styled.p`
  max-height: 12rem;
  overflow: auto;

  scrollbar-color: white transparent;
  scrollbar-width: thin;
`;
export const PriorityAndDateContainer = styled.div`
  display: flex;
  gap: 2.6rem;
  align-items: center;
  position: absolute;
  top: 17.6rem;
`;
