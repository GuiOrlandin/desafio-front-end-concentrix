import styled, { css, keyframes } from "styled-components";

interface ThemeSelected {
  $variant: string;
  $isDeleting: boolean;
  $isEdited: boolean;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1); 
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.95); 
  }
`;

export const CardItemContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem 2rem;
  height: 21rem;
  border-radius: 8px;
  position: relative;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  background: ${({ $variant }) =>
    $variant === "light" ? "#F5F5F5" : "#3F3D45"};

  color: ${({ $variant }) => ($variant === "light" ? "#3F3D45" : "#FFFEFE")};

  ${({ $isDeleting, $isEdited }) => {
    if ($isDeleting) {
      return css`
        animation: ${fadeOut} 0.3s forwards;
      `;
    }

    if ($isEdited) {
      return css`
        animation: transform scale(1) 0.5s ease forwards;
      `;
    }

    return css`
      animation: ${fadeIn} 0.3s forwards;
    `;
  }}
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
  width: 80%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 17.6rem;

  p {
    font-size: 0.8rem;
  }

  span {
    font-size: 0.8rem;
  }
`;
