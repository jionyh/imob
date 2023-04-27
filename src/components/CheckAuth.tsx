import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

type Props = {
  children: JSX.Element
}
export const CheckAuth = ({ children }: Props) => {
  let isAuth: boolean = false

  const cookie = Cookies.get('imobToken')

  if (cookie) {
    isAuth = true
  }

  if (!isAuth) {
    return <Navigate to='/login'></Navigate>
  }

  return children
}
