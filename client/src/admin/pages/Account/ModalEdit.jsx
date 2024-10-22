import { useEffect, useState } from 'react'
import { readAddress, updateUser } from '../../services/adminApi'
import { toast } from 'react-toastify'
import { ImageToBase64 } from '../../../main/utility/ImageToBase64'
import { RxAvatar } from 'react-icons/rx'

const ModalEdit = ({ item, index }) => {
  const [addressByUser, setAddressByUser] = useState()
  const [data, setData] = useState({
    id: '',
    avatar: '',
    fullName: '',
    username: '',
    email: '',
    position: '',
    gender: '',
    is_verified: false,
    is_active: false
  })

  const setDataDefault = (item) => {
    if (item) {
      setData({
        id: item.id,
        avatar: item.avatar,
        fullName: item.full_name || '',
        username: item.username || '',
        email: item.email || '',
        position: item.Position?.key_position || 'customer',
        gender: item.gender || 'none',
        is_verified: item.is_verified || false,
        is_active: item.is_active || false
      })
    }
  }

  const handleAddressByUser = async (item) => {
    const res = await readAddress(item?.id)
    if (res?.data?.code === 0) {
      setAddressByUser(res?.data?.data)
    } else {
      toast.error(res?.data?.message)
    }
  }

  useEffect(() => {
    setDataDefault(item)
    handleAddressByUser(item)
  }, [item])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVerifyChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_verified: checked }))
  }

  const handleStatusChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleBaseImage = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const base64 = await ImageToBase64(file)
      setData((prev) => ({ ...prev, avatar: base64 }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateUser(data)
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
            <div className="col-md-4">
              {data?.avatar ? <img src={data?.avatar} className="img-thumbnail" alt="..." /> : <RxAvatar className='w-75 h-75' />}
            </div>
            <div className="col-md-8">
              <label htmlFor="formFile" className="form-label">Change avatar</label>
              <input className="form-control" type="file" id="formFile" onChange={handleBaseImage} />
            </div>

            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={data?.fullName}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={data?.username}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={data?.email}
                onChange={handleOnChange}
                required
                disabled
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="position" className="form-label">Position</label>
              <select
                className="form-select"
                id="position"
                name="position"
                value={data?.position}
                onChange={handleOnChange}
              >
                <option value="1">Admin</option>
                <option value="2">Staff</option>
                <option value="3">Customer</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={data?.gender}
                onChange={handleOnChange}
              >
                <option value="none">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor={`flexSwitchCheckDefaultEdit${index}-verify`} className="form-label">Verify</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckDefaultEdit${index}-verify`}
                  checked={data?.is_verified}
                  onChange={handleVerifyChange}
                />
                <label className="form-check-label" htmlFor={`flexSwitchCheckDefaultEdit${index}-verify`}>
                  {data?.is_verified ? 'On' : 'Off'}
                </label>
              </div>
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
            <div className="col-md-12">
              <label className="form-label">Address</label>
              {addressByUser && addressByUser.map((item, index) => (
                <div key={index} className="mb-3">
                  <span className="input-group-text">
                    <strong>Addr #{index + 1}:</strong>
                    <span className="address-content">
                      {item.name} - {item.house_address} - {item.ward} - {item.district} - {item.city}
                    </span>
                    <div>
                      <strong>Số điện thoại:</strong> {item.phone_number}
                    </div>
                    <div>
                      <strong>Trạng thái:</strong> {item.default ? 'Mặc định' : 'Không mặc định'}
                    </div>
                  </span>
                </div>
              ))}
              {/* <button type="button" className="btn btn-outline-secondary" id="save-address">Save</button> */}
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
