import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { RxArrowLeft } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { api } from '../helpers/api'

export const CadInquilino = () => {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, SetCpf] = useState('')

  const handleAddInquilino = async () => {
    await api.addInquilino(nome, cpf, telefone)
    alert('Inquilino Cadastrado')
    navigate(-1)
  }

  return (
    <div>
      <div className=''>
        <div className='h-16 pl-4 flex items-center justify-center text-azule'>
          <button
            onClick={() => navigate(-1)}
            className='hover:opacity-70'>
            <RxArrowLeft size={22} />
          </button>
          <span className='flex-1 text-2xl ml-4 text-azule'>Cadastrar Inquilino</span>
        </div>
        <hr className='mx-3 border-[1px] border-cinza' />
      </div>
      <div className='p-4'>
        <div>
          <TextField
            fullWidth
            required
            id='outlined-basic'
            label='Nome'
            variant='outlined'
            size='small'
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <TextField
            fullWidth
            required
            id='outlined-basic'
            label='Telefone'
            variant='outlined'
            size='small'
            value={telefone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefone(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            id='outlined-basic'
            label='CPF'
            variant='outlined'
            size='small'
            value={cpf}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => SetCpf(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-end gap-1 py-4 text-bg'>
          <button
            onClick={handleAddInquilino}
            className='bg-azulc p-2 rounded-sm'>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  )
}
