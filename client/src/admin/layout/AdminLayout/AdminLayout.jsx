import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'


const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='row'>
        <div className='col-2'>
          <div className=''><Sidebar /></div>
        </div>
        <div className='col-10 d-flex flex-column'>
          <div >{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}


export default AdminLayout
