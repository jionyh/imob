import { useState } from 'react'
import divisor from '../assets/divisor01.svg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { api } from '../helpers/api'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<any>({})

  const doLogin = async () => {
    const res = await api.login(email, password)
    if (res !== true) {
      if (res) {
        setError(res)
      }
    }
    window.location.href = '/'
  }

  return (
    <div className=''>
      <div className=' h-32 text-center text-azule font-bold text-2xl flex items-center justify-center'>
        <span>ImobWil</span>
      </div>
      <div className='flex items-center justify-center mt-8'>
        <img
          className=''
          src={divisor}
          alt=''
        />
      </div>
      <div className='flex flex-col text-azule mt-28'>
        <div>
          <p>{error.message}</p>
        </div>
        <input
          className=' bg-bg p-5 mx-6 mb-8 rounded-lg focus:outline-none'
          type='text'
          placeholder='Digite seu e-mail'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <div className='flex items-center'>
          <input
            className=' flex-1 bg-bg p-5 mx-6 mb-8 rounded-lg focus:outline-none'
            type={showPassword ? 'text' : 'password'}
            placeholder='Digite sua senha'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className=' cursor-pointer  absolute right-9 top-[385px] text-cinza'>
            {showPassword ? <AiOutlineEye className='h-8 w-8' /> : <AiOutlineEyeInvisible className='h-8 w-8' />}
          </button>
        </div>
      </div>
      <div className='flex'>
        <button
          onClick={doLogin}
          className='flex-1 mx-6 py-6 bg-azule text-bg rounded-lg'>
          Entrar
        </button>
      </div>

      <div className='flex items-center justify-center mt-24'>
        <img
          className=''
          src={divisor}
          alt=''
        />
      </div>
    </div>
  )
}
