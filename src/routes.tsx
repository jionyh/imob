import { Route, Routes } from 'react-router-dom'

import { Index } from './pages/Index'
import { Login } from './pages/Login'
import { CheckAuth } from './components/CheckAuth'
import { Imovel } from './pages/Imovel'
import { CadInquilino } from './pages/CadInquilino'
import { CadImovel } from './pages/CadImovel'
import { NotFound } from './pages/NotFound'
import { Inquilinos } from './pages/Inquilinos'

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
        path='/imovel/:slug'
        element={
          <CheckAuth>
            <Imovel />
          </CheckAuth>
        }
      />
      <Route
        path='/inquilino/:slug'
        element={
          <CheckAuth>
            <Inquilinos />
          </CheckAuth>
        }
      />
      <Route
        path='/cadastroinquilino'
        element={
          <CheckAuth>
            <CadInquilino />
          </CheckAuth>
        }
      />
      <Route
        path='/cadastroimovel'
        element={
          <CheckAuth>
            <CadImovel />
          </CheckAuth>
        }
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  )
}
