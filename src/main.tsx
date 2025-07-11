import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import Rotas from './routes/rotas.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Rotas />
  </StrictMode>,
)
