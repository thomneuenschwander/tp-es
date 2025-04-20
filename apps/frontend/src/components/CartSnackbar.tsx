import { Snackbar, Alert, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type CartSnackbarProps = {
  open: boolean
  onClose: () => void
  itemName: string
  onUndo?: () => void
}

const CartSnackbar = ({ open, onClose, itemName, onUndo }: CartSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        sx={{ width: '100%' }}
        action={
          <>
            {onUndo && (
              <Button color="inherit" size="small" onClick={onUndo}>
                Desfazer
              </Button>
            )}
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        {itemName} adicionad{itemName.endsWith('a') ? 'a' : 'o'} ao carrinho!
      </Alert>
    </Snackbar>
  )
}

export default CartSnackbar
