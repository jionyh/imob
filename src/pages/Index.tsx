import { RxHamburgerMenu, RxPerson, RxHome } from 'react-icons/rx'
import { Itens } from '../components/Itens'
import { useState, useEffect } from 'react'
import { api } from '../helpers/api'
import { Imovel } from '../types/imob'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export const Index = () => {
  const [imoveis, setImoveis] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [menuOpened, setMenuOpened] = useState('')
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletedImovel, setDeletedImovel] = useState('')
  const [deletedImovelId, setDeletedImovelId] = useState('')

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
      {!loading && imoveis.length != 0 && (
        <>
          <header className=''>
            <div className='bg-azulc h-16 flex items-center justify-between p-2 flex-col shadow-sm'>
              <nav className='w-full flex justify-between items-center text-bg'>
                <span className='text-lg font-bold p-2'>ImobWil</span>
                <div>
                  <RxHamburgerMenu
                    size={30}
                    onClick={() => setBurgerOpen(!burgerOpen)}
                  />
                  {burgerOpen ? (
                    <div className='absolute right-2 p-4 bg-azulc shadow-sm rounded-b-lg rounded-tl-lg'>
                      <div className='flex flex-col'>
                        <Link to='/cadastroInquilino'>
                          <button className='flex px-2  hover:opacity-70'>
                            <RxPerson size={20} />
                            <span className='ml-2'> Cadastrar Inquilinos</span>
                          </button>
                        </Link>
                        <hr className='my-3 opacity-50' />
                        <Link to='/cadastroImovel'>
                          <button className='flex px-2 hover:opacity-70'>
                            <RxHome size={20} />
                            <span className='ml-2'>Cadastrar Imóveis</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </nav>
            </div>
          </header>
          <main className='py-6 px-5 overflow-auto h-[calc(100vh-128px)]'>
            <hr />
            {imoveis.map((item: Imovel) => (
              <div key={item.id}>
                <Itens
                  end={item.endereco}
                  key={item.id}
                  id={item.id}
                  menuOpened={menuOpened}
                  setMenuOpened={setMenuOpened}
                  handleDelete={handleDelete}
                />
                <hr />
              </div>
            ))}
            <Dialog
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'>
              <DialogTitle id='alert-dialog-title'>{'Confirmar exclusão!'}</DialogTitle>
              <DialogContent>
                <DialogContentText
                  className='text-center'
                  id='alert-dialog-description'>
                  Tem certeza que deseja deletar o imóvel
                  <span className='inline-block font-bold text-azule mt-1'>{deletedImovel}?</span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className='bg-red-600 text-bg p-2 rounded-md hover:opacity-70'
                  onClick={() => setConfirmOpen(false)}>
                  Cancelar
                </button>
                <button
                  className='bg-azule text-bg p-2 rounded-md hover:opacity-70'
                  onClick={handleConfirmDelete}
                  autoFocus>
                  Continuar
                </button>
              </DialogActions>
            </Dialog>
          </main>
        </>
      )}
    </div>
  )
}
