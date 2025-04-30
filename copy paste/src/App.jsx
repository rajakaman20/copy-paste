import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Componet/Home";
import Navbar from "./Componet/Nevbar";
import Paste from "./Componet/Paste";
import ViewPaste from "./Componet/ViewPaste";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar></Navbar>
        <Home></Home>
      </div>
    ),
  },
  {
    path: "/Paste",
    element: (
      <div>
        <Navbar></Navbar>
        <Paste></Paste>
      </div>
    ),
  },
  {
    path: "/Paste/:id",
    element: (
      <div>
        <Navbar></Navbar>
        <ViewPaste></ViewPaste>
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
