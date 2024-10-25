import classNames from 'classnames/bind'
import styles from '../Categories.module.scss'
import '../Categories.css'
import { IoIosWarning } from 'react-icons/io'
import { deleteCategory } from '../../../services/adminApi'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const ModalDelete = ({ id, index, fetchCategoryData }) => {
  const handleConfirm = async (e) => {
    e.preventDefault()
    let res = await deleteCategory(id)
    if (res?.data?.code === 0) {
      // close modal
      const modalElement = document.getElementById(`staticBackdropCategory-${index}`)
      modalElement.classList.remove('show')
      document.body.classList.remove('modal-open')
      document.body.style.paddingRight = ''
      // Xóa backdrop
      const backdropElement = document.querySelector('.modal-backdrop')
      if (backdropElement) { backdropElement.remove() }

      toast.success(res?.data?.message)
      fetchCategoryData()
    } else {
      toast.error(res?.data?.message)
    }
  }
  return (
    <span>
      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#staticBackdropCategory-${index}`}>Delete</button>
      <div className="modal fade" id={`staticBackdropCategory-${index}`} data-bs-keyboard="true" tabIndex={-1} aria-labelledby="staticBackdropLabelCategory" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabelCategory">Are you sure you want to delete?</h1>
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
