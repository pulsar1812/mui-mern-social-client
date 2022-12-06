import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Divider, Typography, useTheme } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'

import UserImage from '../../components/UserImage'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

export default function UserWidget({ userId, picturePath }) {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const token = useSelector((state) => state.token)

  const { palette } = useTheme()
  const main = palette.neutral.main
  const medium = palette.neutral.medium
  const dark = palette.neutral.dark
  const light = palette.primary.light

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

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewdProfile,
    impressions,
    friends,
  } = user

  return (
    <WidgetWrapper>
      {/* First Row */}
      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                '&:hover': {
                  color: light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlinedIcon />
      </FlexBetween>

      <Divider />

      {/* Second Row */}
      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
          <LocationOnOutlinedIcon fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem'>
          <WorkOutlineOutlinedIcon fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      {/* Third Row */}
      <Box p='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>Who viewed your profile</Typography>
          <Typography color={medium} fontWeight='500'>
            {viewdProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={medium} fontWeight='500'>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      {/* Fourth Row */}
      <Box p='1rem 0'>
        <Typography fontSize='1rem' fontWeight='500' color={main} mb='1rem'>
          Social Profiles
        </Typography>

        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='Twitter' />
            <Box>
              <Typography fontWeight='500' color={main}>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlinedIcon sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap='1rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='LinkedIn' />
            <Box>
              <Typography fontWeight='500' color={main}>
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlinedIcon sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}
