import { adminRoutes } from '../../admin/routes/routes'
import { frontendRoutes } from '../../frontend/routes/routes'

const arrayRoutes = adminRoutes.concat(frontendRoutes)

export { arrayRoutes }