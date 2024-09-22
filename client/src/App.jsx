import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { arrayRoutes } from './main/routes/routes'
import DefaultLayout from './frontend/layout/DefaultLayout'

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
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        </Routes>
        {/* <ToastContainer autoClose={500} /> */}
      </div>
    </BrowserRouter>
  )
}

export default App
