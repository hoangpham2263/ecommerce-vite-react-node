import { Link } from 'react-router-dom'

const SidebarItem = ({ title, rank, icon, toLink }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <Link to={toLink} className={`accordion-button collapsed hide-icon-sidebar1 text-decoration-none fw-normal ${rank}`} data-bs-target={`#${rank}`} aria-expanded="false" aria-controls={rank}>
          <div className="accordion-button-content">
            {icon}
            <span className="accordion-title">{title}</span>
          </div>
        </Link>
      </h2>
      <div
        id={rank}
        className={`accordion-collapse collapse ${rank}`}
        data-bs-parent="#outerAccordion">
      </div>
    </div>
  )
}

export default SidebarItem
