import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper } from './context/auth.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AuthWrapper>  
)

// Envuelven, por fuera, los contextos que menos cambios tendrán (en este cambio el inicio/cierre de sesión sucede menos que cambiar de ruta)