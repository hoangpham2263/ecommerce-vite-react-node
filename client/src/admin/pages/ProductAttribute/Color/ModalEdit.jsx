import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { updateColor } from '../../../services/adminApi'

const ModalEdit = ({ item, index, fetchDataColor }) => {
  const [data, setData] = useState({
    id: '',
    name: '',
    color_code: ''
  })

  const closeButtonRef = useRef(null)

  const setDataDefault = (item) => {
    if (item) {
      setData({
        id: item.id,
        name: item.name || '',
        color_code: item.color_code || '',
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
    const res = await updateColor(data)
    if (res?.data?.code === 0) {
      toast.success(res?.data?.message)
      fetchDataColor()
      if (closeButtonRef.current) closeButtonRef.current.click()
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-warning me-2" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasRight-edit-${index}`} aria-controls="offcanvasRight-edit">Edit</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id={`offcanvasRight-edit-${index}`} aria-labelledby="offcanvasRightLabelColor">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelColor">Edit Color</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={closeButtonRef} />
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

            <div className="col-md-6 text-start">
              <label htmlFor="color_code" className="form-label">Color Code</label>
              <input
                type="text"
                className="form-control"
                id="color_code"
                name="color_code"
                value={data?.color_code}
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
