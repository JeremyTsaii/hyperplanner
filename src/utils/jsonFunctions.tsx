import {
  campusDict,
  typeDict,
  CourseType,
  hyperToJson,
} from '../static/infoLists'
import WritIntens from '../static/writIntens.json'

/* eslint-disable-next-line */
function validate(course: any) {
  const validLength = Object.keys(course).length === 7
  const validTerm =
    course.term !== 'undefined' &&
    /((fall)|(spring)|(summer))[1-4]$/.test(course.term)
  const validTitle =
    course.title !== 'undefined' && typeof course.title === 'string'
  const validCode =
    course.code !== 'undefined' && typeof course.code === 'string'
  const validCredits =
    course.credits !== 'undefined' && typeof course.credits === 'number'
  const validType =
    course.type !== 'undefined' && Object.keys(typeDict).includes(course.type)
  const validCampus =
    course.campus !== 'undefined' &&
    Object.keys(campusDict).includes(course.campus)
  const validWrit =
    course.writ_inten !== 'undefined' && typeof course.writ_inten === 'boolean'
  return (
    validLength &&
    validTerm &&
    validTitle &&
    validCode &&
    validCredits &&
    validType &&
    validCampus &&
    validWrit
  )
}

const calculateTerm = (enrollYear: number, termStartDate: string): string => {
  const split = termStartDate.split('-')
  const year = parseInt(split[0], 10)
  const month = parseInt(split[1], 10)
  let sem
  if (month < 6) {
    sem = 'spring'
    return sem + (year - enrollYear).toString()
  }
  sem = 'fall'
  return sem + (year - enrollYear + 1).toString()
}

const checkWritInten = (code: string): boolean => {
  for (let i = 0; i < WritIntens.length; i += 1) {
    if (WritIntens[i].code === code) {
      return true
    }
  }
  return false
}

/* eslint-disable-next-line */
export const validJson = (jsonStr: string): [boolean, any] => {
  try {
    const json = JSON.parse(jsonStr)
    if (!Array.isArray(json) || json.length === 0) {
      return [false, null]
    }
    for (let i = 0; i < json.length; i += 1) {
      if (!validate(json[i])) {
        return [false, null]
      }
    }
    return [true, json]
  } catch {
    return [false, null]
  }
}

export const cleanHyper = (
  jsonStr: string,
  enrollYear: number,
  /* eslint-disable-next-line */
): [boolean, any] => {
  try {
    const json = JSON.parse(jsonStr)
    if (!Array.isArray(json) || json.length === 0) {
      return [false, null]
    }

    const term = calculateTerm(
      enrollYear,
      json[0].courseSchedule[0].scheduleStartDate,
    )

    const newJson = []
    for (let i = 0; i < json.length; i += 1) {
      const curCourse = json[i]
      if (curCourse.selected) {
        const courseEntry = {} as CourseType
        courseEntry.term = term
        courseEntry.title = curCourse.courseName
        courseEntry.credits = parseFloat(curCourse.courseCredits)
        courseEntry.campus =
          hyperToJson[curCourse.courseMutualExclusionKey[3].toLowerCase()]
        const subject = curCourse.courseMutualExclusionKey[0]
        const num = curCourse.courseMutualExclusionKey[1]
        courseEntry.code = subject + num.toString()
        courseEntry.writ_inten = checkWritInten(courseEntry.code)
        courseEntry.type = 'undecided'
        if (!validate(courseEntry)) {
          return [false, null]
        }
        newJson.push(courseEntry)
      }
    }
    return [true, newJson]
  } catch {
    return [false, null]
  }
}
