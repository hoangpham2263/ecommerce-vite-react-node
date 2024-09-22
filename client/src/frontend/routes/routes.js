import config from '../config'
import DefaultLayout from '../layout/DefaultLayout'
import Home from '../pages/Home'

const frontendRoutes = [
  {
    path: config.routes.home,
    component: Home,
    layout: DefaultLayout
  }
]

export { frontendRoutes }