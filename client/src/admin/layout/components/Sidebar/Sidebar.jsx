import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
const cx = classNames.bind(styles)
import config from '../../../config'

import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { VscUngroupByRefType } from 'react-icons/vsc'
import { MdLinearScale, MdBlurLinear } from 'react-icons/md'

const Sidebar = () => {
  return (
    <div className={cx('sidebar')}>
      <div className="accordion accordion-flush" id="outerAccordion">

        <div className="sidebar-label ms-3 mt-0 pt-3">Dashboard</div>
        <SidebarItem
          title='Overview'
          toLink={config.routes.dashboard}
          rank={1}
          icon={<MdOutlineDashboardCustomize className="accordion-icon" />}
          items={[{ title: 'Read' }, { title: 'Create' }, { title: 'Dele' }]}
        />

        <div className="sidebar-label ms-3 mt-0 pt-3">Account</div>
        <SidebarItem
          title='Profile'
          toLink={config.routes.profile}
          rank={11}
          icon={<CgProfile className="accordion-icon" />}
        />
        <SidebarItem
          title='Account'
          toLink={config.routes.account}
          rank={12}
          icon={<MdOutlineManageAccounts className="accordion-icon" />}
        />
        <SidebarItem
          title='Position'
          toLink={config.routes.position}
          rank={12}
          icon={<VscUngroupByRefType className="accordion-icon" />}
        />
        <SidebarItem
          title='Role'
          toLink={config.routes.role}
          rank={12}
          icon={<MdLinearScale className="accordion-icon" />}
        />
        <SidebarItem
          title='Position Role'
          toLink={config.routes.positionRole}
          rank={12}
          icon={<MdBlurLinear className="accordion-icon" />}
        />

        <div className="sidebar-label ms-3">Product</div>
        <SidebarItem
          title='Product'
          toLink={config.routes.product}
          rank={21}
          icon={<MdOutlineProductionQuantityLimits className="accordion-icon" />}
        />
        <SidebarItem
          title='Color'
          toLink={config.routes.color}
          rank={22}
          icon={<IoColorPaletteOutline className="accordion-icon" />}
        />
      </div>
    </div>
  )
}

export default Sidebar
