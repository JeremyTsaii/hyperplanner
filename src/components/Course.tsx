import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'

// Constant used for field spacing in course component
const SPACING = 3

interface courseProps {
  code: string
  title: string
  credit: number
  color: string
}

let theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
})
theme = responsiveFontSizes(theme)

const useStyles = makeStyles(() => ({
  codeText: {
    color: '#FFFFFF',
  },
  titleText: {
    color: '#FFFFFF',
  },
  creditText: {
    color: '#FFFFFF',
  },
  courseButton: {
    alignItems: 'flex-end',
  },
}))

function Course({ code, title, credit, color }: courseProps): JSX.Element {
  const classes = useStyles()

  return (
    <Paper style={{ backgroundColor: color, margin: 5 }}>
      <Grid container alignItems="center" justify="flex-start">
        <Grid item xs={SPACING} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.codeText} noWrap>
              {code}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={5} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.titleText} noWrap>
              {title}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={1} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.creditText} noWrap>
              {credit}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item className={classes.courseButton}>
          <IconButton edge="end" aria-label="edit" size="small">
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item className={classes.courseButton}>
          <IconButton edge="end" aria-label="delete" size="small">
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Course
