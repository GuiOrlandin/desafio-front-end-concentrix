import { useContext, useState } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import {
  CardItemContainer,
  Description,
  EditOrRemoveButtonsContainer,
  NameAndEditOrRemoveButtonsContainer,
  PriorityAndDateContainer,
} from "./style";
import EditOrCreateItemDialog from "../createOrEditItemDialog";
import { Item, ItemsContext } from "../../context/ItemsContext";
import DeleteItemDialog from "../deleteItemDialog";

interface CardItemProps {
  item: Item;
}

export default function CardItem({ item }: CardItemProps) {
  const { theme } = useContext(ThemeContext);
  const { deleteItem } = useContext(ItemsContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = new Date(item.date).toLocaleDateString("pt-br", {
    day: "numeric",
    month: "long",
  });

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => deleteItem(item.id), 300);
  }

  return (
    <CardItemContainer $variant={theme} $isDeleting={isDeleting}>
      <NameAndEditOrRemoveButtonsContainer>
        <h1>{item.name}</h1>

        <EditOrRemoveButtonsContainer>
          <EditOrCreateItemDialog dialogType="edit" initialItem={item} />
          <DeleteItemDialog onConfirmDelete={() => handleDelete()} />
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
