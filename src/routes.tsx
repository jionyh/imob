import { Route, Routes } from 'react-router-dom'

import React from 'react'
import { Index } from './pages/Index'

export const RouteList = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Index />}
      />
    </Routes>
  )
}
