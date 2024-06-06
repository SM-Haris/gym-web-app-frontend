import About from "../views/about";
import Dashboard from "../views/dashboard";
import Home from "../views/home";
import Login from "../views/login";
import SignupPage from "../views/signup";

const routes = [
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
];


export default routes