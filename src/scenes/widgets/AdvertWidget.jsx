import { Typography, useTheme } from '@mui/material'

import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

export default function AdvertWidget() {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant='h5' color={dark} fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src='http://localhost:5000/assets/info4.jpeg'
        alt='Advert'
        width='100%'
        height='auto'
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>Gene Dynamic</Typography>
        <Typography color={medium}>genedynamic.com</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
        mollitia, deleniti voluptas ut repellendus dignissimos?
      </Typography>
    </WidgetWrapper>
  )
}
