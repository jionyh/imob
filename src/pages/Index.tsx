import { RxHamburgerMenu } from 'react-icons/rx'
import { Itens } from '../components/Itens'
import { useState, useEffect } from 'react'
import { api } from '../helpers/api'
import { Imovel } from '../types/imob'

export const Index = () => {
  const [imoveis, setImoveis] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [menuOpened, setMenuOpened] = useState('')

  const getImoveis = async () => {
    setLoading(true)
    const data = await api.imoveis()
    setImoveis(data)
    setLoading(false)
  }

  const handleMenuEvent = (event: MouseEvent) => {
    const tagName = (event.target as Element).tagName
    if (!['path', 'svg', 'span'].includes(tagName)) {
      setMenuOpened('')
    }
  }

  useEffect(() => {
    window.removeEventListener('click', handleMenuEvent)
    window.addEventListener('click', handleMenuEvent)
    return () => window.removeEventListener('click', handleMenuEvent)
  }, [menuOpened])

  const handleButton = async () => {
    const imovel: Imovel = {
      endereco: 'Av. Kennedy, 779',
      iptu: '123123123',
      inquilino: '1',
      valor: 1300,
      proprietario: 'Manoel',
      telefone: '993903333',
    }

    const addImovel = await api.addImovel(imovel)
  }

  useEffect(() => {
    getImoveis()
  }, [])

  return (
    <div className=' h-screen'>
      {loading && <div>Carregando</div>}
      {!loading && imoveis.length != 0 && (
        <>
          <header className=''>
            <div className='bg-azulc h-32 flex items-center justify-between p-2 flex-col shadow-sm'>
              <nav className='w-full flex justify-between items-center text-bg'>
                <div className='text-lg font-bold pl-2'>ImobWil</div>
                <RxHamburgerMenu size={30} />
              </nav>
              <input
                className='w-full rounded-sm p-3 my-3 text-azule focus:outline-none'
                type='text'
                placeholder='Procure o imóvel'
              />
            </div>
          </header>
          <main className='py-6 px-5 overflow-auto h-[calc(100vh-128px)]'>
            <hr />
            {imoveis.map((item: Imovel) => (
              <Itens
                end={item.endereco}
                key={(item.inquilino + Math.random()).toString()}
                id={item.inquilino}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
              />
            ))}
          </main>
        </>
      )}
    </div>
  )
}
