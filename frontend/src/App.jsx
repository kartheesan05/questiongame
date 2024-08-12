import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home";
import Game from "./Game";
import Admin from "./Admin";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/game", element: <Game /> },
  { path: "/admin", element: <Admin /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
