import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import LeftInfoCard from './LeftInfoCard'
import RightStatsCard from './RightStatsCard'

// Page elevation constant
const ELEV = 12

const useStyles = makeStyles(() => ({
  container: {
    background: '#282c34',
    display: 'flex',
    flexWrap: 'nowrap',
  },
}))

function InfoCards(): JSX.Element {
  const classes = useStyles()

  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="center"
      alignItems="center">
      <LeftInfoCard
        firstName="Jeremy"
        schoolName="Harvey Mudd College"
        majorName="Computer Science"
        concName="Economics"
        gradYear={2022}
        ELEV={ELEV}
      />
      <RightStatsCard
        totalCredits={73.5}
        creditsRem={54.5}
        avgCredits={18.375}
        avgRem={13.5}
        ELEV={ELEV}
      />
    </Grid>
  )
}

export default InfoCards
