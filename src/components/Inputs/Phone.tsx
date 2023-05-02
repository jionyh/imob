import * as React from 'react'
import { IMaskInput } from 'react-imask'
import TextField from '@mui/material/TextField'

type Props = {
  disabled?: boolean
  tel: string
  setTel: (item: string) => void
  error?: boolean
  fullWidth?: boolean
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask='(##) 00000-00000'
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

interface State {
  textmask: string
}

export const InputPhone = ({ disabled, tel, setTel, error, fullWidth }: Props) => {
  const [telefone, setTelefone] = React.useState<State>({
    textmask: tel,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone({
      ...telefone,
      textmask: event.target.value,
    })
  }

  React.useEffect(() => {
    setTel(telefone.textmask.replace('(', '').replace(')', '').replace(' ', '').replace('-', ''))
  }, [telefone])

  return (
    <div>
      <TextField
        size='small'
        label='Telefone'
        disabled={disabled}
        fullWidth={fullWidth}
        error={error}
        value={telefone.textmask}
        onChange={handleChange}
        variant='outlined'
        name='textmask'
        id='formatted-numberformat-input'
        InputProps={{
          inputComponent: TextMaskCustom as any,
        }}
      />
    </div>
  )
}
