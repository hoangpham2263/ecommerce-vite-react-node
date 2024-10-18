import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
const cx = classNames.bind(styles)

import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { IoColorPaletteOutline } from 'react-icons/io5'


const Sidebar = () => {
  return (
    <div className={cx('sidebar')}>
      <div className="accordion accordion-flush" id="outerAccordion">

        <div className="sidebar-label ms-3 mt-0 pt-3">Admin</div>
        <SidebarItem
          title='Home'
          rank={1}
          icon={<MdOutlineDashboardCustomize className="accordion-icon" />}
          items={[{ title: 'Read' }, { title: 'Create' }, { title: 'Dele' }]}
        />
        <SidebarItem
          title='Profile'
          rank={2}
          icon={<CgProfile className="accordion-icon" />}
          items={[{ title: 'Read' }, { title: 'Create' }, { title: 'Dele' }]}
        />
        <SidebarItem
          title='Account'
          rank={3}
          icon={<MdOutlineManageAccounts className="accordion-icon" />}
          items={[{ title: 'Read' }, { title: 'Create' }, { title: 'Dele' }]}
        />

        <div className="sidebar-label ms-3">Product</div>
        <SidebarItem
          title='Product'
          rank={10}
          icon={<MdOutlineProductionQuantityLimits className="accordion-icon" />}
          items={[{ title: 'Read' }, { title: 'Create' }, { title: 'Dele' }]}
        />
        <SidebarItem
          title='Color'
          rank={11}
          icon={<IoColorPaletteOutline className="accordion-icon" />}
          items={[{ title: 'Read' }, { title: 'Create' }, { title: 'Dele' }]}
        />
      </div>
    </div>
  )
}

export default Sidebar
