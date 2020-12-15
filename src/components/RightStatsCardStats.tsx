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
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0.5),
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
  isList: boolean
  isMajor?: boolean
  checklist?: { code: string; title: string }[]
  id?: string
  coreChecks?: string
  enroll?: number
  majorChecks?: string
  major?: string
}

const RightStatsCardStats = ({
  titleArr,
  valArr,
  isList,
  isMajor,
  checklist,
  id,
  coreChecks,
  enroll,
  majorChecks,
  major,
}: IProps): JSX.Element => {
  const classes = useStyles()

  const zip = (a1: string[], a2: number[]) => a1.map((x, i) => [x, a2[i]])

  // Stats instaed of checklist of requirements (graduation/humanities)
  if (!isList) {
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
  // Major checklist
  if (isMajor) {
    return (
      <div className={classes.reqStatSection}>
        {/* eslint-disable */}
        <RequirementsList
          isMajor
          reqs={checklist!}
          id={id!}
          majorChecks={majorChecks!}
          major={major!}
        />
        {/* eslint-enable */}
      </div>
    )
  }
  // Core checklist
  return (
    <div className={classes.reqStatSection}>
      {/* eslint-disable */}
      <RequirementsList
        isMajor={false}
        reqs={checklist!}
        id={id!}
        coreChecks={coreChecks!}
        enroll={enroll!}
      />
      {/* eslint-enable */}
    </div>
  )
}

RightStatsCardStats.defaultProps = {
  titleArr: [],
  valArr: [],
  isMajor: false,
  checklist: [],
  id: '',
  coreChecks: '',
  enroll: 0,
  majorChecks: '',
  major: '',
}

export default RightStatsCardStats
