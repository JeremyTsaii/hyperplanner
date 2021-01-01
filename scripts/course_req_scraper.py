# Get course code strings from the raw courses json
import json


def getCodeString(dept, keyword):
  # Load courses from json file
    with open('../src/static/allCourses.json') as f:
        courses = json.load(f)
    f.close()

    results = ''

    for course in courses:
        curCode = course['code'].upper()
        curTitle = course['title'].lower()
        curSchool = course['campus'].lower()
        if dept in curCode and keyword in curTitle and curSchool != "cgu":
            results += curCode + '/'

    return results[:-1] if results else ''
