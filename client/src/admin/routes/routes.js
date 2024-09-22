import config from '../config'
// import AdminLayout from '../layout/AdminLayout'
import NoLayout from '../layout/NoLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'

const adminRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: NoLayout
  },
  {
    path: config.routes.register,
    component: Register,
    layout: NoLayout
  }
]

export { adminRoutes }