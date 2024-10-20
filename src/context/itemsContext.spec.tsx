import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ItemsContext, ItemsContextProvider } from "./ItemsContext";

//Os testes das funcionalidades de adicionar, editar e deletar itens foram implementados no contexto global. No entanto, essas funcionalidades também poderiam ser testadas diretamente nos componentes correspondentes. Por exemplo, a adição e edição de itens poderiam ser verificadas no componente createOrEditItemDialog, enquanto a exclusão de itens poderia ser validada no componente deleteItemDialog.

describe("Items context", () => {
  it("should add item", async () => {
    render(
      <ItemsContextProvider>
        <ItemsContext.Consumer>
          {({ createItem, items }) => (
            <div>
              <button
                data-testid="add-button"
                onClick={() =>
                  createItem({
                    id: "2",
                    name: "Item 2",
                    priority: "Média",
                    description: "description of item 2",
                    date: new Date("2024-10-17T18:49:07.610Z"),
                  })
                }
              >
                Adicionar tarefa
              </button>

              <div>
                {items.map((item) => (
                  <div key={item.id}>{item.name}</div>
                ))}
              </div>
            </div>
          )}
        </ItemsContext.Consumer>
      </ItemsContextProvider>
    );

    const createItemButton = screen.getByTestId("add-button");

    userEvent.click(createItemButton);

    await waitFor(() => {
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  it("should edit item", async () => {
    render(
      <ItemsContextProvider>
        <ItemsContext.Consumer>
          {({ editItem, items }) => (
            <div>
              <button
                data-testid="edit-button"
                onClick={() =>
                  editItem({
                    id: "2",
                    name: "Item 2",
                    priority: "Média",
                    description: "edited description of item 2",
                    date: new Date("2024-10-17T18:49:07.610Z"),
                  })
                }
              >
                Editar tarefa
              </button>

              <div>
                {items.map((item) => (
                  <div key={item.name}>{item.name}</div>
                ))}
              </div>
            </div>
          )}
        </ItemsContext.Consumer>
      </ItemsContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    const editItemButton = screen.getByTestId("edit-button");

    userEvent.click(editItemButton);

    await waitFor(() => {
      expect(
        screen.queryByText("edited description of item 2")
      ).not.toBeInTheDocument();
    });
  });

  it("should delete item", async () => {
    render(
      <ItemsContextProvider>
        <ItemsContext.Consumer>
          {({ deleteItem, items }) => (
            <div>
              <button
                data-testid="delete-button"
                onClick={() => deleteItem("2")}
              >
                Remover tarefa
              </button>

              <div>
                {items.map((item) => (
                  <div key={item.name}>{item.name}</div>
                ))}
              </div>
            </div>
          )}
        </ItemsContext.Consumer>
      </ItemsContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    const deleteItemButton = screen.getByTestId("delete-button");

    userEvent.click(deleteItemButton);

    await waitFor(() => {
      expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
    });
  });
});
