import config from '../config'
import AdminLayout from '../layout/AdminLayout'
import NoLayout from '../layout/NoLayout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Account from '../pages/Account'

const adminRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: NoLayout
  },
  {
    path: config.routes.dashboard,
    component: Dashboard,
    layout: AdminLayout
  },
  {
    path: config.routes.account,
    component: Account,
    layout: AdminLayout
  }
]

export { adminRoutes }