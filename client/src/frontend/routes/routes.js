import config from '../config'
import DefaultLayout from '../layout/DefaultLayout'
import Home from '../pages/Home'
import HomeDetail from '../pages/HomeDetail'
import Register from '../pages/Register'
import Login from '../pages/Login'

const frontendRoutes = [
  {
    path: config.routes.home,
    component: Home,
    layout: DefaultLayout
  },
  {
    path: config.routes.homeDetail,
    component: HomeDetail,
    layout: DefaultLayout
  },
  {
    path: config.routes.register,
    component: Register,
    layout: DefaultLayout
  },
  {
    path: config.routes.login,
    component: Login,
    layout: DefaultLayout
  }
]

export { frontendRoutes }