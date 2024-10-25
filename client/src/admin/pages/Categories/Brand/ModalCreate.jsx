import { useState } from 'react'
import { toast } from 'react-toastify'
import { createBrand } from '../../../services/adminApi.jsx'

const ModalCreate = ({ categoryId,fetchBrandData }) => {
  const [data, setData] = useState({
    name: ''
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let newData = { ...data, category_id: categoryId }
    let res = await createBrand(newData)
    if (res?.data?.code === 0) {
      // close modal
      const offcanvasElement = document.getElementById('offcanvasBrand')
      offcanvasElement.classList.remove('show')
      document.body.classList.remove('modal-open')
      document.body.style.paddingRight = ''
      // del backdrop
      const backdropElement = document.querySelector('.offcanvas-backdrop')
      if (backdropElement) {backdropElement.remove()}
      toast.success(res?.data?.message)
      fetchBrandData(categoryId)
    } else {
      toast.error(res?.data?.message)
    }
  }


  return (
    <span>
      <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBrand" aria-controls="offcanvasBrand">+ Add Brand</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasBrand" aria-labelledby="offcanvasRightLabelBrand">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelBrand">Create Brand</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' required onChange={handleOnChange} />
            </div>
            <div className="col-12">
              <button className="btn btn-secondary" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalCreate
