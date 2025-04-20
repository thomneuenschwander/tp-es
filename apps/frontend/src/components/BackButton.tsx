import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
    >
      Voltar
    </Button>
  )
}

export default BackButton
