import { useEffect, useState } from 'react'
import { updateRole } from '../../services/adminApi'
import { toast } from 'react-toastify'

const ModalEdit = ({ item, index }) => {
  const [data, setData] = useState({
    id: '',
    key_role: '',
    name: ''
  })

  const setDataDefault = (item) => {
    if (item) {
      setData({
        id: item.id,
        key_role: item.key_role,
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
    const res = await updateRole(data)
    if (res?.data?.code === 0) {
      toast.success('update user succuss')
      setTimeout(() => { location.reload() }, 1000)
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-warning me-2" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasRight-edit-${index}`} aria-controls="offcanvasRight-edit">Edit</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id={`offcanvasRight-edit-${index}`} aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Edit Account</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>

        <div className="offcanvas-body mb-6">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-6">
              <label htmlFor="key_role" className="form-label">Key Position</label>
              <input
                type="text"
                className="form-control"
                id="key_role"
                name="key_role"
                value={data?.key_role}
                onChange={handleOnChange}
                required
                disabled
              />
            </div>

            <div className="col-md-6">
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
            <div className="col-12">
              <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save Edit</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalEdit
