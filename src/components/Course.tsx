import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import EditModal from './EditModal'

// Constant used for field spacing in course component
const SPACING = 3

// Color constants
const PINK = '#e91e63' // Major (Requirement)
const LPINK = '#f06292' // Major (Elective)
const BLUE = '#2196f3' // Hums (Depth)
const PURPLE = '#7c4dff' // Hums (Breadth)
const LPURPLE = '#ba68c8' // Hums (Elective)
const GREEN = '#26a69a' // Core
const ORANGE = '#ef5350' // Other (PE)

interface courseProps {
  code: string
  title: string
  credits: number
  type: string
  campus: string
  writInten: boolean
}

const useStyles = makeStyles(() => ({
  text: {
    color: '#FFFFFF',
  },
}))

let theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
})
theme = responsiveFontSizes(theme)

const getCourseColor = (type: string): string => {
  if (type === 'major_req') {
    return PINK
  }
  if (type === 'major_elec') {
    return LPINK
  }
  if (type === 'hum_depth') {
    return BLUE
  }
  if (type === 'hum_breadth') {
    return PURPLE
  }
  if (type === 'hum_elec') {
    return LPURPLE
  }
  if (type === 'core_req') {
    return GREEN
  }
  return ORANGE
}

function Course({
  code,
  title,
  credits,
  type,
  campus,
  writInten,
}: courseProps): JSX.Element {
  const classes = useStyles()

  return (
    <Paper style={{ backgroundColor: getCourseColor(type), margin: 5 }}>
      <Grid container alignItems="center" justify="flex-start">
        <Grid item xs={SPACING} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.text} noWrap>
              {code}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={SPACING} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.text} noWrap>
              {title}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={SPACING} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="subtitle1" className={classes.text} noWrap>
              Credits: {credits}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item>
          <EditModal
            codeProp={code}
            titleProp={title}
            creditsProp={credits}
            typeProp={type}
            campusProp={campus}
            writIntenProp={writInten}
          />
        </Grid>
        <Grid item>
          <IconButton edge="end" aria-label="delete" size="small">
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Course
