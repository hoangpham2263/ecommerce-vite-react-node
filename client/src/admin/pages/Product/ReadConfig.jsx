import { useEffect, useState } from 'react'
import { readConfig, readImage } from '../../services/privateApi'
import ModalEditConfig from './ModalEditConfig'


const ReadConfig = ({ product, fetchDataProductData }) => {
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
    <span>
      {Array.isArray(config) && config.map((item, index) => {
        return (
          <ModalEditConfig key={`config-${index}`} item={item} fetchDataProductData={fetchDataProductData} fetchConfig={fetchConfig} />
        )
      })}
    </span>
  )
}

export default ReadConfig
