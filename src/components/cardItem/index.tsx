import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

import {
  CardItemContainer,
  EditOrRemoveButtonsContainer,
  NameAndEditOrRemoveButtonsContainer,
  PriorityAndDateContainer,
} from "./style";

export default function CardItem() {
  const { theme } = useContext(ThemeContext);

  return (
    <CardItemContainer $variant={theme}>
      <NameAndEditOrRemoveButtonsContainer>
        <h1>Caderno</h1>

        <EditOrRemoveButtonsContainer>
          <CiEdit size={22} />
          <FaRegTrashAlt size={20} />
        </EditOrRemoveButtonsContainer>
      </NameAndEditOrRemoveButtonsContainer>
      <p>
        Descrição do item aqui, Descrição do item aqui, Descrição do item aqui,
        Descrição do item aqui, Descrição do item aqui,{" "}
      </p>

      <PriorityAndDateContainer>
        <p>Prioridade: Alta</p>
        <span>17 de outubro</span>
      </PriorityAndDateContainer>
    </CardItemContainer>
  );
}
