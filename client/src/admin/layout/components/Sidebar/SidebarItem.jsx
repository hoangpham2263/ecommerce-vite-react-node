import { Link } from 'react-router-dom'

const SidebarItem = ({ title, rank, icon, items }) => {
  return (
    <div className="accordion accordion-flush" id="outerAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className={`accordion-button collapsed ${rank}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${rank}`} aria-expanded="false" aria-controls={rank}>
            <div className="accordion-button-content">
              {icon}
              <span className="accordion-title">{title}</span>
            </div>
          </button>
        </h2>
        <div
          id={rank}
          className={`accordion-collapse collapse ${rank}`}
          data-bs-parent="#outerAccordion">
          <div className="accordion accordion-flush" id={`${rank}Accordion`}>
            {
              items && items.map((item, index) => {
                return (
                  <div key={index} className="accordion-item">
                    <h2 className="accordion-header">
                      <button className={`accordion-button collapsed fw-normal ${rank}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${rank}-${index}`} aria-expanded="false" aria-controls={`${rank}-${index}`}>
                        {item?.title}
                      </button>
                    </h2>
                    <div id={`${rank}-${index}`} className={'accordion-collapse collapse ms-3'} data-bs-parent={`#${rank}Accordion`}>
                      <div className={`accordion-body ${rank}`}>{rank} Placeholder #1</div>
                    </div>
                  </div>
                  // <div key={index} className="accordion-item">
                  //   <h2 className="accordion-header">
                  //     <Link className={`accordion-button collapsed text-decoration-none fw-normal ${rank}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${rank}-${index}`} aria-expanded="false" aria-controls={`${rank}-${index}`}>
                  //       {item?.title}
                  //     </Link>
                  //   </h2>
                  // </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarItem
