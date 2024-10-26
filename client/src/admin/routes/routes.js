import config from '../config'
import AdminLayout from '../layout/AdminLayout'
import NoLayout from '../layout/NoLayout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Account from '../pages/Account'
import Position from '../pages/Position'
import PositionRole from '../pages/PositionRole'
import Role from '../pages/Role'
import Product from '../pages/Product'
import Profile from '../pages/Profile'
import ProductAttribute from '../pages/ProductAttribute'
import ProductCategories from '../pages/ProductCategories'

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
  },
  {
    path: config.routes.position,
    component: Position,
    layout: AdminLayout
  },
  {
    path: config.routes.positionRole,
    component: PositionRole,
    layout: AdminLayout
  },
  {
    path: config.routes.role,
    component: Role,
    layout: AdminLayout
  },
  {
    path: config.routes.product,
    component: Product,
    layout: AdminLayout
  },
  {
    path: config.routes.profile,
    component: Profile,
    layout: AdminLayout
  },
  {
    path: config.routes.productAttribute,
    component: ProductAttribute,
    layout: AdminLayout
  },
  {
    path: config.routes.categories,
    component: ProductCategories,
    layout: AdminLayout
  }
]

export { adminRoutes }