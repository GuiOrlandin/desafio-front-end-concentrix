import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import { FaRegTrashAlt } from "react-icons/fa";

import {
  CardItemContainer,
  Description,
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

  const formatedDate = new Date(item.date).toLocaleDateString("pt-br", {
    day: "numeric",
    month: "long",
  });

  return (
    <CardItemContainer $variant={theme}>
      <NameAndEditOrRemoveButtonsContainer>
        <h1>{item.name}</h1>

        <EditOrRemoveButtonsContainer>
          <EditOrCreateItemDialog dialogType="edit" initialItem={item} />
          <FaRegTrashAlt size={20} />
        </EditOrRemoveButtonsContainer>
      </NameAndEditOrRemoveButtonsContainer>
      <Description>{item.description}</Description>

      <PriorityAndDateContainer>
        <p>Prioridade: {item.priority}</p>
        <span>{formatedDate}</span>
      </PriorityAndDateContainer>
    </CardItemContainer>
  );
}
