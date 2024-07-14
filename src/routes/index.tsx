import About from '../views/about'
import CancelPage from '../views/cancel'
import Dashboard from '../views/dashboard'
import Home from '../views/home'
import Login from '../views/login'
import SignupPage from '../views/signup'
import SuccessDisplay from '../views/success'

const routes = [
  {
    path: '/',
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/success/', element: <SuccessDisplay /> },
      { path: '/cancel/', element: <CancelPage /> },
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },
]

export default routes
