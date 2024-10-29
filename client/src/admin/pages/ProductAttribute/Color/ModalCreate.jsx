import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createColor } from '../../../services/privateApi.jsx'

const ModalCreate = ({ fetchDataColor }) => {
  const [data, setData] = useState({
    name: '',
    color_code: ''
  })
  const closeButtonRef = useRef(null)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await createColor(data)
    if (res?.data?.code === 0) {
      setData({
        name: '',
        color_code: ''
      })
      toast.success(res?.data?.message)
      fetchDataColor()
      closeButtonRef.current.click()
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Add Color</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabelColor">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelColor">Create Color</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={closeButtonRef} />
        </div>
        <div className="offcanvas-body">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' value={data?.name} required onChange={handleOnChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="colorCode" className="form-label">Color Code</label>
              <input type="text" className="form-control" id="colorCode" name='color_code' value={data?.color_code} required onChange={handleOnChange} />
            </div>
            <div className="col-12">
              <button onClick={handleSubmit} className="btn btn-secondary" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalCreate
