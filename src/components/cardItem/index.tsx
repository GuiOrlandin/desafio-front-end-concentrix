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
import EditOrCreateItemDialog from "../createOrEditItem";
import { Item } from "../../context/ItemsContext";

interface CardItemProps {
  item: Item;
}

export default function CardItem({ item }: CardItemProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <CardItemContainer $variant={theme}>
      <NameAndEditOrRemoveButtonsContainer>
        <h1>{item.name}</h1>

        <EditOrRemoveButtonsContainer>
          <EditOrCreateItemDialog dialogType="edit" initialItem={item} />
          <FaRegTrashAlt size={20} />
        </EditOrRemoveButtonsContainer>
      </NameAndEditOrRemoveButtonsContainer>
      <p>{item.description}</p>

      <PriorityAndDateContainer>
        <p>Prioridade: {item.priority}</p>
        <span>17 de outubro</span>
      </PriorityAndDateContainer>
    </CardItemContainer>
  );
}
