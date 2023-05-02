import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import { RxArrowLeft } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { api } from '../helpers/api'
import { Inquilino } from '../types/imob'
import { InputPhone } from '../components/Inputs/Phone'

export const CadImovel = () => {
  const navigate = useNavigate()

  const [inquilinos, setInquilinos] = useState<any>(null)

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [iptu, setIptu] = useState('')
  const [aluguel, setAlugel] = useState('')
  const [inquilino, setInquilino] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const getInquilinos = async () => {
    const data = await api.inquilinos()
    setInquilinos(data)
  }

  const handleAddImovel = async () => {
    let err = []
    if (endereco !== '' && iptu !== '' && aluguel !== '' && nome !== '' && telefone.length > 10 && inquilino !== '') {
      await api.addImovel(endereco, iptu, aluguel, nome, telefone, inquilino)
      setErrors([])
      alert('Imóvel Cadastrado')
      navigate(-1)
    } else {
      if (endereco == '') err.push('endereco')
      if (iptu == '') err.push('iptu')
      if (aluguel == '') err.push('aluguel')
      if (nome == '') err.push('nome')
      if (telefone.length <= 9) err.push('telefone')
      if (inquilino == '') err.push('inquilino')
      setErrors(err)
      alert('Você precisa preencher os campos em vermelho!')
    }
  }

  useEffect(() => {
    getInquilinos()
  }, [])

  return (
    <div>
      <div className=''>
        <div className='h-16 pl-4 flex items-center justify-center text-azule'>
          <button
            onClick={() => navigate(-1)}
            className='hover:opacity-70'>
            <RxArrowLeft size={22} />
          </button>
          <span className='flex-1 text-2xl ml-4 text-azule'>Cadastrar Imóvel</span>
        </div>
        <hr className='mx-3 border-[1px] border-cinza' />
      </div>
      <div className='p-4'>
        <div>
          <TextField
            fullWidth
            required
            id='outlined-basic'
            label='Endereço'
            variant='outlined'
            size='small'
            error={errors.includes('endereco')}
            value={endereco}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndereco(e.target.value)}
          />
        </div>
        <div className='my-3 flex gap-3'>
          <TextField
            fullWidth
            required
            id='outlined-basic'
            label='Número IPTU'
            variant='outlined'
            size='small'
            error={errors.includes('iptu')}
            value={iptu}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIptu(e.target.value)}
          />
          <TextField
            fullWidth
            required
            id='outlined-basic'
            label='Valor Aluguel'
            variant='outlined'
            size='small'
            error={errors.includes('aluguel')}
            value={aluguel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAlugel(e.target.value)}
          />
        </div>
        <TextField
          fullWidth
          required
          id='outlined-basic'
          label='Proprietário'
          variant='outlined'
          size='small'
          error={errors.includes('nome')}
          value={nome}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
        />
        <div className='py-3'>
          <InputPhone
            error={errors.includes('telefone')}
            tel={telefone}
            setTel={setTelefone}
            fullWidth={true}
          />
        </div>
        <TextField
          fullWidth
          select
          id='outlined-basic'
          label='Inquilino'
          variant='outlined'
          size='small'
          error={errors.includes('inquilino')}
          value={inquilino}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInquilino(e.target.value)}>
          {inquilinos !== null ? (
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
        <div className='flex items-center justify-end gap-1 py-4 text-bg'>
          <button
            onClick={handleAddImovel}
            className='bg-azulc p-2 rounded-sm'>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  )
}
