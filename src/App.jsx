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
import ForgetPasswordPage from './pages/forgetPasswordPage'
import ResetPasswordPage from './pages/resetPasswordPage'
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="w-screen min-h-screen bg-primary text-secondary m-0 p-0">
            <Toaster position='top-right' reverseOrder={true} />
            <Routes path="/">
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/test" element={<TestPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/admin/*" element={<AdminPage />}/>
              <Route path="/forget-password" element={<ForgetPasswordPage />}/>
              <Route path="/reset-password" element={<ResetPasswordPage />}/>
              <Route path="/*" element={<ClientHomePage />}/>
            </Routes>  
        </div> 
        </GoogleOAuthProvider> 
    </BrowserRouter>
  )
}

export default App
