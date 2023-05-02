import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { RxArrowLeft } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { api } from '../helpers/api'
import { InputPhone } from '../components/Inputs/Phone'

export const CadInquilino = () => {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, SetCpf] = useState('')

  const [errors, setErrors] = useState<string[]>([])

  const handleAddInquilino = async () => {
    let err = []
    if (nome !== '' && cpf !== '' && telefone.length > 9) {
      await api.addInquilino(nome, cpf, telefone)
      setErrors([])
      await api.addInquilino(nome, cpf, telefone)
      alert('Inquilino Cadastrado')
      navigate(-1)
    } else {
      if (nome == '') err.push('nome')
      if (cpf == '') err.push('cpf')
      if (telefone.length <= 9) err.push('telefone')
      setErrors(err)
      alert('Você precisa preencher os campos em vermelho!')
    }
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
            error={errors.includes('nome')}
            id='outlined-basic'
            label='Nome'
            variant='outlined'
            size='small'
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <InputPhone
            tel={telefone}
            setTel={setTelefone}
            fullWidth={true}
            error={errors.includes('telefone')}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            error={errors.includes('cpf')}
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
