import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import EditModal from './EditModal'
/* eslint-disable */
import {
  useRemove_CourseMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../generated/graphql'
/* eslint-enable */

// Constant used for field spacing
const SPACING = 3

// Color constants
const PINK = '#e91e63' // Major (Requirement)
const LPINK = '#f06292' // Major (Elective)
const BLUE = '#2196f3' // Hums (Depth)
const PURPLE = '#7c4dff' // Hums (Breadth)
const LPURPLE = '#ba68c8' // Hums (Elective)
const GREEN = '#26a69a' // Core
const ORANGE = '#ef5350' // Other (PE)

interface courseProps {
  code: string
  title: string
  credits: number
  type: string
  campus: string
  writInten: boolean
  term: string
}

let theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
})
theme = responsiveFontSizes(theme)

const useStyles = makeStyles(() => ({
  codeText: {
    color: '#FFFFFF',
  },
  titleText: {
    color: '#FFFFFF',
  },
  creditText: {
    color: '#FFFFFF',
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
    return BLUE
  }
  if (type === 'hum_breadth') {
    return PURPLE
  }
  if (type === 'hum_elec') {
    return LPURPLE
  }
  if (type === 'core_req') {
    return GREEN
  }
  return ORANGE
}

function Course({
  code,
  title,
  credits,
  type,
  campus,
  writInten,
  term,
}: courseProps): JSX.Element {
  const classes = useStyles()

  const [courseRemove] = useRemove_CourseMutation()

  // Delete course on icon click
  const handleDelete = () => {
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
  }

  return (
    <Paper style={{ backgroundColor: getCourseColor(type), margin: 5 }}>
      <Grid container alignItems="center" justify="flex-start">
        <Grid item xs={SPACING} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.codeText} noWrap>
              {code}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={5} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.titleText} noWrap>
              {title}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={1} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.creditText} noWrap>
              {credits}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item>
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
        <Grid item>
          <IconButton
            edge="end"
            aria-label="delete"
            size="small"
            onClick={handleDelete}>
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Course
