
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home';

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
