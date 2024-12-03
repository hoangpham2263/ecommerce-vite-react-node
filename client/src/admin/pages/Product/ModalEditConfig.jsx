import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { readColor, readColorDetail, updateConfig } from '../../services/privateApi'
import { ImageToBase64 } from '../../../main/utility/ImageToBase64'

const ModalEditConfig = ({ item, fetchDataProductData, fetchConfig }) => {
  const [data, setData] = useState({
    price: '',
    color_id: '',
    discount: '',
    stock: '',
    is_active: true,
    images: [],
    product_id: item?.product_id,
    buttonColor: '#000'
  })
  const [colors, setColors] = useState([])
  const closeButtonRef = useRef(null)
  const handleGetDataAttribute = useCallback(async () => {
    try {
      const data = { page: 1, limit: 100 };
      const [fetchColor] = await Promise.all([
        readColor(data)
      ])
      setColors(fetchColor?.data?.data?.color || [])
    } catch {
      toast.error('Failed to fetch product attributes')
    }
  }, [])
  useEffect(() => {
    handleGetDataAttribute()
  }, [handleGetDataAttribute])

  const setDataDefault = useCallback((item) => {
    setData({
      id: item?.id || '',
      price: item?.price || '',
      color_id: item?.color_id || '',
      discount: item?.discount || '',
      stock: item?.stock || '',
      images: item?.images || [],
      is_active: item?.is_active || false,
      product_id: item?.product_id,
      buttonColor: item?.color_code || '#000'
    })
  }, [])

  useEffect(() => {
    setDataDefault(item)
  }, [item, setDataDefault])

  useEffect(() => {
    if (data.color_id) {
      readColorDetail(data.color_id).then((result) => {
        setData((prev) => ({ ...prev, buttonColor: result?.data?.data?.color_code || '#000' }))
      })
    }
  }, [data.color_id, fetchDataProductData, fetchConfig])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'color_id' && { buttonColor: colors.find(c => c.id === value)?.color_code || '#000' })
    }))
  }

  const handleStatusChange = (e) => setData((prev) => ({ ...prev, is_active: e.target.checked }))

  const handleBaseImages = async (e) => {
    const files = Array.from(e.target.files)
    const base64Images = await Promise.all(
      files.map(async (file) => ({
        file_name: file.name,
        url: await ImageToBase64(file)
      }))
    )
    setData((prev) => ({ ...prev, images: base64Images }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateConfig(data)
      if (res?.data?.code === 0) {
        closeButtonRef.current.click()
        toast.success(res?.data?.message)
        fetchDataProductData()
      } else {
        toast.error(res?.data?.message)
      }
    } catch {
      toast.error('An error occurred while updating the product')
    }
  }

  return (
    <span>
      <button
        className="btn btn-primary me-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasConfig-edit-${item?.id}`}
        aria-controls="offcanvasConfig-edit"
        style={{ backgroundColor: `${item?.Color?.color_code}`, borderColor: `${item?.Color?.color_code}`, color: item?.Color?.color_code.toUpperCase() === '#FFFFFF' || item?.Color?.color_code.toUpperCase() === '#FFFF00' ? '#000000' : '' }}
      >
        {item?.Color?.name}
      </button>
      <div
        className="offcanvas offcanvas-end"
        data-bs-keyboard="true"
        data-bs-backdrop="static"
        tabIndex={-1}
        id={`offcanvasConfig-edit-${item?.id}`}
        aria-labelledby="offcanvasRightLabelConfig"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelConfig">Edit Config</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={closeButtonRef} />
        </div>
        <div className="offcanvas-body mb-6">
          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="col-md-4 text-start">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" className="form-control" id="price" name="price" required onChange={handleOnChange} value={data.price} />
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input type="number" className="form-control" name="stock" onChange={handleOnChange} value={data.stock} />
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input type="text" className="form-control" name="discount" onChange={handleOnChange} value={data.discount} />
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor="color_id" className="form-label">Color</label>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle cs-btn-color"
                  type="button"
                  id="colorDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: data.buttonColor }}
                >
                  {data.color_id ? colors.find(c => c.id === data.color_id)?.name : 'Select Color'}
                </button>
                <ul className="dropdown-menu" aria-labelledby="colorDropdown">
                  {colors && colors.map((item, index) => (
                    <li key={`color-${index}`}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          setData({
                            ...data,
                            color_id: item.id,
                            buttonColor: item.color_code
                          })
                          const selectedColor = colors.find(c => c.id === item.id)?.name
                          if (selectedColor) { document.getElementById('colorDropdown').textContent = selectedColor }
                        }}
                      >
                        <div className='cs-color-option' style={{ backgroundColor: item.color_code, display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px' }} />
                        {item?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-8 text-start">
              <label htmlFor="formFileMultiple" className="form-label">Images</label>
              <input className="form-control form-control-sm" type="file" id="formFileMultiple" multiple onChange={handleBaseImages} />
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor={'flexSwitchCheckDefault-status'} className="form-label">Status</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={'flexSwitchCheckDefault-status'}
                  checked={data?.is_active}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor={'flexSwitchCheckDefault-status'}>
                  {data?.is_active ? 'On' : 'Off'}
                </label>
              </div>
            </div>
            {data.images.length > 0 && (
              <div className="col-12 mt-3 text-start">
                <h6>Selected Images:</h6>
                <div className="image-preview-container">
                  {data.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.file_name}
                      style={{ width: '82px', height: '82px', objectFit: 'cover', marginRight: '10px', marginBottom: '10px' }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="col-12 text-start">
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </span >
  )
}

export default ModalEditConfig
