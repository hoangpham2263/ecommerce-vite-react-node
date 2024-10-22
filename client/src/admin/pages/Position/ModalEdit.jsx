import { useEffect, useState } from 'react'
import { updatePosition } from '../../services/adminApi'
import { toast } from 'react-toastify'

const ModalEdit = ({ item, index }) => {
  const [data, setData] = useState({
    id: '',
    key_position: '',
    name: '',
    desc: '',
    is_active: false,
    is_master: false
  })

  const setDataDefault = (item) => {
    if (item) {
      setData({
        id: item.id,
        key_position: item.key_position,
        name: item.name || '',
        desc: item.desc || '',
        is_active: item.is_active || false,
        is_master: item.is_master || false
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

  const handleIsMasterChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_master: checked }))
  }

  const handleStatusChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_active: checked }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updatePosition(data)
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
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Edit Position</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>

        <div className="offcanvas-body mb-6">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-6">
              <label htmlFor="key_position" className="form-label">Key Position</label>
              <input
                type="text"
                className="form-control"
                id="key_position"
                name="key_position"
                value={data?.key_position}
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

            <div className="col-md-12">
              <label htmlFor="desc" className="form-label">Desc</label>
              <input
                type="text"
                className="form-control"
                id="desc"
                name="desc"
                value={data?.desc}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor={`flexSwitchCheckDefault${index}-status`} className="form-label">Status</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckDefault${index}-status`}
                  checked={data?.is_active}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-status`}>
                  {data?.is_active ? 'On' : 'Off'}
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor={`flexSwitchCheckDefaultEdit${index}-verify`} className="form-label">Master</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckDefaultEdit${index}-verify`}
                  checked={data?.is_master}
                  onChange={handleIsMasterChange}
                />
                <label className="form-check-label" htmlFor={`flexSwitchCheckDefaultEdit${index}-verify`}>
                  {data?.is_master ? 'On' : 'Off'}
                </label>
              </div>
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
