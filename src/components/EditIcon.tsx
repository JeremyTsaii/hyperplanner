import React from 'react'
import Grid from '@material-ui/core/Grid'
import EditModal from './EditModal'

interface editProps {
  functional: boolean
  code: string
  title: string
  credits: number
  type: string
  campus: string
  writInten: boolean
  term: string
}

function EditIcon({
  functional,
  code,
  title,
  credits,
  type,
  campus,
  writInten,
  term,
}: editProps): JSX.Element {
  return (
    <Grid item xs={1} zeroMinWidth>
      <EditModal
        functional={functional}
        codeProp={code}
        titleProp={title}
        creditsProp={credits}
        typeProp={type}
        campusProp={campus}
        writIntenProp={writInten}
        termProp={term}
      />
    </Grid>
  )
}

export default EditIcon
