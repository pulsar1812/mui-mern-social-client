import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import MicOutlinedIcon from '@mui/icons-material/MicOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import Dropzone from 'react-dropzone'

import FlexBetween from './FlexBetween'
import UserImage from './UserImage'
import WidgetWrapper from './WidgetWrapper'
import { setPosts } from '../state'

export default function MyPostWidget({ picturePath }) {
  const [image, setImage] = useState(null)
  const [post, setPost] = useState('')
  const [isImage, setIsImage] = useState(false)

  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const { palette } = useTheme()
  const primary = palette.primary.main
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium
  const light = palette.neutral.light
  const alt = palette.background.alt

  const handlePost = async () => {
    const formData = new FormData()
    formData.append('userId', _id)
    formData.append('description', post)
    if (image) {
      formData.append('picture', image)
      formData.append('picturePath', image.name)
    }

    const response = await fetch(`http://localhost:5000/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setPost('')
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder='What is on your mind...'
          sx={{
            width: '100%',
            backgroundColor: light,
            borderRadius: '2rem',
            p: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles='.jpg,.jpeg,.png'
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width='100%'
                  border={`2px dashed ${primary}`}
                  p='1rem'
                  sx={{
                    '&:hover': { cursor: 'pointer' },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlinedIcon />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
          <ImageOutlinedIcon sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { color: medium, cursor: 'pointer' } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobile ? (
          <>
            <FlexBetween gap='0.25rem'>
              <GifBoxOutlinedIcon sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap='0.25rem'>
              <AttachFileOutlinedIcon sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap='0.25rem'>
              <MicOutlinedIcon sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap='0.25rem'>
              <MoreHorizOutlinedIcon sx={{ color: mediumMain }} />
            </FlexBetween>
          </>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: alt,
            backgroundColor: primary,
            borderRadius: '3rem',
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}
