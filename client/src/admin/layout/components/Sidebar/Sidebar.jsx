import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import './Sidebar.css'
const cx = classNames.bind(styles)

const Sidebar = () => {
  return (
    <div className={cx('sidebar')}>
      <div className="accordion accordion-flush" id="sidebar">

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed gl-gb-cl-admin" type="button" data-bs-toggle="collapse" data-bs-target="#one" aria-expanded="false" aria-controls="one">
              Home
            </button>
          </h2>
          <div id="one" className="accordion-collapse collapse gl-gb-cl-admin" data-bs-parent="#sidebar">
            <div className="accordion-body">Placeholder</div>
            {/* Bắt đầu cấp con */}
            <div className="accordion accordion-flush" id="oneAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed gl-gb-cl-admin" type="button" data-bs-toggle="collapse" data-bs-target="#one-one" aria-expanded="false" aria-controls="one-one">
                    one Accordion Item #1
                  </button>
                </h2>
                <div id="one-one" className="accordion-collapse collapse" data-bs-parent="#oneAccordion">
                  <div className="accordion-body gl-gb-cl-admin">one Placeholder #1</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed gl-gb-cl-admin" type="button" data-bs-toggle="collapse" data-bs-target="#one-two" aria-expanded="false" aria-controls="one-two">
                    one Accordion Item #2
                  </button>
                </h2>
                <div id="one-two" className="accordion-collapse collapse" data-bs-parent="#oneAccordion">
                  <div className="accordion-body gl-gb-cl-admin">one Placeholder #2</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed gl-gb-cl-admin" type="button" data-bs-toggle="collapse" data-bs-target="#one-three" aria-expanded="false" aria-controls="one-three">
                    one Accordion Item #3
                  </button>
                </h2>
                <div id="one-three" className="accordion-collapse collapse" data-bs-parent="#oneAccordion">
                  <div className="accordion-body gl-gb-cl-admin">one Placeholder #2</div>
                </div>
              </div>
            </div>
            {/* Kết thúc cấp con */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
