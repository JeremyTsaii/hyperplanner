import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

interface IProps {
  title: string
  val: number
}

const CircularProgressWithLabel = ({ title, val }: IProps): JSX.Element => {
  return (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="static"
          thickness={5.0}
          size={90}
          value={val}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Typography
            variant="caption"
            component="div"
            color="secondary">{`${Math.round(val)}%`}</Typography>
        </Box>
      </Box>
      <div style={{ color: 'white' }}>{title}</div>
    </div>
  )
}

export default CircularProgressWithLabel
