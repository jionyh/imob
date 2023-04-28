import { Itens } from '../components/Itens'
import { useState, useEffect } from 'react'
import { api } from '../helpers/api'
import { Imovel, Inquilino } from '../types/imob'
import { Loader } from '../components/Loader'

import { Header } from '../components/Header'
import { AlertModal } from '../components/AlertModal'

import { TbHomeOff } from 'react-icons/tb'
import { RxPerson, RxHome } from 'react-icons/rx'

export const Index = () => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [menuOpened, setMenuOpened] = useState('')
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [activeView, setActiveView] = useState('imovel')

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletedImovel, setDeletedImovel] = useState('')

  const [deletedImovelId, setDeletedImovelId] = useState('')

  const getImoveis = async () => {
    setActiveView('imovel')
    setLoading(true)
    const data = await api.imoveis()
    setData(data)
    setLoading(false)
  }

  const getInquilinos = async () => {
    setActiveView('inquilino')
    setLoading(true)
    const data = await api.inquilinos()
    setData(data)
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

  const handleDelete = (end: string, id: string) => {
    setDeletedImovel(end)
    setDeletedImovelId(id)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    api.delImovel(deletedImovelId)
    getImoveis()
    setConfirmOpen(false)
    window.location.href = '/'
  }

  useEffect(() => {
    getImoveis()
  }, [])
  return (
    <div className=' h-screen'>
      {loading && <Loader />}
      {!loading && (
        <div className='container'>
          <Header
            burgerOpen={burgerOpen}
            setBurgerOpen={setBurgerOpen}
          />

          <main className='py-6 px-5 overflow-auto h-[calc(100vh-128px)]'>
            <div className='w-full flex justify-center pb-3 border-b text-cinza '>
              <div className='flex items-center justify-center w-2/3 gap-1'>
                <button
                  onClick={() => getImoveis()}
                  className={`w-1/2 p-2 border-b border-cinza hover:border-azule flex items-center justify-center gap-4 ${
                    activeView === 'imovel' ? 'text-azule border-azule shadow-md' : ''
                  }`}>
                  <RxHome />
                  Imóveis
                </button>
                <button
                  onClick={() => getInquilinos()}
                  className={`w-1/2 p-2 border-b border-cinza hover:border-azule flex items-center justify-center gap-4 ${
                    activeView === 'inquilino' ? 'text-azule border-azule shadow-md' : ''
                  }`}>
                  <RxPerson />
                  Inquilinos
                </button>
              </div>
            </div>

            {data.length != 0 ? (
              <>
                {activeView === 'imovel'
                  ? data.map((item: Imovel) => (
                      <div key={item.id}>
                        <Itens
                          title={item.endereco}
                          key={item.id}
                          id={item.id}
                          activeView={activeView}
                          menuOpened={menuOpened}
                          setMenuOpened={setMenuOpened}
                          handleDelete={handleDelete}
                        />
                        <hr />
                      </div>
                    ))
                  : data.map((item: Inquilino) => (
                      <div key={item.id}>
                        <Itens
                          title={item.nome}
                          key={item.id}
                          id={item.id}
                          activeView={activeView}
                          menuOpened={menuOpened}
                          setMenuOpened={setMenuOpened}
                          handleDelete={handleDelete}
                        />
                        <hr />
                      </div>
                    ))}
              </>
            ) : (
              <div className='flex flex-col items-center justify-center gap-2 mt-10'>
                <TbHomeOff
                  size={60}
                  color='#9BA4B5'
                  className='opacity-70'
                />
                <span className='text-2xl text-cinza'>Não há {activeView} cadastrados</span>
              </div>
            )}

            <AlertModal
              confirmOpen={confirmOpen}
              setConfirmOpen={setConfirmOpen}
              message={deletedImovel}
              activeView={activeView}
              handleConfirm={handleConfirmDelete}
            />
          </main>
        </div>
      )}
    </div>
  )
}
