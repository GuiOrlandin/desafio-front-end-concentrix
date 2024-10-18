import { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseAndSaveChangesButtonsContainer,
  CloseButton,
  Content,
  CreateButton,
  CreateTaskButton,
  ErrorMessage,
  FormOfCreateOrEditItem,
  Overlay,
  SaveButton,
  Title,
  TriggerDialogButton,
} from "./style";

import { AiOutlineEdit } from "react-icons/ai";
import { ThemeContext } from "../../context/ThemeContext";
import { Item, ItemsContext } from "../../context/ItemsContext";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditOrCreateTaskDialogProps {
  initialItem?: Item;
  dialogType: "edit" | "create";
}

const itemSchema = z.object({
  name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres."),
  description: z.string(),
  priority: z.string(),
});

type ItemSchema = z.infer<typeof itemSchema>;

export default function EditOrCreateItemDialog({
  initialItem,
  dialogType,
}: EditOrCreateTaskDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const isEditMode = dialogType === "edit";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: isEditMode
      ? {
          name: initialItem?.name,
          description: initialItem?.description || "",
          priority: initialItem?.priority,
        }
      : {
          name: "",
          description: "",
          priority: "Alta",
        },
  });

  const { theme } = useContext(ThemeContext);
  const { createItem, editItem } = useContext(ItemsContext);

  const randomId = uuidv4();

  const colorOfEditIcon = theme === "dark" ? "white" : "#3F3D45";

  const priorityTypes = [
    { type: "Alta" },
    { type: "Média" },
    { type: "Baixa" },
  ];

  function handleCreateItem(data: ItemSchema) {
    console.log(data);

    createItem({
      description: data.description,
      date: new Date(),
      id: randomId,
      name: data.name,
      priority: data.priority,
    });

    reset();

    setOpen(false);
  }

  function handleEditItem(editedData: ItemSchema) {
    editItem({
      description: editedData.description,
      date: initialItem!.date,
      id: initialItem!.id,
      name: editedData.name,
      priority: editedData.priority,
    });

    setOpen(false);
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        {dialogType === "edit" ? (
          <TriggerDialogButton
            onClick={() => setOpen(true)}
            data-testid="edit-item-button"
          >
            <AiOutlineEdit size={24} color={colorOfEditIcon} />
          </TriggerDialogButton>
        ) : (
          <CreateTaskButton onClick={() => setOpen(true)}>
            Crie seu item
          </CreateTaskButton>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content $variant={theme}>
          {dialogType === "edit" ? (
            <>
              <Title>Edite seu item</Title>

              <FormOfCreateOrEditItem onSubmit={handleSubmit(handleEditItem)}>
                <label>Nome do seu item</label>
                <input
                  placeholder="digite o nome do seu item"
                  {...register("name")}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
                <label>Descrição do seu item</label>
                <input
                  placeholder="digite a descrição do seu item"
                  {...register("description")}
                />
                <label>Prioridade do seu item</label>
                <select {...register("priority")}>
                  {priorityTypes.map((priority, index) => (
                    <option key={index} value={priority.type}>
                      {priority.type}
                    </option>
                  ))}
                </select>

                <CloseAndSaveChangesButtonsContainer>
                  {dialogType === "edit" ? (
                    <SaveButton>Editar</SaveButton>
                  ) : (
                    <CreateButton type="submit">Criar</CreateButton>
                  )}

                  <CloseButton onClick={() => setOpen(false)}>
                    Fechar
                  </CloseButton>
                </CloseAndSaveChangesButtonsContainer>
              </FormOfCreateOrEditItem>
            </>
          ) : (
            <>
              <Title>Crie seu item</Title>

              <FormOfCreateOrEditItem onSubmit={handleSubmit(handleCreateItem)}>
                <label>Nome do seu item</label>
                <input
                  placeholder="digite o nome do seu item"
                  {...register("name")}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
                <label>Descrição do seu item</label>
                <input
                  placeholder="digite a descrição do seu item"
                  {...register("description")}
                />
                <label>Prioridade do seu item</label>
                <select {...register("priority")}>
                  {priorityTypes.map((priority, index) => (
                    <option key={index} value={priority.type}>
                      {priority.type}
                    </option>
                  ))}
                </select>

                <CloseAndSaveChangesButtonsContainer>
                  {dialogType === "create" ? (
                    <CreateButton type="submit">Criar</CreateButton>
                  ) : (
                    <SaveButton>Editar</SaveButton>
                  )}

                  <CloseButton onClick={() => setOpen(false)}>
                    Fechar
                  </CloseButton>
                </CloseAndSaveChangesButtonsContainer>
              </FormOfCreateOrEditItem>
            </>
          )}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
