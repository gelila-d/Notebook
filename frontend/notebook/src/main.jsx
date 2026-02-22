import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Added the closing > below */}
      <CookiesProvider>
        <App />
      </CookiesProvider>

    </BrowserRouter>
  </StrictMode>,
)