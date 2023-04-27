import { HiOutlineLocationMarker, HiOutlineDotsVertical, HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi'
import { RxPencil2, RxTrash } from 'react-icons/rx'
import { Link } from 'react-router-dom'

type Props = {
  end: string
  id: string
  menuOpened: string
  setMenuOpened: (id: string) => void
  handleDelete: (end: string, id: string) => void
}

export const Itens = ({ end, id, menuOpened, setMenuOpened, handleDelete }: Props) => {
  return (
    <div className='flex items-center py-8 ml-5  text-azule sticky'>
      <Link
        className='flex-1 flex'
        to={`/imovel/${id}`}>
        <HiOutlineLocationMarker className='h-6 w-6' />
        <span className='flex-1 ml-2'>{end}</span>
      </Link>
      <HiOutlineDotsVertical
        className='h-6 w-6 cursor-pointer'
        onClick={() => setMenuOpened(id)}
      />
      <div>
        {menuOpened === id && (
          <div className=' absolute right-5 p-1 bg-azulc text-bg rounded-b-lg rounded-tl-lg shadow-xl justify-start'>
            <div className='flex flex-col'>
              <Link to={`/imovel/${id}`}>
                <button className='flex items-center px-2 hover:opacity-70'>
                  <RxPencil2 size={16} />
                  <span className='ml-2'>Editar</span>
                </button>
              </Link>
              <hr className='mx-3 opacity-50' />
              <button
                onClick={() => handleDelete(end, id)}
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
