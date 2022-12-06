import { Box } from '@mui/material'

export default function UserImage({ image, size = '60px' }) {
  return (
    <Box width={size} height={size}>
      <img
        src={`http://localhost:5000/assets/${image}`}
        alt='User'
        width={size}
        height={size}
        style={{ objectFit: 'cover', borderRadius: '50%' }}
      />
    </Box>
  )
}
