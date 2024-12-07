import classNames from 'classnames/bind'
import styles from './Product.module.scss'
import React, { useEffect, useState } from 'react'
import { readConfig, readImage } from '../../services/privateApi'
import './Product.css'

const cx = classNames.bind(styles)

const ReadConfigTable = ({ index, product }) => {
  const [config, setConfig] = useState([])
  const fetchConfig = async (product) => {
    let data = { page: 1, limit: 10000 }
    const fetchDataImage = await readImage(data)
    data = { product_id: product.id }
    const fetchConfig = await readConfig(data)
    const imageData = fetchDataImage?.data?.data?.image
    const configData = fetchConfig?.data?.data

    const imagesByConfigId = imageData.reduce((acc, image) => {
      if (!acc[image.config_id]) {
        acc[image.config_id] = []
      }
      acc[image.config_id].push(image)
      return acc
    }, {})
    const groupedProducts = configData.map((config) => {
      return {
        ...config,
        images: imagesByConfigId[config.id] || []
      }
    })
    setConfig(groupedProducts)
  }
  useEffect(() => {
    fetchConfig(product)
  }, [product])

  return (
    <React.Fragment>
      {config.length > 0 && (
        <tr className={cx('cs-config-border')}>
          <td colSpan="9" className='p-0'>
            <div className="collapse" id={`collapseExample-${index}`} colSpan="9">
              <div key={index} className={cx('card', 'card-body', 'cs-config-body')}>
                <table className="table table-striped mb-0 hover">
                  <thead>
                    <tr>
                      <th scope="col" className='fw-medium'>Config</th>
                      <th scope="col" className='fw-medium'>Price</th>
                      <th scope="col" className='fw-medium'>Stock</th>
                      <th scope="col" className='fw-medium'>Discount</th>
                      <th scope="col" className='fw-medium'>Color</th>
                      <th scope="col" className='fw-medium'>Status</th>
                      <th scope="col" className='fw-medium'>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.price}</td>
                          <td>{item?.stock}</td>
                          <td>{item?.discount}</td>
                          <td>{item?.Color?.name}</td>
                          <td>{item?.status}</td>
                          <td>
                            <div className={cx('d-flex')}>
                              {item?.images.map((image, index) => {
                                return (
                                  <img key={index} className={cx('cs-config-img', 'me-2')} src={image?.url} alt="" />
                                )
                              })}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  )
}

export default ReadConfigTable
