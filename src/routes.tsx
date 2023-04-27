import { Route, Routes } from 'react-router-dom'

import React from 'react'
import { Index } from './pages/Index'
import { Login } from './pages/Login'
import { CheckAuth } from './components/CheckAuth'

export const RouteList = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <CheckAuth>
            <Index />
          </CheckAuth>
        }
      />
      <Route
        path='/login'
        element={<Login />}
      />
    </Routes>
  )
}
