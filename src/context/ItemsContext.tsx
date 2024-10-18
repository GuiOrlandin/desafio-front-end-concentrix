import { createContext, ReactNode, useState, useEffect } from "react";

const ITEMS_STORAGE = "@items:items-1.0.0";

interface ItemsContextProviderProps {
  children: ReactNode;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  date: Date;
  property: string;
}

interface ItemsContentType {
  items: Item[];
  createItem: (items: Item) => void;
  deleteItem: (item_id: string) => void;
  editItem: (updatedItem: Item) => void;
}

export const ItemsContext = createContext({} as ItemsContentType);

export function ItemsContextProvider({ children }: ItemsContextProviderProps) {
  const [items, setItems] = useState<Item[]>(() => {
    const storedItems = localStorage.getItem(ITEMS_STORAGE);
    if (storedItems) {
      return JSON.parse(storedItems);
    }
    return [];
  });

  function createItem(item: Item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function deleteItem(item_id: string) {
    const filteredItems = items.filter((item) => item.id !== item_id);

    setItems(filteredItems);
  }

  function editItem(updatedItem: Item) {
    const updatedItems = items.map((itemInArray) =>
      itemInArray.id === updatedItem.id ? updatedItem : itemInArray
    );

    setItems(updatedItems);
  }

  useEffect(() => {
    localStorage.setItem(ITEMS_STORAGE, JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider value={{ items, createItem, deleteItem, editItem }}>
      {children}
    </ItemsContext.Provider>
  );
}
