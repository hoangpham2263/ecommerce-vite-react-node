import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './DienThoai.module.scss'
import SliderDefaultLayout from '../components/SliderDefaultLayout'
import ProductItem from '../components/ProductItem'

const cx = classNames.bind(styles)
const DienThoai = () => {

  // Pagination
  const allVersion = [{ key: 'Tất cả', value: '' }, { key: 'IPhone 11', value: 11 }, { key: 'IPhone 12', value: 12 }, { key: 'IPhone 13', value: 13 }, { key: 'IPhone 14', value: 14 }, { key: 'IPhone 15', value: 15 }, { key: 'IPhone 14', value: 14 }, { key: 'IPhone 15', value: 15 }, { key: 'IPhone 14', value: 14 }, { key: 'IPhone 15', value: 15 }, { key: 'IPhone 14', value: 14 }, { key: 'IPhone 15', value: 15 }, { key: 'IPhone 14', value: 14 }]

  const [selectVersion, setSelectVersion] = useState('Tất cả')

  const [sort, setSort] = useState(null)
  const [version, setVersion] = useState(null)


  // handle click item category
  const handleClickItemCategory = (key, value) => {
    setSelectVersion(key)
    setVersion(value)
  }

  const handleCategorySelect = async (e) => {
    if (e.target.value !== false) {
      setSort(e.target.value)
    }
  }

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
            {allVersion.map((item, index) => {
              return (
                <div className={cx('category-item', `${item?.key === selectVersion ? 'active' : ''}`)} key={index} onClick={() => handleClickItemCategory(item?.key, item?.value)}>{item?.key}</div>
              )
            })}
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
          data={{
            limit: 24,
            pagination: true
          }}
          stt={1}
        />
      </div>
    </div>

  )
}

export default DienThoai
