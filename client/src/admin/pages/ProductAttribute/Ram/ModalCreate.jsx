import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createRam } from '../../../services/adminApi.jsx'

const ModalCreate = ({ fetchDataRam }) => {
  const [data, setData] = useState({
    name: ''
  })

  const closeButtonRef = useRef(null)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await createRam(data)
    if (res?.data?.code === 0) {
      setData({ name: '' })
      toast.success(res?.data?.message)
      fetchDataRam()
      if (closeButtonRef.current) closeButtonRef.current.click()
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRam" aria-controls="offcanvasRam">+ Add Ram</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasRam" aria-labelledby="offcanvasRightLabelRam">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelRam">Create Ram</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={closeButtonRef} />
        </div>
        <div className="offcanvas-body">
          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' value={data?.name} required onChange={handleOnChange} />
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
