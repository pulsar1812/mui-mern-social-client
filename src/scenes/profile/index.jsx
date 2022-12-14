import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, useMediaQuery } from '@mui/material'

import FriendListWidget from '../widgets/FriendListWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import Navbar from '../navbar'

export default function Profile() {
  const [user, setUser] = useState(null)
  const { userId } = useParams()

  const token = useSelector((state) => state.token)

  const isNonMobile = useMediaQuery('(min-width: 1000px)')

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return null

  return (
    <Box>
      <Navbar />
      <Box
        display={isNonMobile ? 'flex' : 'block'}
        justifyContent='center'
        gap='2rem'
        width='100%'
        p='2rem 6%'
      >
        <Box flexBasis={isNonMobile ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobile ? '42%' : undefined}
          mt={isNonMobile ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}
