import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import LeftInfoCard from './LeftInfoCard'
import RightStatsCard from './RightStatsCard'
import { schoolDict, majorDict } from '../static/infoLists'
import { GET_INFO_QUERY } from '../utils/gqlQueries'

// Page elevation constant
const ELEV = 12

const useStyles = makeStyles(() => ({
  container: {
    background: '#282c34',
    display: 'flex',
    paddingRight: theme.spacing(14),
    paddingLeft: theme.spacing(14),
    alignItems: 'stretch',
    flexWrap: 'nowrap',
  },
}))

function InfoCards(): JSX.Element {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_INFO_QUERY)

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Error...</div>
  }

  const info = data.users[0]

  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="center"
      alignItems="center">
      <LeftInfoCard
        firstName={info.nickname}
        schoolName={schoolDict[info.school]}
        majorName={majorDict[info.major]}
        concName={info.concentration}
        gradYear={info.grad_year}
        id={info.auth0_id}
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
