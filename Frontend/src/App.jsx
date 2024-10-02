import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/User/HomePage/HomePage'
import Signup from './Pages/User/Signup/Signup'
import Login from './Pages/User/Login/Login'
import ProfilePage from './Pages/User/ProfilePage/ProfilePage'
import AdminLogin from './Pages/Admin/Login/AdminLogin'
import Dashboard from './Pages/Admin/Dashboard/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<ProfilePage />} />

        <Route path='/admin_login' element={<AdminLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      
    </div>
  )
}

export default App
