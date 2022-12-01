import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import Home from './scenes/home'
import Login from './scenes/login'
import Profile from './scenes/profile'

export default function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
