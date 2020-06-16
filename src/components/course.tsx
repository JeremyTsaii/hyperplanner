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
  credits: number
  color: string
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

function Course({ code, title, credits, color }: courseProps): JSX.Element {
  const classes = useStyles()

  return (
    <Paper style={{ backgroundColor: color, margin: 5 }}>
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
        <Grid item justify="flex-end">
          <IconButton edge="end" aria-label="edit" size="small">
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item justify="flex-end">
          <IconButton edge="end" aria-label="delete" size="small">
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Course
