import classNames from 'classnames/bind'
import styles from './PositionRole.module.scss'
import './PositionRole.css'
import { IoIosWarning } from 'react-icons/io'
import { deletePosition } from '../../services/adminApi'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const ModalDelete = ({ id, index }) => {
  const handleConfirm = async (e) => {
    e.preventDefault()
    let res = await deletePosition(id)
    if (res?.data?.code === 0) {
      toast.success(res?.data?.message)
      setTimeout(() => { location.reload() }, 1000)
    } else {
      toast.error(res?.data?.message)
    }
  }
  return (
    <span>
      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${index}`}>Delete</button>
      <div className="modal fade" id={`staticBackdrop-${index}`} data-bs-keyboard="true" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to delete?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
