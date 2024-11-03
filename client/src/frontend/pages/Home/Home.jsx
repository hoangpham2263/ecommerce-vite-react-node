import Carousel from '../components/Carousel'
import HotSale from '../components/HotSale'
import ProductItem from '../components/ProductItem'
import ProductItemSquare from '../components/ProductItemSquare'
import ProductItemRectangle from '../components/ProductItemRectangle'
import ProductItemTechnologyNews from '../components/ProductItemTechnologyNews'

const Home = () => {
  const dataPhuKien = [
    { title: 'Phụ kiện Apple', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568690/uploadLocal_ecommerce/Ph%E1%BB%A5%20ki%E1%BB%87n%20Apple.webp', bgColor: '#FE9F99' },
    { title: 'Cáp, sạc', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/C%C3%A1p%2C%20s%E1%BA%A1c.webp', bgColor: '#FE9F99' },
    { title: 'Pin sạc dự phòng', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568688/uploadLocal_ecommerce/Pin%20s%E1%BA%A1c%20d%E1%BB%B1%20ph%C3%B2ng.webp', bgColor: '#FE9F99' },
    { title: 'Ốp lưng - Bao da', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/%E1%BB%90p%20l%C6%B0ng%20-%20Bao%20da.webp', bgColor: '#FE9F99' },
    { title: 'Dán màn hình', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/D%C3%A1n%20m%C3%A0n%20h%C3%ACnh.webp', bgColor: '#FE9F99' },
    { title: 'Thẻ nhớ, USB', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/Th%E1%BA%BB%20nh%E1%BB%9B%2C%20USB.webp', bgColor: '#FE9F99' },
    { title: 'Gaming Gear, Playstation', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568690/uploadLocal_ecommerce/Gaming%20Gear%2C%20Playstation.webp', bgColor: '#FE9F99' },
    { title: 'Sim 4G', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568688/uploadLocal_ecommerce/Sim%204G.webp', bgColor: '#FE9F99' },
    { title: 'Thiết bị mạng', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/Thi%E1%BA%BFt%20b%E1%BB%8B%20m%E1%BA%A1ng.webp', bgColor: '#FE9F99' },
    { title: 'Camera', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568688/uploadLocal_ecommerce/Camera.webp', bgColor: '#FE9F99' },
    { title: 'Gimbal', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/Gimbal.webp', bgColor: '#FE9F99' },
    { title: 'Flycam', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/Flycam.webp', bgColor: '#FE9F99' },
    { title: 'Máy ảnh', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568690/uploadLocal_ecommerce/M%C3%A1y%20%E1%BA%A3nh.webp', bgColor: '#FE9F99' },
    { title: 'Chuột, bàn phím', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/Chu%E1%BB%99t%2C%20b%C3%A0n%20ph%C3%ADm.webp', bgColor: '#FE9F99' },
    { title: 'Balo, túi xách', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568688/uploadLocal_ecommerce/Balo%2C%20t%C3%BAi%20x%C3%A1ch.webp', bgColor: '#FE9F99' },
    { title: 'Hub chuyển đổi', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568689/uploadLocal_ecommerce/Hub%20chuy%E1%BB%83n%20%C4%91%E1%BB%95i.webp', bgColor: '#FE9F99' },
    { title: 'Phụ kiện điện thoại', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568690/uploadLocal_ecommerce/Ph%E1%BB%A5%20ki%E1%BB%87n%20%C4%91i%E1%BB%87n%20tho%E1%BA%A1i.webp', bgColor: '#FE9F99' },
    { title: 'Phụ kiện Laptop', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730568690/uploadLocal_ecommerce/Ph%E1%BB%A5%20ki%E1%BB%87n%20Laptop.webp', bgColor: '#FE9F99' }
  ]
  const dataLinhKien = [
    { title: 'PC ráp sẵn CellphoneS', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571232/uploadLocal_ecommerce/PC%20r%C3%A1p%20s%E1%BA%B5n%20CellphoneS.png', bgColor: '#FE9F99', csSize: true },
    { title: 'CPU', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571230/uploadLocal_ecommerce/CPU.webp', bgColor: '#FCA4AF' },
    { title: 'Mainboard', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571230/uploadLocal_ecommerce/Mainboard.webp', bgColor: '#F8A8D4' },
    { title: 'RAM', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571231/uploadLocal_ecommerce/RAM.webp', bgColor: '#C3B5FD' },
    { title: 'Ổ cứng', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571231/uploadLocal_ecommerce/%E1%BB%94%20c%E1%BB%A9ng.webp', bgColor: '#A5B4FB' },
    { title: 'Card màn hình', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571230/uploadLocal_ecommerce/Card%20m%C3%A0n%20h%C3%ACnh.webp', bgColor: '#92C5FD' },
    { title: 'Nguồn máy tính', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571231/uploadLocal_ecommerce/Ngu%E1%BB%93n%20m%C3%A1y%20t%C3%ADnh.webp', bgColor: '#6EE7B7' },
    { title: 'Tản nhiệt', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571231/uploadLocal_ecommerce/T%E1%BA%A3n%20nhi%E1%BB%87t.webp', bgColor: '#FBD34A' },
    { title: 'Case máy tính', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730571230/uploadLocal_ecommerce/Case%20m%C3%A1y%20t%C3%ADnh.webp', bgColor: '#FDBA74' }
  ]
  const dataHangCu = [
    { title: 'Điện thoại cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614396/uploadLocal_ecommerce/%C4%90i%E1%BB%87n%20tho%E1%BA%A1i%20c%C5%A9.webp', bgColor: '#D64044' },
    { title: 'Máy tính bảng cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/M%C3%A1y%20t%C3%ADnh%20b%E1%BA%A3ng%20c%C5%A9.webp', bgColor: '#D64044' },
    { title: 'Mac cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/Mac%20c%C5%A9.png', bgColor: '#D64044', csSize: true },
    { title: 'Laptop cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/Laptop%20c%C5%A9.png', bgColor: '#D64044', csSize: true },
    { title: 'Tai nghe cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614398/uploadLocal_ecommerce/Tai%20nghe%20c%C5%A9.webp', bgColor: '#D64044' },
    { title: 'Loa cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/Loa%20c%C5%A9.webp', bgColor: '#D64044' },
    { title: 'Đồng hồ thông minh cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/%C4%90%E1%BB%93ng%20h%E1%BB%93%20th%C3%B4ng%20minh%20c%C5%A9.png', bgColor: '#D64044', csSize: true },
    { title: 'Đồ gia dụng cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/%C4%90%E1%BB%93%20gia%20d%E1%BB%A5ng%20c%C5%A9.png', bgColor: '#D64044', csSize: true },
    { title: 'Phụ kiện cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/Ph%E1%BB%A5%20ki%E1%BB%87n%20c%C5%A9.webp', bgColor: '#D64044' },
    { title: 'Màn hình cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/M%C3%A0n%20h%C3%ACnh%20c%C5%A9.webp', bgColor: '#D64044' },
    { title: 'Tivi cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614398/uploadLocal_ecommerce/Tivi%20c%C5%A9.webp', bgColor: '#D64044' },
    { title: 'Cáp sạc cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614397/uploadLocal_ecommerce/C%C3%A1p%20s%E1%BA%A1c%20c%C5%A9.png', bgColor: '#D64044', csSize: true },
    { title: 'Pin dự phòng cũ', img: 'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730614398/uploadLocal_ecommerce/Pin%20d%E1%BB%B1%20ph%C3%B2ng%20c%C5%A9.png', bgColor: '#D64044', csSize: true }
  ]
  const dataUuDaiSV = [
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
  ]
  const dataTechnologyNews = [
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
    { img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/udsv-sliding-Mac.jpg' },
  ]

  return (
    <div>
      <Carousel />
      <HotSale />
      <ProductItem />
      <ProductItemSquare title={'PHỤ KIỆN'} data={dataPhuKien} />
      <ProductItemSquare title={'LINH KIỆN MÁY TÍNH'} data={dataLinhKien} />
      <ProductItemSquare title={'HÀNG CŨ'} data={dataHangCu} />
      <ProductItemRectangle title={'ƯU ĐÃI SINH VIÊN'} data={dataUuDaiSV} />
      <ProductItemRectangle title={'ƯU ĐÃI THANH TOÁN'} data={dataUuDaiSV} />
      <ProductItemRectangle title={'CHUYÊN TRANG THƯƠNG HIỆU'} data={dataUuDaiSV} />
      <ProductItemTechnologyNews title={'TIN CÔNG NGHỆ'} data={dataTechnologyNews} />
    </div>
  )
}

export default Home
