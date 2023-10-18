import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './118n.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTriangleExclamation, faDollarSign, faArrowTrendDown, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faTriangleExclamation, faDollarSign, faArrowTrendDown, faArrowTrendUp)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
