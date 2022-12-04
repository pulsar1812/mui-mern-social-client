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
import { EditOutlined } from '@mui/icons-material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Dropzone from 'react-dropzone'

import { login } from '../../state'
import FlexBetween from '../../components/FlexBetween'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
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

  const theme = useTheme()
  const isNonMobile = useMediaQuery('(min-width: 600px)')

  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  const handleSubmit = async (values, onSubmitProps) => {}

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    ></Formik>
  )
}
