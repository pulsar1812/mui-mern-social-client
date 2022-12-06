import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Formik } from 'formik'
import * as yup from 'yup'
import Dropzone from 'react-dropzone'

import { login } from '../../state'
import FlexBetween from '../../components/FlexBetween'

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  lastName: yup
    .string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
  location: yup.string().required('Required'),
  occupation: yup.string().required('Required'),
  picture: yup.string().required('Required'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
})

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
}

const initialValuesLogin = {
  email: '',
  password: '',
}

export default function Form() {
  const [pageType, setPageType] = useState('login')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isNonMobile = useMediaQuery('(min-width: 600px)')
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const primaryLight = theme.palette.primary.light
  const medium = theme.palette.neutral.medium
  const alt = theme.palette.background.alt

  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  const handleRegister = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)

    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      body: formData,
    })
    const savedUser = await response.json()

    onSubmitProps.resetForm()

    if (savedUser) {
      setPageType('login')
    }
  }

  const handleLogin = async (values, onSubmitProps) => {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const data = await response.json()

    onSubmitProps.resetForm()

    if (data) {
      dispatch(
        login({
          user: data.user,
          token: data.token,
        })
      )

      navigate('/home')
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await handleLogin(values, onSubmitProps)
    if (isRegister) await handleRegister(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label='First Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstName'
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label='Last Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name='lastName'
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label='Location'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name='location'
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label='Occupation'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name='occupation'
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn='span 4'
                  border={`1px solid ${medium}`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptedFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${primary}`}
                        p='1rem'
                        sx={{
                          '&:hover': { cursor: 'pointer' },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label='Password'
              type='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                backgroundColor: primary,
                color: alt,
                '&:hover': { color: primary },
                p: '1rem',
                m: '2rem 0',
              }}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login')
                resetForm()
              }}
              sx={{
                color: primary,
                textDecoration: 'underline',
                '&:hover': {
                  color: primaryLight,
                  cursor: 'pointer',
                },
              }}
            >
              {isLogin
                ? 'Do not have an account? Sign up here.'
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}
