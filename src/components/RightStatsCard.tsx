import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles((theme) => ({
  statsCard: {
    background: '#23252e',
    height: theme.spacing(25),

    flexGrow: 4,
    flexDirection: 'row',
    display: 'flex',
    boxSizing: 'border-box',
    marginLeft: theme.spacing(1),
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      marginTop: theme.spacing(3),
    },
  },
  header: {
    color: '#fff',
    fontSize: '25px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  personalStats: {
    color: '#fff',
    fontSize: '17px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  reqButtonSection: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    width: '300px',
    margin: '0px',
    paddingTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
    },
  },
  reqStatSection: {
    display: 'flex',
    flexFlow: 'column wrap',
    maxWidth: '400px',
    width: '400px',
    margin: '0px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '250px',
    },
  },
  statButton: {
    marginBottom: theme.spacing(0.5),
    height: theme.spacing(4),
    textAlign: 'left',
    color: 'white',
  },
}))

interface statsProps {
  totalCredits: number
  creditsRem: number
  avgCredits: number
  avgRem: number
  ELEV: number
}

function RightStatsCard({
  totalCredits,
  creditsRem,
  avgCredits,
  avgRem,
  ELEV,
}: statsProps): JSX.Element {
  const classes = useStyles()
  const [value, setValue] = React.useState('grad')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  return (
    <Grid item>
      <Paper elevation={ELEV} className={classes.statsCard}>
        <div className={classes.reqStatSection}>
          <Typography className={classes.personalStats}>
            <b>Total Credits:</b> {totalCredits}
          </Typography>
          <Typography className={classes.personalStats}>
            <b>Credits Remaining:</b> {creditsRem}
          </Typography>
          <Typography className={classes.personalStats}>
            <b>Average Credits per Semester:</b> {avgCredits}
          </Typography>
          <Typography className={classes.personalStats}>
            <b>Remaining Average Credits:</b> {avgRem}
          </Typography>
        </div>
        <div className={classes.reqButtonSection}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="req"
              name="req1"
              value={value}
              onChange={handleChange}>
              <FormControlLabel
                value="grad"
                control={<Radio />}
                label="Graduation"
                className={classes.statButton}
              />
              <FormControlLabel
                value="major"
                control={<Radio />}
                label="Major"
                className={classes.statButton}
              />
              <FormControlLabel
                value="core"
                control={<Radio />}
                label="Core"
                className={classes.statButton}
              />
              <FormControlLabel
                value="humanities"
                control={<Radio />}
                label="Humanities"
                className={classes.statButton}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </Paper>
    </Grid>
  )
}

export default RightStatsCard
