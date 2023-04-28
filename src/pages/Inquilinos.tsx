import { RxArrowLeft } from 'react-icons/rx'
import { RiWhatsappFill } from 'react-icons/ri'

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../helpers/api'
import { Loader } from '../components/Loader'
import { Inquilino } from '../types/imob'

export const Inquilinos = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [imovel, setImovel] = useState<any>(null)
  const [inquilino, setInquilino] = useState<any>(null)
  const [inquilinos, setInquilinos] = useState<any>([])

  const [disabled, setDisabled] = useState(true)

  const [end, setEnd] = useState('')
  const [iptu, setIptu] = useState('')
  const [valor, setValor] = useState('')
  const [prop, setProp] = useState('')
  const [propTel, setPropTel] = useState('')
  const [inq, setInq] = useState('')
  const [inqTel, setInqTel] = useState('')

  const getInquilinos = async () => {
    const data = await api.inquilinos()
    setInquilinos(data)
  }

  const getInquilino = async (id: string) => {
    if (id) {
      const dataInquilino = await api.inquilinoId(id)
      setInquilino(dataInquilino[0])
      setInq(dataInquilino[0].id)
      setInqTel(dataInquilino[0].telefone)
    }
    return
  }

  const getImoveis = async () => {
    setLoading(true)
    const id = params.slug
    if (id) {
      const dataImovel = await api.imovelId(id)
      setImovel(dataImovel[0])
      getInquilino(dataImovel[0].inquilino)
      setEnd(dataImovel[0].endereco)
      setIptu(dataImovel[0].iptu)
      setValor(dataImovel[0].valor)
      setProp(dataImovel[0].proprietario)
      setPropTel(dataImovel[0].telefone)
      setLoading(false)
    }
    setLoading(false)
  }

  const handleEdit = async () => {
    await api.editImovel(end, iptu, valor, prop, propTel, inq, imovel.id)
    alert('Informações alteradas!')
    setDisabled(true)
    getImoveis()
    getInquilinos()
  }

  useEffect(() => {
    getImoveis()
    getInquilinos()
  }, [])

  return (
    <div>
      {loading && <Loader />}
      {!loading && imovel !== null && inquilino !== null && (
        <>
          <div className=''>
            <div className='h-16 pl-4 flex items-center justify-center text-azule'>
              <button
                onClick={() => navigate(-1)}
                className='hover:opacity-70'>
                <RxArrowLeft size={22} />
              </button>
              <span className='flex-1 text-2xl ml-4 text-azule'>Imóvel</span>
            </div>
            <hr className='mx-3 border-[1px] border-cinza' />
          </div>
          <div className='flex items-center justify-end gap-1 p-4 text-bg'>
            <button className='bg-azulc p-2 rounded-sm'>Pagamentos</button>
            {disabled ? (
              <button
                onClick={() => setDisabled(false)}
                className='bg-azulc p-2 rounded-sm'>
                Editar
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className='bg-azulc p-2 rounded-sm'>
                Enviar
              </button>
            )}
          </div>
          <div className='px-4'>
            <TextField
              fullWidth
              disabled={disabled}
              id='outlined-basic'
              label='Endereço'
              variant='outlined'
              size='small'
              value={end}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnd(e.target.value)}
            />
            <div className='my-3 flex gap-3'>
              <TextField
                disabled={disabled}
                className='flex-1'
                id='outlined-basic'
                label='Número IPTU'
                variant='outlined'
                size='small'
                value={iptu}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIptu(e.target.value)}
              />
              <TextField
                disabled={disabled}
                className='flex-1'
                id='outlined-basic'
                label='Valor Aluguel'
                variant='outlined'
                size='small'
                value={valor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValor(e.target.value)}
              />
            </div>
            <TextField
              fullWidth
              disabled={disabled}
              id='outlined-basic'
              label='Proprietário'
              variant='outlined'
              size='small'
              value={prop}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp(e.target.value)}
            />
            <div className='my-3 flex gap-3'>
              <TextField
                disabled={disabled}
                className='flex-1'
                id='outlined-basic'
                label='Telefone Proprietário'
                variant='outlined'
                size='small'
                value={propTel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPropTel(e.target.value)}
              />
              <Link
                className=''
                to={`https://wa.me/55${inqTel}`}>
                <button className='h-full px-3 flex items-center justify-between bg-green-700 rounded-md hover:bg-green-600'>
                  <span className='text-sm text-bg font-bold mr-2'>Chamar</span>
                  <RiWhatsappFill className='text-lg text-white' />
                </button>
              </Link>
            </div>
            <hr className='mb-3 border-azulc' />
            <TextField
              fullWidth
              select
              disabled={disabled}
              id='outlined-basic'
              label='Inquilino'
              variant='outlined'
              size='small'
              value={inq}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInq(e.target.value)}>
              {inquilinos.length >= 1 ? (
                inquilinos.map((option: Inquilino) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}>
                    {option.nome}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>Selecione</MenuItem>
              )}
            </TextField>
            <div className='my-3 flex gap-3'>
              <TextField
                disabled={disabled}
                className='flex-1'
                id='outlined-basic'
                label='Telefone Inquilino'
                variant='outlined'
                size='small'
                value={inqTel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInqTel(e.target.value)}
              />
              <Link
                className=''
                to={`https://wa.me/55${inqTel}`}>
                <button className='h-full px-3 flex items-center justify-between bg-green-700 rounded-md hover:bg-green-600'>
                  <span className='text-sm text-bg font-bold mr-2'>Chamar</span>
                  <RiWhatsappFill className='text-lg text-white' />
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
