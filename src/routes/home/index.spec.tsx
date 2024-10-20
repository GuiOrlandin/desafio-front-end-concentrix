import { render, screen, waitFor } from "@testing-library/react";
import { ItemsContext } from "../../context/ItemsContext";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Home from "./index";
import { ThemeContext } from "../../context/ThemeContext";

const mockItems = [
  {
    id: "1",
    name: "Item 1",
    priority: "Alta",
    description: "description of item 1",
    date: new Date("2024-10-18T18:49:07.610Z"),
  },
  {
    id: "2",
    name: "Item 2",
    priority: "Média",
    description: "description of item 2",
    date: new Date("2024-10-17T18:49:07.610Z"),
  },
  {
    id: "3",
    name: "Item 3",
    priority: "Baixa",
    description: "description of item 3",
    date: new Date("2024-10-16T18:49:07.610Z"),
  },
];

describe("Home component", () => {
  const renderComponent = (theme = "light", items = mockItems) => {
    const handleToggleTheme = jest.fn();
    const createItem = jest.fn();
    const deleteItem = jest.fn();
    const editItem = jest.fn();

    return render(
      <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
        <ItemsContext.Provider
          value={{ items, createItem, deleteItem, editItem }}
        >
          <Home />
        </ItemsContext.Provider>
      </ThemeContext.Provider>
    );
  };

  it("should render the component with items and pagination", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });

  it("should filter item by name", async () => {
    renderComponent();

    const nameFilter = screen.getByPlaceholderText("Filtrar por nome");

    userEvent.type(nameFilter, "item 1");

    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
    });
  });
  it("should filter item by priority", async () => {
    renderComponent();

    const priorityFilter = screen.getByTestId("filter-item-by-priority");

    userEvent.selectOptions(priorityFilter, "Alta");

    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
    });
  });

  it("should filter item from oldest to newest", async () => {
    renderComponent();

    const ageFilter = screen.getByTestId("filter-item-by-age");

    userEvent.selectOptions(ageFilter, "Mais Antigos");

    await waitFor(() => {
      const items = screen.getAllByTestId("card-item");

      expect(items[0]).toHaveTextContent("Item 3");
      expect(items[1]).toHaveTextContent("Item 2");
      expect(items[2]).toHaveTextContent("Item 1");
    });
  });
});
