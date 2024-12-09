import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { arrayRoutes } from './main/routes/routes'
import DefaultLayout from './frontend/layout/DefaultLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CountCartProvider } from './frontend/hooks/useContext'

function App() {

  return (
    <BrowserRouter>

      <div className="App">
        <Routes>
          {arrayRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            if (route?.path.includes('admin')) {
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            } else {
              return <Route key={index} path={route.path} element={<CountCartProvider><Layout><Page /></Layout></CountCartProvider>} />
            }
          })}
        </Routes>
        <ToastContainer autoClose={600} position="top-center" />
      </div>

    </BrowserRouter>
  )
}

export default App
