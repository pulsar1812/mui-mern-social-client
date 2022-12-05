import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'

import Form from './Form'

export default function Login() {
  const theme = useTheme()
  const isNonMobile = useMediaQuery('(min-width: 1000px)')

  const alt = theme.palette.background.alt

  return (
    <Box>
      <Box width='100%' background={alt} p='1rem 6%' textAlign='center'>
        <Typography color='primary' fontSize='32px' fontWeight='bold'>
          MERN Social
        </Typography>
      </Box>

      <Box
        backgroundColor={alt}
        width={isNonMobile ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
      >
        <Typography variant='h5' fontWeight='500' sx={{ mb: '1.5rem' }}>
          Welcome to the MERN Social Media
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}
