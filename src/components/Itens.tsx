import { HiOutlineLocationMarker, HiOutlineDotsVertical, HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi'

type Props = {
  end: string
  id: string
  menuOpened: string
  setMenuOpened: (id: string) => void
}

export const Itens = ({ end, id, menuOpened, setMenuOpened }: Props) => {
  return (
    <div className='flex items-center py-8 ml-5  text-azule sticky'>
      <HiOutlineLocationMarker className='h-6 w-6' />
      <span className='flex-1 ml-2'>{end}</span>
      <HiOutlineDotsVertical
        className='h-6 w-6 cursor-pointer'
        onClick={() => setMenuOpened(id)}
      />
      <div>
        {menuOpened === id && (
          <div className=' absolute p-2 right-8 bg-azulc text-bg rounded-b-lg rounded-tl-lg shadow-xl justify-start'>
            <div className='flex-1 flex items-center text-sm cursor-pointer'>
              <HiOutlinePencilAlt className='w-4 h-4' />
              <span className='ml-4'>Editar</span>
            </div>
            <hr className='my-2' />
            <div className='flex items-center text-sm cursor-pointer '>
              <HiOutlineTrash className='w-4 h-4' />
              <span className='ml-4'>Deletar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
