import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RequirementsList from './RequirementsList'

const useStyles = makeStyles((theme) => ({
  personalStats: {
    color: '#fff',
    fontSize: '17px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  reqStatSection: {
    display: 'flex',
    flexFlow: 'column',
    overflowY: 'scroll',
    height: '100%',
    maxWidth: '500px',
    width: '500px',
    margin: '0px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '250px',
    },
  },
  checklist: {
    color: 'white',
    textAlign: 'left',
    alignItems: 'left',
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}))

interface IProps {
  titleArr?: string[]
  valArr?: number[]
  list: boolean
  checklist?: { code: string; title: string }[]
}

const RightStatsCardStats = ({
  titleArr,
  valArr,
  list,
  checklist,
}: IProps): JSX.Element => {
  const classes = useStyles()

  const zip = (a1: string[], a2: number[]) => a1.map((x, i) => [x, a2[i]])

  if (!list) {
    // Stats
    // eslint-disable-next-line
    const zippedStats = zip(titleArr!, valArr!)

    return (
      <div className={classes.reqStatSection}>
        {zippedStats.map((pair: Array<string | number>, i) => (
          <Typography
            className={classes.personalStats}
            // eslint-disable-next-line
            key={(pair[0] as string) + i + pair[1]}>
            <b>{pair[0]}</b> {pair[1]}
          </Typography>
        ))}
      </div>
    )
  }
  // Checklist
  return (
    <div className={classes.reqStatSection}>
      {/* eslint-disable-next-line */}
      <RequirementsList reqs={checklist!} />
    </div>
  )
}

export default RightStatsCardStats
