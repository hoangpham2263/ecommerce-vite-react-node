import Carousel from '../components/Carousel'
import HotSale from '../components/HotSale'
import ProductItem from '../components/ProductItem'
import ProductItemSquare from '../components/ProductItemSquare'
import ProductItemRectangle from '../components/ProductItemRectangle'
import ProductItemTechnologyNews from '../components/ProductItemTechnologyNews'
import { readProduct } from '../../services/publicApi'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { dataChuyenTrangThuongHieu, dataHangCu, dataLinhKien, dataPhuKien, dataTechnologyNews, dataUuDaiSV, dataUuDaiThanhToan } from './Data'

const Home = () => {
  const [products, setProducts] = useState(null)

  const fetchData = async () => {
    try {
      let data = { page: 1, limit: 12 }
      const res = await readProduct(data)
      setProducts(res?.data?.data?.product)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(() => { fetchData() }, [])
  return (
    <div>
      <Carousel />
      <HotSale />
      <ProductItem
        products={products}
        data={{
          title: 'IPhone',
          category: [{ name: 'IPhone 11', link: 'iphone-11' }, { name: 'IPhone 12', link: 'iphone-12' }, { name: 'IPhone 13', link: 'iphone-13' }, { name: 'IPhone 14', link: 'iphone-14' }, { name: 'IPhone 15', link: 'iphone-15' }, { name: 'IPhone 16', link: 'iphone-16' }],
        }}
        stt={4}
      />
      <ProductItem
        products={products}
        data={{
          title: 'IPad',
          category: [{ name: 'IPhone 11', link: 'iphone-11' }, { name: 'IPhone 12', link: 'iphone-12' }, { name: 'IPhone 13', link: 'iphone-13' }, { name: 'IPhone 14', link: 'iphone-14' }, { name: 'IPhone 15', link: 'iphone-15' }, { name: 'IPhone 16', link: 'iphone-16' }],
        }}
        stt={5}
      />
      <ProductItem
        products={products}
        data={{
          title: 'Laptop',
          category: [{ name: 'IPhone 11', link: 'iphone-11' }, { name: 'IPhone 12', link: 'iphone-12' }, { name: 'IPhone 13', link: 'iphone-13' }, { name: 'IPhone 14', link: 'iphone-14' }, { name: 'IPhone 15', link: 'iphone-15' }, { name: 'IPhone 16', link: 'iphone-16' }],
        }}
        stt={5}
      />

      <ProductItemSquare title={'PHỤ KIỆN'} data={dataPhuKien} />
      <ProductItemSquare title={'LINH KIỆN MÁY TÍNH'} data={dataLinhKien} />
      <ProductItemSquare title={'HÀNG CŨ'} data={dataHangCu} />
      <ProductItemRectangle title={'ƯU ĐÃI SINH VIÊN'} data={dataUuDaiSV} />
      <ProductItemRectangle title={'ƯU ĐÃI THANH TOÁN'} data={dataUuDaiThanhToan} />
      <ProductItemRectangle title={'CHUYÊN TRANG THƯƠNG HIỆU'} data={dataChuyenTrangThuongHieu} />
      <ProductItemTechnologyNews title={'TIN CÔNG NGHỆ'} data={dataTechnologyNews} />
    </div>
  )
}

export default Home
