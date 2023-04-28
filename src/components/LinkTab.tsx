import { RxPerson, RxHome } from 'react-icons/rx'

export const LinkTab = () => {
  return (
    <div className='w-full flex justify-center pb-3 border-b text-cinza '>
      <div className='flex items-center justify-center w-2/3 gap-1'>
        <button className='w-1/2 p-2 border-b border-cinza hover:border-azule flex items-center justify-center gap-4'>
          <RxHome />
          Imóveis
        </button>
        <button className='w-1/2 p-2 border-b text-azule border-azule hover:border-azule shadow-md  flex items-center justify-center gap-4'>
          <RxPerson />
          Inquilinos
        </button>
      </div>
    </div>
  )
}
