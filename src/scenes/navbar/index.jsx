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
import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from '@mui/icons-material'

import { setMode, logout } from '../../state'
import FlexBetween from '../../components/FlexBetween'

export default function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const theme = useTheme()
  const isNonMobile = useMediaQuery('(min-width: 1000px)')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const primaryLight = theme.palette.primary.light
  const background = theme.palette.background.default
  const alt = theme.palette.background.alt

  // const fullName = `${user.firstName} ${user.lastName}`
  const fullName = 'P Lee'

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
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop Nav */}
      {isNonMobile ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />
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
          <Menu />
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
              <Close />
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
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />
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
