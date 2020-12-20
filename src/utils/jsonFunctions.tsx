import { campusDict, typeDict } from '../static/infoLists'

/* eslint-disable-next-line */
export const validJson = (jsonStr: string): [boolean, any] => {
  try {
    let result = true
    const json = JSON.parse(jsonStr)
    if (!Array.isArray(json) || json.length === 0) {
      return [false, null]
    }
    json.forEach(function validate(course) {
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
        course.type !== 'undefined' &&
        Object.keys(typeDict).includes(course.type)
      const validCampus =
        course.campus !== 'undefined' &&
        Object.keys(campusDict).includes(course.campus)
      const validWrit =
        course.writ_inten !== 'undefined' &&
        typeof course.writ_inten === 'boolean'
      if (
        !(
          validLength &&
          validTerm &&
          validTitle &&
          validCode &&
          validCredits &&
          validType &&
          validCampus &&
          validWrit
        )
      ) {
        result = false
      }
    })
    return [result, json]
  } catch {
    return [false, null]
  }
}
