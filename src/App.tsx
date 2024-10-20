import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import { ThemeContextProvider } from "./context/ThemeContext";
import { ItemsContextProvider } from "./context/ItemsContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <ThemeContextProvider>
      <ItemsContextProvider>
        <RouterProvider router={router} />
      </ItemsContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
