import { RxArrowLeft } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='flex h-screen items-center'>
      <button
        onClick={() => navigate(-1)}
        className='hover:opacity-70'>
        <RxArrowLeft size={22} />
      </button>
      <span className='flex-1 text-2xl ml-4 text-azule'>Página não encontrada</span>
    </div>
  )
}
