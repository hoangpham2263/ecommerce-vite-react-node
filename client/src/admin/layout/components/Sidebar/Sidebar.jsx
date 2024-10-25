import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
import SidebarItemMultiple from './SidebarItemMultiple'
const cx = classNames.bind(styles)
import config from '../../../config'

import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { FaCogs } from 'react-icons/fa'
import { VscUngroupByRefType } from 'react-icons/vsc'
import { FiFilter } from 'react-icons/fi'

const Sidebar = () => {
  return (
    <div className={cx('sidebar')}>
      <div className="accordion accordion-flush" id="outerAccordion">

        {/* 1. Dashboard */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Dashboard</div>
        <SidebarItem
          title='Overview'
          toLink={config.routes.dashboard}
          rank={1}
          icon={<MdOutlineDashboardCustomize className="accordion-icon" />}
          items={[{ title: 'Read' }, { title: 'Create' }, { title: 'Dele' }]}
        /> */}

        {/* 2. Orders */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Orders</div> */}

        {/* 3. Products */}
        <div className="sidebar-label ms-3 mt-0 pt-3">Products</div>
        {/* <SidebarItem
          title='Product'
          toLink={config.routes.product}
          rank={31}
          icon={<MdOutlineProductionQuantityLimits className="accordion-icon" />}
        /> */}
        <SidebarItem
          title='Product Attributes'
          toLink={config.routes.productAttribute}
          rank={32}
          icon={<FaCogs className="accordion-icon" />}
        />
        <SidebarItem
          title='Product Categories'
          toLink={config.routes.categories}
          rank={32}
          icon={<FiFilter className="accordion-icon" />}
        />

        {/* 4. Customers */}
        <div className="sidebar-label ms-3 mt-0 pt-3">Customers</div>
        <SidebarItem
          title='Account'
          toLink={config.routes.account}
          rank={41}
          icon={<MdOutlineManageAccounts className="accordion-icon" />}
        />

        {/* 5. Marketing */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Marketing</div> */}
        {/* 6. Shipping */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Shipping</div> */}
        {/* 7. Payments */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Payments</div> */}
        {/* 8. Reports */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Reports</div> */}

        {/* 9. User Management */}
        <div className="sidebar-label ms-3 mt-0 pt-3">User Management</div>
        {/* <SidebarItem
          title='Profile'
          toLink={config.routes.profile}
          rank={91}
          icon={<CgProfile className="accordion-icon" />}
        /> */}
        <SidebarItemMultiple
          title='Permission'
          rank={92}
          icon={<VscUngroupByRefType className="accordion-icon" />}
          items={[{ title: 'Position Role', toLink: config?.routes?.positionRole }, { title: 'Position', toLink: config?.routes?.position }, { title: 'Role', toLink: config?.routes?.role }]}
        />

        {/* 10. Settings */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Settings</div> */}
        {/* 11. Support */}
        {/* <div className="sidebar-label ms-3 mt-0 pt-3">Support</div> */}

      </div>
    </div>
  )
}

export default Sidebar
