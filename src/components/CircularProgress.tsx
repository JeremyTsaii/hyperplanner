import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  progress: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  bottom: {
    color: '#0C0D11',
    position: 'relative',
  },
  top: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    left: 0,
  },
  progressText: {
    fontSize: theme.spacing(1.5),
  },
}))

interface IProps {
  title: string
  val: number
}

const CircularProgressWithLabel = ({ title, val }: IProps): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.progress}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="static"
          className={classes.bottom}
          size={80}
          thickness={5}
          value={100}
        />
        <CircularProgress
          variant="static"
          disableShrink
          className={classes.top}
          thickness={5.0}
          size={80}
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
      <div className={classes.progressText} style={{ color: 'white' }}>
        {title}
      </div>
    </div>
  )
}

export default CircularProgressWithLabel
