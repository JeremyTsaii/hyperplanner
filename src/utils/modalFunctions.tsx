import Requirements from '../static/requirements.json'
import { majors } from '../static/infoLists'

// Look through major/core courses list and set to 0 (un-checked) or 1 (checked) if code matches
export const modifyChecklist = (
  code: string,
  value: number,
  majorChecks: string,
  coreChecks: string,
  school: string,
): string[] => {
  const majorJson = JSON.parse(majorChecks)
  const coreJson = JSON.parse(coreChecks)

  const schoolKey = school as keyof typeof Requirements
  // Loop through major courses
  majors.forEach((m) => {
    const mKey = m.value as keyof typeof Requirements[typeof schoolKey]['major']
    const majorArr = Requirements[schoolKey].major[mKey].major_req
    const jsonKey = m.value as keyof typeof majorJson

    for (let i = 0; i < majorArr.length; i += 1) {
      if (majorArr[i].code === code && majorJson[jsonKey][i] !== value) {
        majorJson[jsonKey][i] = value
        break
      }
    }
  })

  // Loop through core courses
  const preKey = 'pre' as keyof typeof Requirements[typeof schoolKey]['core']
  const preArr = Requirements[schoolKey].core[preKey].courses
  const preJsonKey = 'pre' as keyof typeof coreJson
  const postKey = 'post' as keyof typeof Requirements[typeof schoolKey]['core']
  const postArr = Requirements[schoolKey].core[postKey].courses
  const postJsonKey = 'post' as keyof typeof coreJson

  for (let i = 0; i < preArr.length; i += 1) {
    if (preArr[i].code === code && coreJson[preJsonKey][i] !== value) {
      coreJson[preJsonKey][i] = value
      break
    }
  }
  for (let i = 0; i < postArr.length; i += 1) {
    if (postArr[i].code === code && coreJson[postJsonKey][i] !== value) {
      coreJson[postJsonKey][i] = value
      break
    }
  }

  const newMajorChecks = JSON.stringify(majorJson)
  const newCoreChecks = JSON.stringify(coreJson)
  return [newMajorChecks, newCoreChecks]
}
