import React, { useContext } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { UserContext } from '../../context/UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    backgroundColor: 'transparent',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    // Override icon color
    color: theme.palette.primary.main,
    '&$activeIcon': {
      color: theme.palette.primary.main,
    },
    '&$completedIcon': {
      color: theme.palette.primary.main,
    },
  },
}))

// Make step label text red
const StyledStepLabel = withStyles({
  label: {
    color: 'white!important',
  },
})(StepLabel)

// Color connectors when completed
const QontoConnector = withStyles(
  (theme) => ({
    alternativeLabel: {
      top: 12,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: theme.palette.primary.main,
      },
    },
    completed: {
      '& $line': {
        borderColor: theme.palette.primary.main,
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 2,
      borderRadius: 1,
    },
  }),
  { withTheme: true },
)(StepConnector)

const calculateYear = (enrollYear: number): number => {
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  let monthWeight = 0
  // Year cutoff at June
  if (month < 5) {
    monthWeight = 1
  }
  return year - enrollYear - monthWeight
}

function YearStepper(): JSX.Element {
  const classes = useStyles()

  const steps = ['Freshman', 'Sophomore', 'Junior', 'Senior']

  const { loading, error, data } = useContext(UserContext)

  if (loading) {
    return (
      <div className={classes.root}>
        <Stepper
          activeStep={0}
          alternativeLabel
          connector={<QontoConnector />}
          className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StyledStepLabel
                StepIconProps={{
                  classes: {
                    root: classes.icon,
                  },
                }}>
                {label}
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    )
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Stepper
          activeStep={2}
          alternativeLabel
          connector={<QontoConnector />}
          className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StyledStepLabel
                StepIconProps={{
                  classes: {
                    root: classes.icon,
                  },
                }}>
                {label}
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    )
  }

  const enrollYear = data.users[0].enroll

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={calculateYear(enrollYear)}
        alternativeLabel
        connector={<QontoConnector />}
        className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StyledStepLabel
              StepIconProps={{
                classes: {
                  root: classes.icon,
                },
              }}>
              {label}
            </StyledStepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default YearStepper
