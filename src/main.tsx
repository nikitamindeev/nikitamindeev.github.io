import ReactDOM from 'react-dom/client'
import Home from './app/Home'
import './assets/global.css'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>
)
