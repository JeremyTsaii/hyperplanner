import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { GET_INFO_QUERY } from '../utils/gqlQueries'

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
    color: '#f50057',
    '&$activeIcon': {
      color: '#f50057',
    },
    '&$completedIcon': {
      color: '#f50057',
    },
  },
  activeIcon: {},
  completedIcon: {},
}))

// Make step label text red
const StyledStepLabel = withStyles({
  label: {
    color: 'white!important',
  },
})(StepLabel)

// Color connectors when completed
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 12,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#f50057',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#f50057',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector)

function YearStepper(): JSX.Element {
  const classes = useStyles()

  const calculateYear = (gradYear: number): number => {
    const date = new Date()
    const month = date.getMonth()
    const year = date.getFullYear()
    let monthWeight = 0
    // Year cutoff at June
    if (month < 5) {
      monthWeight = 1
    }
    return 4 - (gradYear - year) - monthWeight
  }
  const steps = ['Freshman', 'Sophomore', 'Junior', 'Senior']

  const { loading, error, data } = useQuery(GET_INFO_QUERY)

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
                    active: classes.activeIcon,
                    completed: classes.completedIcon,
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
                    active: classes.activeIcon,
                    completed: classes.completedIcon,
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

  const gradYear = data.users[0].grad_year

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={calculateYear(gradYear)}
        alternativeLabel
        connector={<QontoConnector />}
        className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StyledStepLabel
              StepIconProps={{
                classes: {
                  root: classes.icon,
                  active: classes.activeIcon,
                  completed: classes.completedIcon,
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
