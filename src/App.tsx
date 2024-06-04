import Home from './views/home/index'
import About from './views/about/index'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
