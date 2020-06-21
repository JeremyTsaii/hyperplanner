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
    color: '#FF0325',
    '&$activeIcon': {
      color: '#FF0325',
    },
    '&$completedIcon': {
      color: '#FF0325',
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
      borderColor: '#FF0325',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#FF0325',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector)

function getSteps(): string[] {
  return ['Freshman', 'Sophomore', 'Junior', 'Senior']
}

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
