import Carousel from '../components/Carousel'
import HotSale from '../components/HotSale'
import ProductItem from '../components/ProductItem'
import ProductItemSquare from '../components/ProductItemSquare'
import ProductItemRectangle from '../components/ProductItemRectangle'
import ProductItemTechnologyNews from '../components/ProductItemTechnologyNews'
import { dataChuyenTrangThuongHieu, dataHangCu, dataLinhKien, dataPhuKien, dataTechnologyNews, dataUuDaiSV, dataUuDaiThanhToan } from './Data'
import { useAuth } from '../../../main/context/AuthContext'

const Home = () => {
  const { user, login } = useAuth()

  return (
    <div>
      <Carousel />
      <HotSale />
      <ProductItem
        data={{
          title: 'IPhone',
          category: [{ name: 'IPhone 11', link: 'iphone-11' }, { name: 'IPhone 12', link: 'iphone-12' }, { name: 'IPhone 13', link: 'iphone-13' }, { name: 'IPhone 14', link: 'iphone-14' }, { name: 'IPhone 15', link: 'iphone-15' }, { name: 'IPhone 16', link: 'iphone-16' }],
          limit: 12,
          pagination: false
        }}
        stt={1}
      />
      <ProductItem
        data={{
          title: 'IPhone',
          category: [{ name: 'IPhone 11', link: 'iphone-11' }, { name: 'IPhone 12', link: 'iphone-12' }, { name: 'IPhone 13', link: 'iphone-13' }, { name: 'IPhone 14', link: 'iphone-14' }, { name: 'IPhone 15', link: 'iphone-15' }, { name: 'IPhone 16', link: 'iphone-16' }],
          limit: 12,
          pagination: false
        }}
        stt={2}
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
