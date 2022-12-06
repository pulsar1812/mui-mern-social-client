import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import HelpIcon from '@mui/icons-material/Help'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import MessageIcon from '@mui/icons-material/Message'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'

import { setMode, logout } from '../../state'
import FlexBetween from '../../components/FlexBetween'

export default function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const primaryLight = theme.palette.primary.light
  const background = theme.palette.background.default
  const alt = theme.palette.background.alt

  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexBetween p='1rem 6%' backgroundColor={alt}>
      <FlexBetween gap='1.75rem'>
        <Typography
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          fontWeight='bold'
          color='primary'
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          MERN Social
        </Typography>
        {isNonMobile && (
          <FlexBetween
            backgroundColor={neutralLight}
            gap='3rem'
            p='0.1rem 1.5rem'
            borderRadius='9px'
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop Nav */}
      {isNonMobile ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeIcon sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeIcon sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <MessageIcon sx={{ fontSize: '25px' }} />
          <NotificationsIcon sx={{ fontSize: '25px' }} />
          <HelpIcon sx={{ fontSize: '25px' }} />
          <FormControl variant='standard' value={fullName}>
            <Select
              value={fullName}
              sx={{
                width: '150px',
                backgroundColor: neutralLight,
                p: '0.25rem 1rem',
                borderRadius: '0.25rem',
                '& .MuiSvgIcon-root:': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Nav */}
      {!isNonMobile && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
          zIndex='10'
        >
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <FlexBetween
            display='flex'
            flexDirection='column'
            gap='3rem'
            justifyContent='center'
            alignItems='center'
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeIcon sx={{ fontSize: '25px' }} />
              ) : (
                <LightModeIcon sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <MessageIcon sx={{ fontSize: '25px' }} />
            <NotificationsIcon sx={{ fontSize: '25px' }} />
            <HelpIcon sx={{ fontSize: '25px' }} />
            <FormControl variant='standard' value={fullName}>
              <Select
                value={fullName}
                sx={{
                  width: '150px',
                  backgroundColor: neutralLight,
                  p: '0.25rem 1rem',
                  borderRadius: '0.25rem',
                  '& .MuiSvgIcon-root:': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}
