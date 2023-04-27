import { HiOutlineLocationMarker, HiOutlineDotsVertical, HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi'
import { RxPencil2, RxTrash } from 'react-icons/rx'

type Props = {
  end: string
  id: string
  menuOpened: string
  setMenuOpened: (id: string) => void
  handleDelete: (id: string) => void
  handleEdit: (id: string) => void
}

export const Itens = ({ end, id, menuOpened, setMenuOpened, handleDelete, handleEdit }: Props) => {
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
          <div className=' absolute right-5 p-1 bg-azulc text-bg rounded-b-lg rounded-tl-lg shadow-xl justify-start'>
            <div className='flex flex-col'>
              <button
                onClick={() => handleEdit(id)}
                className='flex items-center px-2 hover:opacity-70'>
                <RxPencil2 size={16} />
                <span className='ml-2'>Editar</span>
              </button>
              <hr className='mx-3 opacity-50' />
              <button
                onClick={() => handleDelete(id)}
                className='flex items-center px-2 hover:opacity-70'>
                <RxTrash size={16} />
                <span className='ml-2'>Deletar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
