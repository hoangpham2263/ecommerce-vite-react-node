import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
const cx = classNames.bind(styles)

import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

const Sidebar = () => {
  return (
    <div className={cx('sidebar')}>
      <div className="sidebar-label ms-3">Account</div>
      <SidebarItem
        title='Home'
        rank={1}
        icon={<MdOutlineDashboardCustomize className="accordion-icon" />}
      />
      <SidebarItem
        title='Profile'
        rank={2}
        icon={<CgProfile className="accordion-icon" />}
      />

      <div className="sidebar-label ms-3">Product</div>
      <SidebarItem
        title='Product'
        rank={3}
        icon={<CgProfile className="accordion-icon" />}
      />
      <SidebarItem
        title='Profile'
        rank={4}
        icon={<CgProfile className="accordion-icon" />}
      />
    </div>
  )
}

export default Sidebar
