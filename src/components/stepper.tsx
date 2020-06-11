import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import { makeStyles, withStyles } from '@material-ui/core/styles'

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
    color: theme.palette.secondary.main,
    '&$activeIcon': {
      color: theme.palette.secondary.main,
    },
    '&$completedIcon': {
      color: theme.palette.secondary.main,
    },
  },
  activeIcon: {},
  completedIcon: {},
}))

// Make step label text red
const StyledStepLabel = withStyles({
  label: {
    color: '#f50057!important',
  },
})(StepLabel)

function getSteps(): string[] {
  return ['Freshman', 'Sophomore', 'Junior', 'Senior']
}

// Color connectors when completed
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
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
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector)

function YearStepper(): JSX.Element {
  const classes = useStyles()
  const [activeStep] = React.useState(2)
  const steps = getSteps()

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
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
