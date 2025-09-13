import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProduactCard from './components/productCard'
import SuperProduct from './components/superProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import ClientHomePage from './pages/client/clientHomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-primary text-secondary">
          <Toaster position='top-right' reverseOrder={true} />
          <Routes path="/">
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/test" element={<TestPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/admin/*" element={<AdminPage />}/>
            <Route path="/*" element={<ClientHomePage />}/>
          </Routes>  
        </div>  
    </BrowserRouter>
  )
}

export default App
