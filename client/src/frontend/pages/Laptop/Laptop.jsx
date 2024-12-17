import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Laptop.module.scss'
import SliderDefaultLayout from '../components/SliderDefaultLayout'
import ProductItem from '../components/ProductItem'
import { readProduct, readVersion } from '../../services/publicApi'
import { toast } from 'react-toastify'
import ReactPaginateBlock from '../components/ReactPaginateBlock'

const cx = classNames.bind(styles)

const Laptop = () => {
  const [products, setProducts] = useState(null)
  const [selectVersion, setSelectVersion] = useState('Tất cả')
  const [sort, setSort] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(products?.limit || 12)
  const [brand, setBrand] = useState([])
  const [version, setVersion] = useState(null)

  // ---------- call api ----------
  const fetchVersion = async () => {
    try {
      let data = { brand_id: 1 }
      const res = await readVersion(data)
      const versions = res?.data?.data || []

      const allVersion = [{ key: 'Tất cả', value: '' }, ...versions.map(item => ({ key: `Laptop ${item.name}`, value: item.id }))]
      setBrand(allVersion)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(() => { fetchVersion() }, [])

  const fetchData = async () => {
    try {
      let data = { page: currentPage, limit: currentLimit, category_id: 1, brand_id: 1, version_id: version || '' }
      const res = await readProduct(data)
      setProducts(res?.data?.data?.product)
      setTotalPages(res?.data?.data?.totalPages)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(() => { fetchData() }, [currentPage, currentLimit, version])

  // handle click item category
  const handleClickItemCategory = (key, value) => {
    setSelectVersion(key)
    setVersion(value)
    setCurrentPage(1)
  }

  const handleCategorySelect = async (e) => {
    if (e.target.value !== false) {
      setSort(e.target.value)
    }
  }

  // ---------- navigation ----------
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  }

  // Reset currentLimit when products change
  useEffect(() => {
    setCurrentLimit(products?.limit || 12)
  }, [currentPage, products])

  return (
    <div className='container'>
      <>
        <h1 className={cx('title')}>IPhone</h1>
        <SliderDefaultLayout
          images={['https://shopdunk.com/images/uploaded/banner/banner_thang12/gen10dm.png', 'https://shopdunk.com/images/uploaded/banner/banner_thang12/airdm.png', 'https://shopdunk.com/images/uploaded/banner/banner_thang12/g9dm.png']}
        />
      </>
      <div className={cx('mt-4', 'all-category')}>
        <div className={cx('category-left')}>
          <div className={cx('category')}>
            {brand && brand.map((item, index) => (
              <div
                key={index}
                className={cx('category-item', `${item?.key === selectVersion ? 'active' : ''}`)}
                onClick={() => handleClickItemCategory(item?.key, item?.value)}
              >
                {item?.key}
              </div>
            ))}
          </div>
        </div>
        <div className={cx('category-right')}>
          <select onChange={handleCategorySelect}>
            <option value={false}>Thứ tự hiển thị</option>
            <option value={'title'}>Tên: A đến Z</option>
            <option value={'-title'}>Tên: Z đến A</option>
            <option value={'price'}>Giá thấp đến cao</option>
            <option value={'-price'}>Giá cao đến thấp</option>
          </select>
        </div>
      </div>
      <div className={cx('w-100 mt-3')}>
        <ProductItem
          products={products}
          stt={3}
        />
      </div>
      <div className='mb-5'>
        {(totalPages > 0) && <ReactPaginateBlock handlePageClick={handlePageClick} totalPages={totalPages} />}
      </div>
    </div>
  )
}

export default Laptop
