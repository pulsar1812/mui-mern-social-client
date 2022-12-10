import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'

import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import { setFriends } from '../state'

export default function Friend({ friendId, name, subtitle, userPicturePath }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ posts: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0)
          }}
        >
          <Typography
            variant='h5'
            color={main}
            fontWeight='500'
            sx={{
              '&:hover': {
                color: primaryLight,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlinedIcon sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlinedIcon sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}
