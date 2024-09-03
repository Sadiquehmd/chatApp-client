import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DataContextProvider from './store/store.jsx'
createRoot(document.getElementById('root')).render(
 
    <DataContextProvider>
    <App /></DataContextProvider>
  
)
