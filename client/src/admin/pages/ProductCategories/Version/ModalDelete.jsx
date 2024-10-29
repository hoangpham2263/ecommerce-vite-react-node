import classNames from 'classnames/bind'
import styles from '../ProductCategories.module.scss'
import '../ProductCategories.css'
import { IoIosWarning } from 'react-icons/io'
import { deleteVersion } from '../../../services/privateApi'
import { toast } from 'react-toastify'
import { useRef } from 'react'

const cx = classNames.bind(styles)

const ModalDelete = ({ id, index, selectedBrandId, fetchVersionData }) => {
  const closeButtonRef = useRef(null)

  const handleConfirm = async (e) => {
    e.preventDefault()
    let res = await deleteVersion(id)

    if (res?.data?.code === 0) {
      toast.success(res?.data?.message)
      fetchVersionData(selectedBrandId)

      if (closeButtonRef.current) closeButtonRef.current.click()
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <span>
      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#staticBackdropVersion-${index}`}>Delete</button>
      <div className="modal fade" id={`staticBackdropVersion-${index}`} data-bs-keyboard="true" tabIndex={-1} aria-labelledby="staticBackdropLabelVersion" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabelVersion">Are you sure you want to delete?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeButtonRef} />
            </div>
            <div className="modal-body d-flex justify-content-center">
              <IoIosWarning className={cx('icon-warning')} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </span>
  )
}

export default ModalDelete
