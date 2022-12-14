import { useMemo } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import Home from './scenes/home'
import Login from './scenes/login'
import Profile from './scenes/profile'
import { getDesignTokens } from './theme'

export default function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/home'
              element={isAuth ? <Home /> : <Navigate to='/' />}
            />
            <Route
              path='/profile/:userId'
              element={isAuth ? <Profile /> : <Navigate to='/' />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
