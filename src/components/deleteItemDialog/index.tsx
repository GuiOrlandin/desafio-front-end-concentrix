import * as Dialog from "@radix-ui/react-dialog";
import {
  Content,
  Overlay,
  TriggerDialogButton,
  CloseButton,
  DeleteButton,
  CloseAndSaveChangesButtonsContainer,
} from "../deleteItemDialog/style";

import { FaRegTrashCan } from "react-icons/fa6";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

interface DeleteItemDialogProps {
  onConfirmDelete: () => void;
}

export default function DeleteItemDialog({
  onConfirmDelete,
}: DeleteItemDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const colorOfDeleteIcon = theme === "dark" ? "white" : "#3F3D45";

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <TriggerDialogButton
          onClick={() => setOpen(true)}
          data-testid="delete-item-button"
        >
          <FaRegTrashCan size={22} color={colorOfDeleteIcon} />
        </TriggerDialogButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content $variant={theme}>
          <Dialog.Title>Deseja deletar seu item</Dialog.Title>

          <CloseAndSaveChangesButtonsContainer>
            <DeleteButton
              onClick={() => {
                onConfirmDelete(), setOpen(false);
              }}
            >
              Deletar
            </DeleteButton>
            <CloseButton onClick={() => setOpen(false)}>Fechar</CloseButton>
          </CloseAndSaveChangesButtonsContainer>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
