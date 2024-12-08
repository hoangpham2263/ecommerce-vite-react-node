import './Product.css'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createConfig, readColor } from '../../services/privateApi.jsx'
import { ImageToBase64 } from '../../../main/utility/ImageToBase64.jsx'

const ModalCreateConfig = ({ fetchProductData, product }) => {
  const [data, setData] = useState({
    price: '',
    stock: '',
    discount: '',
    color_id: '',
    images: [],
    is_active: true,
    product_id: product.id,
    buttonColor: '#999'
  })

  const [colors, setColors] = useState()

  const closeButtonRef = useRef(null)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleGetDataAttribute = async () => {
    const data = { page: 1, limit: 100 }
    const fetchColor = await readColor(data)
    setColors(fetchColor?.data?.data?.color)
  }

  useEffect(() => {
    handleGetDataAttribute()
  }, [])

  const handleBaseImages = async (e) => {
    const files = Array.from(e.target.files)

    const base64Images = await Promise.all(
      files.map(async (file) => {
        const base64 = await ImageToBase64(file)
        return {
          file_name: file.name,
          url: base64
        }
      })
    )
    setData((prev) => ({ ...prev, images: base64Images }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createConfig(data)
      setData({ price: '', stock: '', discount: '', color_id: '', is_active: true, images: [], buttonColor: '#000', product_id: product?.id })
      closeButtonRef.current.click()
      toast.success(res?.data?.message)
      fetchProductData()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-link" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasConfig-${product?.id}`} aria-controls={`offcanvasConfig-${product?.id}`}>+ Add Config</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id={`offcanvasConfig-${product?.id}`} aria-labelledby={`offcanvasRightLabelConfig-${product?.id}`}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`offcanvasRightLabelConfig-${product?.id}`}>Create Config</h5>
          <button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-4">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" value={data?.price} className="form-control" id="price" name='price' required onChange={handleOnChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input type="text" value={data?.stock} className="form-control" id="stock" name='stock' required onChange={handleOnChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input type="text" value={data?.discount} className="form-control" id="discount" name='discount' required onChange={handleOnChange} />
            </div>
            <div className="col-md-4">
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
            <div className="col-md-8">
              <label htmlFor="formFileMultiple" className="form-label">Images</label>
              <input className="form-control form-control-sm" type="file" id="formFileMultiple" multiple onChange={handleBaseImages} />
            </div>
            <div className="col-md-4">
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
              <div className="col-12 mt-3">
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
            <div className="col-12">
              <button onClick={handleSubmit} className="btn btn-secondary" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalCreateConfig
