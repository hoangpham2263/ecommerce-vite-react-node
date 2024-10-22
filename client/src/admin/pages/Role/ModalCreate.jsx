import { useState } from 'react'
import { toast } from 'react-toastify'
import { createRole } from '../../services/adminApi.jsx'

const ModalCreate = () => {
  const [data, setData] = useState({
    key_role: '',
    name: ''
  })
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => { return { ...prev, [name]: value } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await createRole(data)
    if (res?.data?.code === 0) {
      toast.success(res?.data?.message)
      setTimeout(() => { location.reload() }, 1000)
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Add Role</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Create Account</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-6">
              <label htmlFor="key_role" className="form-label">Key Role</label>
              <input type="text" className="form-control" id="key_role" name='key_role' required onChange={handleOnChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' required onChange={handleOnChange} />
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
