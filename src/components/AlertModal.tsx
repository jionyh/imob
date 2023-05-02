import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  confirmOpen: boolean
  setConfirmOpen: (open: boolean) => void
  message: string
  handleConfirm: () => void
  activeView: string
  action: string
}

export const AlertModal = ({ confirmOpen, setConfirmOpen, message, handleConfirm, action, activeView }: Props) => {
  return (
    <Dialog
      className='select-none'
      open={confirmOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle
        className='text-center'
        id='alert-dialog-title'>
        {'Confirmar exclusão!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className='text-center'
          id='alert-dialog-description'>
          <div className='mt-2'>
            Tem certeza que deseja {action} o {activeView}
          </div>
          <span className=' font-bold text-azule mt-1'> {message}</span>
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
          onClick={handleConfirm}
          autoFocus>
          Continuar
        </button>
      </DialogActions>
    </Dialog>
  )
}
