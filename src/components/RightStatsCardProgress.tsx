import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgressWithLabel from './CircularProgress'

const useStyles = makeStyles(() => ({
  progressSection: {
    display: 'flex',
    alignItems: 'center',
  },
}))

interface IProps {
  progressTitleArr: string[]
  progressValArr: number[]
}

const RightStatsCardProgress = ({
  progressTitleArr,
  progressValArr,
}: IProps): JSX.Element => {
  const classes = useStyles()

  const zip = (a1: string[], a2: number[]) => a1.map((x, i) => [x, a2[i]])
  const zippedProgress = zip(progressTitleArr, progressValArr)

  return (
    <div className={classes.progressSection}>
      {zippedProgress.map((pair: Array<string | number>, i) => (
        <CircularProgressWithLabel
          // eslint-disable-next-line
          key={(pair[0] as string) + i + pair[1]}
          val={pair[1] as number}
          title={pair[0] as string}
        />
      ))}
    </div>
  )
}

export default RightStatsCardProgress
