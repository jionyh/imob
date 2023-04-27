import { RxHamburgerMenu, RxPerson, RxHome } from 'react-icons/rx'
import { Itens } from '../components/Itens'
import { useState, useEffect } from 'react'
import { api } from '../helpers/api'
import { Imovel } from '../types/imob'
import { Loader } from '../components/Loader'

export const Index = () => {
  const [imoveis, setImoveis] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [menuOpened, setMenuOpened] = useState('')
  const [burgerOpen, setBurgerOpen] = useState(false)

  const getImoveis = async () => {
    setLoading(true)
    const data = await api.imoveis()
    console.log(data)
    setImoveis(data)
    setLoading(false)
  }

  const handleMenuEvent = (event: MouseEvent) => {
    const tagName = (event.target as Element).tagName
    if (!['path', 'svg', 'span'].includes(tagName)) {
      setMenuOpened('')
      setBurgerOpen(false)
    }
  }

  useEffect(() => {
    window.removeEventListener('click', handleMenuEvent)
    window.addEventListener('click', handleMenuEvent)
    return () => window.removeEventListener('click', handleMenuEvent)
  }, [menuOpened, burgerOpen])

  const handleButton = async () => {
    const imovel: Imovel = {
      endereco: 'Av. Kennedy, 779',
      iptu: '123123123',
      inquilino: '1',
      id: '22312800',
      valor: 1300,
      proprietario: 'Manoel',
      telefone: '993903333',
    }

    await api.addImovel(imovel)
  }

  const handleDelete = async (id: string) => {
    /* await api.delImovel(id) */
    console.log(id)
  }
  const handleEdit = async (id: string) => {
    /* await api.delImovel(id) */
    console.log(id)
  }

  useEffect(() => {
    getImoveis()
  }, [])
  return (
    <div className=' h-screen'>
      {loading && <Loader />}
      {!loading && imoveis.length != 0 && (
        <>
          <header className=''>
            <div className='bg-azulc h-32 flex items-center justify-between p-2 flex-col shadow-sm'>
              <nav className='w-full flex justify-between items-center text-bg'>
                <div className='text-lg font-bold pl-2'>ImobWil</div>
                <div>
                  <RxHamburgerMenu
                    size={30}
                    onClick={() => setBurgerOpen(!burgerOpen)}
                  />
                  {burgerOpen ? (
                    <div className='absolute right-2 p-4 bg-azulc shadow-sm rounded-b-lg rounded-tl-lg'>
                      <div className='flex flex-col'>
                        <button className='flex px-2  hover:opacity-70'>
                          <RxPerson size={20} />
                          <span className='ml-2'>Inquilinos</span>
                        </button>
                        <hr className='my-3 opacity-50' />
                        <button className='flex px-2 hover:opacity-70'>
                          <RxHome size={20} />
                          <span className='ml-2'>Imóveis</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </nav>
              <div className='flex items-center w-full'>
                <input
                  className=' flex-1 rounded-l-lg p-3 my-3 border-y-2 border-l-2 border-azule text-azule focus:outline-none'
                  type='text'
                  placeholder='Procure o imóvel'
                />
                <button
                  onClick={handleButton}
                  className='text-azule bg-bg p-3 my-3 border-2 text-base border-azule rounded-r-lg hover:opacity-95'>
                  Procurar
                </button>
              </div>
            </div>
          </header>
          <main className='py-6 px-5 overflow-auto h-[calc(100vh-128px)]'>
            <hr />
            {imoveis.map((item: Imovel) => (
              <>
                <Itens
                  end={item.endereco}
                  key={item.id}
                  id={item.id}
                  menuOpened={menuOpened}
                  setMenuOpened={setMenuOpened}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                <hr />
              </>
            ))}
          </main>
        </>
      )}
    </div>
  )
}
