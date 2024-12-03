import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './main/GlobalStyles'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CountCartProvider } from './frontend/hooks/useContext.jsx'
import { AuthProvider } from './main/context/AuthContext.jsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <CountCartProvider>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </CountCartProvider>
    </AuthProvider>
  </GoogleOAuthProvider>

  // </React.StrictMode>
)
