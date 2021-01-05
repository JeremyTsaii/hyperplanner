import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { CoursesContext } from '../../context/CoursesContext'
import { StatsContext } from '../../context/StatsContext'
/* eslint-disable */
import {
  useAdd_Multiple_CoursesMutation,
  useRemove_All_CoursesMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../../generated/graphql'
/* eslint-enable */
import UploadButton from './UploadButton'
import { validJson, getCoursesFromJson } from '../../utils/jsonFunctions'
import { CourseType, courseSort } from '../../static/infoLists'

const useStyles = makeStyles(() => ({
  instructions: {
    color: '#f50057',
  },
  link: {
    color: '#2196f3',
    '&:hover': {
      color: '#673ab7',
    },
  },
}))

function ImportTranscript(): JSX.Element {
  const classes = useStyles()

  const { data } = useContext(UserContext)
  const { data: coursesData } = useContext(CoursesContext)
  const statsData = useContext(StatsContext)

  const [addMultipleCourses] = useAdd_Multiple_CoursesMutation()
  const [removeAllCourses] = useRemove_All_CoursesMutation()

  const [status, setStatus] = useState('Upload')

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* eslint-disable-next-line */
    const file = event.target.files![0]

    // User cancelled upload
    if (file === undefined) {
      return
    }
    setStatus(`Uploading ${file.name}...`)

    // Make sure file size not too large
    const FILE_SIZE_LIMIT = 1600000
    if (file.size > FILE_SIZE_LIMIT) {
      setStatus(`File Size Too Large!`)
      return
    }

    // Uniquely identify user's uploaded file
    const id = data.users[0].auth0_id.split('|')[1]
    const jobId = `${id}.pdf`
    const AWS_URL = process.env.REACT_APP_AWS_URL
    const AWS_API_KEY = process.env.REACT_APP_AWS_API_KEY

    // Get presigned url
    axios
      .get(`${AWS_URL}fileName=${jobId}&getJson=false`, {
        headers: {
          'x-api-key': AWS_API_KEY,
        },
      })
      .then((response) => {
        const UPLOAD_URL = response.data
        const options = {
          headers: {
            'Content-Type': 'application/pdf',
          },
        }

        // Send file to presigned url
        axios
          .put(UPLOAD_URL, file, options)
          .then(() => {
            setStatus('Extracting Text from PDF...')

            // Get json when ready
            // For now, send request after 2 mins
            // Later, implement SQS polling
            const jsonFile = `${id}.json`
            setTimeout(() => {
              axios
                .get(`${AWS_URL}fileName=${jsonFile}&getJson=true`, {
                  headers: {
                    'x-api-key': AWS_API_KEY,
                  },
                })
                .then((response2) => {
                  const foundStatus = response2.data.status
                  if (foundStatus === 'found') {
                    const coursesJson = response2.data.data
                    const courses = getCoursesFromJson(
                      coursesJson,
                      statsData,
                      data.users[0],
                    )
                    const [isValid, result] = validJson(JSON.stringify(courses))
                    if (isValid) {
                      setStatus('Successfully Imported')

                      // Append __typename to each course for cache update
                      const courses2 = result.map((course: CourseType) => ({
                        ...course,
                        __typename: 'courses',
                      }))
                      const sortedCourses = courses2.sort(courseSort)

                      // Delete current courses
                      removeAllCourses({
                        update(cache) {
                          /* eslint-disable */
                          cache.writeQuery<Get_CoursesQuery>({
                            query: Get_CoursesDocument,
                            data: { courses: [] },
                          })
                          /* eslint-enable */
                        },
                        optimisticResponse: {
                          __typename: 'mutation_root',
                          delete_courses: {
                            __typename: 'courses_mutation_response',
                            affected_rows: coursesData.courses.length,
                          },
                        },
                      })

                      // Write courses from transcript
                      addMultipleCourses({
                        variables: {
                          objects: result,
                        },
                        update(cache) {
                          /* eslint-disable */
                          cache.writeQuery<Get_CoursesQuery>({
                            query: Get_CoursesDocument,
                            data: { courses: sortedCourses },
                          })
                          /* eslint-disable */
                        },
                        optimisticResponse: {
                          __typename: 'mutation_root',
                          insert_courses: {
                            __typename: 'courses_mutation_response',
                            affected_rows: sortedCourses.length,
                            returning: sortedCourses,
                          },
                        },
                      })
                    } else {
                      // Error decoding json
                      setStatus('Error Decoding Json')
                    }
                  } else {
                    // Error getting courses json
                    setStatus('Error Getting Courses Json')
                  }
                })
                .catch(() => {
                  // Error getting courses json
                  setStatus('Error Getting Courses Json')
                })
            }, 120000)
          })
          .catch(() => {
            // Error uploading pdf
            setStatus('Error Uploading PDF')
          })
      })
      .catch(() => {
        // Error fetching presigned url
        setStatus('Error Fetching Presiged Url')
      })
  }

  return (
    <div className={classes.instructions}>
      <div>
        <p>Instructions:</p>
        <p>
          - Go to{' '}
          <a
            className={classes.link}
            href="https://portal.hmc.edu/ICS/"
            target="_blank"
            rel="noreferrer">
            Portal
          </a>
          , log in, and click the &quot;<b>Transcripts</b>&quot; tab
        </p>
        <p>
          - Click &quot;<b>View Unofficial Transcript</b>&quot;. This linear
          view provides better text extraction than the normal side-by-side
          transcript.
        </p>
        <p>
          - Click the print button in the top right corner and select &quot;
          <b>Save as PDF</b>&quot;
        </p>
        <p>
          - <b>Upload</b> the PDF below&#013;
        </p>
        <p>
          - Don&apos;t worry, uploading is required for transcript text
          extraction but all files are <b>deleted</b> after extraction has
          completed
        </p>
        <p>
          - <b>Note:</b> text extraction is not fully accurate/complete. You
          will need to add/edit course information by clicking the pencil icon
          on the course. However, this should save you lots of manual entry
          time!
        </p>
      </div>
      <UploadButton text={status} onChange={handleUpload} />
      <p>
        <b>
          After uploading, please wait ~2 minutes for the extraction to complete
          and don&apos;t click away.
        </b>
      </p>
    </div>
  )
}

export default ImportTranscript
