import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'

import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import Friend from '../../components/Friend'
import { setPost } from '../../state'

export default function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const [isComments, setIsComments] = useState(false)

  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)

  const { palette } = useTheme()
  const primary = palette.primary.main
  const main = palette.neutral.main

  const isLiked = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length

  const patchLike = async () => {
    const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          src={`http://localhost:5000/assets/${picturePath}`}
          width='100%'
          height='auto'
          alt='Post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlinedIcon sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlinedIcon />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, index) => (
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}
