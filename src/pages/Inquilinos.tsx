import { RxArrowLeft } from 'react-icons/rx'
import { RiWhatsappFill } from 'react-icons/ri'

import TextField from '@mui/material/TextField'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../helpers/api'
import { Loader } from '../components/Loader'
import { AlertModal } from '../components/AlertModal'
import { InputPhone } from '../components/Inputs/Phone'

export const Inquilinos = () => {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const [inquilinos, setInquilinos] = useState<any>()

  const [disabled, setDisabled] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')

  const getInquilinos = async () => {
    setLoading(true)
    const data = await api.inquilinoId(params.slug as string)
    setNome(data[0].nome)
    setTelefone(data[0].telefone)
    setCpf(data[0].cpf)
    setInquilinos(data)
    setLoading(false)
  }

  const handleEdit = async () => {
    setConfirmOpen(true)
    setDisabled(true)
  }

  const handleConfirmEdit = async () => {
    let err = []
    if (nome !== '' && cpf !== '' && telefone.length >= 8) {
      await api.editInquilino(nome, cpf, telefone, params.slug as string)
      setDisabled(true)
      getInquilinos()
      setErrors([])
      setConfirmOpen(false)
      navigate(location.pathname)
    } else {
      if (nome == '') err.push('nome')
      if (cpf == '') err.push('cpf')
      if (telefone.length <= 7) err.push('telefone')
      setErrors(err)
      setConfirmOpen(false)
      alert('Você precisa preencher os campos em vermelho!')
    }
  }

  useEffect(() => {
    getInquilinos()
  }, [])

  return (
    <div>
      {loading && <Loader />}
      {!loading && inquilinos.length >= 1 && (
        <>
          <div className=''>
            <div className='h-16 pl-4 flex items-center justify-center text-azule'>
              <button
                onClick={() => navigate(-1)}
                className='hover:opacity-70'>
                <RxArrowLeft size={22} />
              </button>
              <span className='flex-1 text-2xl ml-4 text-azule'>Inquilino</span>
            </div>
            <hr className='mx-3 border-[1px] border-cinza' />
          </div>
          <div className='flex items-center justify-end gap-1 p-4 text-bg'>
            {!disabled && (
              <button
                onClick={() => {
                  setConfirmOpen(true)
                  handleEdit
                }}
                className='bg-azulc p-2 rounded-sm'>
                Enviar
              </button>
            )}
            <button
              onClick={() => {
                setDisabled(false)
              }}
              disabled={!disabled}
              className={`bg-azulc p-2 rounded-sm ${!disabled && 'opacity-40'}`}>
              Editar
            </button>
          </div>
          <div className='px-4'>
            <TextField
              fullWidth
              error={errors.includes('nome')}
              disabled={disabled}
              id='outlined-basic'
              label='Nome'
              variant='outlined'
              size='small'
              value={nome}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            />
            <div className='my-3'>
              <TextField
                fullWidth
                disabled={disabled}
                error={errors.includes('cpf')}
                id='outlined-basic'
                label='CPF'
                variant='outlined'
                size='small'
                value={cpf}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)}
              />
            </div>
            <div className='my-3 flex gap-3'>
              <div className='flex-1'>
                <InputPhone
                  error={errors.includes('telefone')}
                  disabled={disabled}
                  setTel={setTelefone}
                  tel={telefone}
                  fullWidth={true}
                />
              </div>
              <Link
                className={`${!disabled && 'pointer-events-none select-none'} `}
                target='_blank'
                to={`https://wa.me/55${telefone}`}>
                <button
                  disabled={!disabled}
                  className='h-full px-3 flex items-center justify-between bg-green-700 rounded-md hover:bg-green-600'>
                  <span className='text-sm text-bg font-bold mr-2'>Chamar</span>
                  <RiWhatsappFill className='text-lg text-white' />
                </button>
              </Link>
            </div>
            <hr className='mb-3 border-azulc' />
            <AlertModal
              action='editar'
              activeView='inquilino'
              message={nome}
              confirmOpen={confirmOpen}
              setConfirmOpen={setConfirmOpen}
              handleConfirm={handleConfirmEdit}
            />
          </div>
        </>
      )}
    </div>
  )
}
