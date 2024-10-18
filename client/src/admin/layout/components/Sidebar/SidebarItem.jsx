const SidebarItem = ({ title, rank, icon }) => {
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
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className={`accordion-button collapsed ${rank}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${rank}-one`} aria-expanded="false" aria-controls={`${rank}-one`}>
                  {rank} Accordion Item #1
                </button>
              </h2>
              <div id={`${rank}-one`} className={'accordion-collapse collapse ms-2'} data-bs-parent={`#${rank}Accordion`}>
                <div className={`accordion-body ${rank}`}>{rank} Placeholder #1</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className={`accordion-button collapsed ${rank}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${rank}-two`} aria-expanded="false" aria-controls={`${rank}-two`}>
                  {rank} Accordion Item #2
                </button>
              </h2>
              <div id={`${rank}-two`} className={'accordion-collapse collapse ms-2'} data-bs-parent={`#${rank}Accordion`}>
                <div className={`accordion-body ${rank}`}>{rank} Placeholder #2</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className={`accordion-button collapsed ${rank}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${rank}-three`} aria-expanded="false" aria-controls={`${rank}-three`}>
                  {rank} Accordion Item #3
                </button>
              </h2>
              <div id={`${rank}-three`} className={'accordion-collapse collapse ms-2'} data-bs-parent={`#${rank}Accordion`}>
                <div className={`accordion-body ${rank}`}>{rank} Placeholder #3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarItem
