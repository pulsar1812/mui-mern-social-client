import { useSelector } from 'react-redux'
import { Box, useMediaQuery } from '@mui/material'

import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'

export default function Home() {
  const { _id, picturePath } = useSelector((state) => state.user)

  const isNonMobile = useMediaQuery('(min-width: 1000px)')

  return (
    <div>
      <Navbar />
      <Box
        display={isNonMobile ? 'flex' : 'block'}
        justifyContent='space-between'
        gap='0.5rem'
        width='100%'
        p='2rem 6%'
      >
        <Box flexBasis={isNonMobile ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobile ? '42%' : undefined}
          mt={isNonMobile ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} />
        </Box>
        {isNonMobile && <Box flexBasis='26%'></Box>}
      </Box>
    </div>
  )
}
