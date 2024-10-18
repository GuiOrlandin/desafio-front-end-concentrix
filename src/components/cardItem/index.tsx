import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";


import {
  CardItemContainer,
  Description,
  EditOrRemoveButtonsContainer,
  NameAndEditOrRemoveButtonsContainer,
  PriorityAndDateContainer,
} from "./style";
import EditOrCreateItemDialog from "../createOrEditItemDialog";
import { Item } from "../../context/ItemsContext";
import DeleteItemDialog from "../deleteItemDialog";

interface CardItemProps {
  item: Item;
}

export default function CardItem({ item }: CardItemProps) {
  const { theme } = useContext(ThemeContext);

  const formattedDate = new Date(item.date).toLocaleDateString("pt-br", {
    day: "numeric",
    month: "long",
  });

  return (
    <CardItemContainer $variant={theme}>
      <NameAndEditOrRemoveButtonsContainer>
        <h1>{item.name}</h1>

        <EditOrRemoveButtonsContainer>
          <EditOrCreateItemDialog dialogType="edit" initialItem={item} />
          <DeleteItemDialog item_id={item.id} />
        </EditOrRemoveButtonsContainer>
      </NameAndEditOrRemoveButtonsContainer>
      <Description>{item.description}</Description>

      <PriorityAndDateContainer>
        <p>Prioridade: {item.priority}</p>
        <span>{formattedDate}</span>
      </PriorityAndDateContainer>
    </CardItemContainer>
  );
}
