import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateCategory } from '../../../services/adminApi'

const ModalEdit = ({ item, index, fetchCategoryData }) => {
  const [data, setData] = useState({
    id: '',
    name: ''
  })

  const setDataDefault = (item) => {
    if (item) {
      setData({
        id: item.id,
        name: item.name || ''
      })
    }
  }

  useEffect(() => {
    setDataDefault(item)
  }, [item])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateCategory(data)
    if (res?.data?.code === 0) {
      // close modal
      const offcanvasElement = document.getElementById(`offcanvasCategory-edit-${index}`);
      offcanvasElement.classList.remove('show');
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = ''; // Khôi phục padding

      // del backdrop
      const backdropElement = document.querySelector('.offcanvas-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
      toast.success(res?.data?.message)
      fetchCategoryData()
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-warning me-2" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasCategory-edit-${index}`} aria-controls="offcanvasCategory-edit">Edit</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id={`offcanvasCategory-edit-${index}`} aria-labelledby="offcanvasRightLabelCategory">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelCategory">Edit Category</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>

        <div className="offcanvas-body mb-6">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-6 text-start">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={data?.name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="col-12 text-start">
              <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save Edit</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalEdit
