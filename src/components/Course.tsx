import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useMutation } from '@apollo/client'
import {
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import { INCREMENT_COURSE_EDITS_MUTATION } from '../utils/gqlQueries'
import { modifyChecklist } from '../utils/modalFunctions'
import EditModal from './EditModal'
/* eslint-disable */
import {
  useRemove_CourseMutation,
  useUpdate_Major_ChecksMutation,
  useUpdate_Core_ChecksMutation,
  Get_InfoDocument,
  Get_InfoQuery,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../generated/graphql'
/* eslint-enable */

// Color constants
const PINK = '#e91e63' // Major (Requirement)
const LPINK = '#f06292' // Major (Elective)
const BLUE = '#2196f3' // Hums (Depth)
const PURPLE = '#7c4dff' // Hums (Breadth)
const LPURPLE = '#ba68c8' // Hums (Elective)
const GREEN = '#26a69a' // Core
const ORANGE = '#ef5350' // Other (PE)

let theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
})
theme = responsiveFontSizes(theme)

const useStyles = makeStyles(() => ({
  codeText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  titleText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  creditText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  writText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  courseButton: {
    alignItems: 'flex-end',
  },
}))

const getCourseColor = (type: string): string => {
  if (type === 'major_req') {
    return PINK
  }
  if (type === 'major_elec') {
    return LPINK
  }
  if (type === 'hum_depth') {
    return PURPLE
  }
  if (type === 'hum_breadth') {
    return BLUE
  }
  if (type === 'hum_elec') {
    return LPURPLE
  }
  if (type === 'core_req') {
    return GREEN
  }
  return ORANGE
}

const createEditIcon = (
  code: string,
  title: string,
  credits: number,
  type: string,
  campus: string,
  writInten: boolean,
  term: string,
): JSX.Element => {
  return (
    <Grid item xs={1} zeroMinWidth>
      <EditModal
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

const createDeleteIcon = (handleDelete?: () => void): JSX.Element => {
  return (
    <Grid item xs={1} zeroMinWidth>
      <IconButton
        edge="end"
        aria-label="delete"
        size="small"
        onClick={handleDelete}>
        <DeleteForeverIcon />
      </IconButton>
    </Grid>
  )
}

interface courseProps {
  code: string
  title: string
  credits: number
  type: string
  campus: string
  writInten: boolean
  term: string
  showIcons: boolean
  majorChecks: string
  coreChecks: string
  school: string
  id: string
}

function Course({
  code,
  title,
  credits,
  type,
  campus,
  writInten,
  term,
  showIcons,
  majorChecks,
  coreChecks,
  school,
  id,
}: courseProps): JSX.Element {
  const classes = useStyles()

  const [courseRemove] = useRemove_CourseMutation()
  const [updateCourseEdits] = useMutation(INCREMENT_COURSE_EDITS_MUTATION)
  const [updateMajorChecks] = useUpdate_Major_ChecksMutation()
  const [updateCoreChecks] = useUpdate_Core_ChecksMutation()

  // Delete course on icon click
  const handleDelete = () => {
    // Update user course_edits column
    updateCourseEdits()

    // Remove course
    courseRemove({
      variables: { term, title },
      update(cache) {
        /* eslint-disable */
        const existingCourses = cache.readQuery<Get_CoursesQuery>({
          query: Get_CoursesDocument,
        })
        const newCourses = existingCourses!.courses.filter((course) => {
          return course.title !== title || course.term !== term
        })
        cache.writeQuery<Get_CoursesQuery>({
          query: Get_CoursesDocument,
          data: { courses: newCourses },
        })
        /* eslint-enable */
      },
      optimisticResponse: {
        __typename: 'mutation_root',
        delete_courses: {
          __typename: 'courses_mutation_response',
          affected_rows: 1,
        },
      },
    })

    // Update checklists
    const [newMajorChecks, newCoreChecks] = modifyChecklist(
      code,
      0,
      majorChecks,
      coreChecks,
      school,
    )

    updateMajorChecks({
      variables: {
        id,
        majorChecks: newMajorChecks,
      },
      update(cache) {
        /* eslint-disable */
        const existingInfo = cache.readQuery<Get_InfoQuery>({
          query: Get_InfoDocument,
        })
        const newInfo = { ...existingInfo!.users[0] }
        newInfo.majorChecks = newMajorChecks
        cache.writeQuery<Get_InfoQuery>({
          query: Get_InfoDocument,
          data: { users: [newInfo] },
        })
        /* eslint-enable */
      },
      optimisticResponse: {
        __typename: 'mutation_root',
        update_users: {
          __typename: 'users_mutation_response',
          affected_rows: 1,
          returning: [
            {
              __typename: 'users',
              majorChecks: newMajorChecks,
            },
          ],
        },
      },
    })

    updateCoreChecks({
      variables: {
        id,
        coreChecks: newCoreChecks,
      },
      update(cache) {
        /* eslint-disable */
        const existingInfo = cache.readQuery<Get_InfoQuery>({
          query: Get_InfoDocument,
        })
        const newInfo = { ...existingInfo!.users[0] }
        newInfo.coreChecks = newCoreChecks
        cache.writeQuery<Get_InfoQuery>({
          query: Get_InfoDocument,
          data: { users: [newInfo] },
        })
        /* eslint-enable */
      },
      optimisticResponse: {
        __typename: 'mutation_root',
        update_users: {
          __typename: 'users_mutation_response',
          affected_rows: 1,
          returning: [
            {
              __typename: 'users',
              coreChecks: newCoreChecks,
            },
          ],
        },
      },
    })
  }

  let editIconPlaceholder = <div />
  let deleteIconPlaceholder = createDeleteIcon()

  // If false, don't show icons (for logged out viewers)
  if (showIcons) {
    editIconPlaceholder = createEditIcon(
      code,
      title,
      credits,
      type,
      campus,
      writInten,
      term,
    )
    deleteIconPlaceholder = createDeleteIcon(handleDelete)
  }

  // Add M and/or W if Mudd hum/writing intensive course
  let placeholder = ''
  let titleLength = 6
  let codeLength = 1
  let placeholderGrid = (): JSX.Element => {
    return <div />
  }

  if (writInten) {
    placeholder = 'W'
    titleLength = 5
  }
  if (campus === 'hmc' && type.slice(0, 3) === 'hum') {
    if (placeholder) {
      placeholder += '|M'
      codeLength = 2
      titleLength = 4
    } else {
      placeholder = 'M'
      titleLength = 5
    }
  }
  if (placeholder) {
    placeholderGrid = (): JSX.Element => {
      return (
        <Grid item xs={codeLength as 1 | 2} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.writText} noWrap>
              <b>{placeholder}</b>
            </Typography>
          </MuiThemeProvider>
        </Grid>
      )
    }
  }
  return (
    <Paper
      style={{
        backgroundColor: getCourseColor(type),
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
      }}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{
          display: 'flex',
        }}
        xs={12}
        zeroMinWidth>
        <Grid item xs={3} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.codeText} noWrap>
              <b>{code}</b>
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={titleLength as 4 | 6} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.titleText} noWrap>
              {title}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        {placeholderGrid()}
        <Grid item xs={1} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.creditText} noWrap>
              {credits}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        {editIconPlaceholder}
        {deleteIconPlaceholder}
      </Grid>
    </Paper>
  )
}

export default Course
