import json

def courseFilter():
    # Load courses from json file
    with open('../src/static/coursesRaw.json') as f:
        courses = json.load(f)
    f.close()

    # Sort by course code
    courses.sort(key=lambda x: (x['code'] + x['title']))

    filteredCourses = []
    c = (0, 0, 0, 0)
    newC = (0, 0, 0, 0)

    for course in courses:
        # Read next course
        newC = (course['code'], course['title'], course['campus'], course['credits'])
        if newC[0] == c[0] and newC[1] == c[1] and newC[2] == 'hmc':
            # If course duplicate, keep the HMC course
            
            c = newC
        elif (newC[0] != c[0] or newC[1] != c[1]) and c[0] != 0:
            # If newC is a new, valid course, add new course to fildterCourses
            if not any(i.islower() for i in str(c[0])):
                newCourse = {'code': c[0], 'title': c[1], 'campus': c[2], 'credits': c[3]}
                filteredCourses.append(newCourse)
            c = newC
        elif c[0] == 0:
            c = newC

    # Add in the last course if valid
    if not any(i.islower() for i in str(c[0])):
        newCourse = {'code': c[0], 'title': c[1], 'campus': c[2], 'credits': c[3]}
        filteredCourses.append(newCourse)

    # Write update allCourses.json with the filtered courses
    newJson = open('../src/static/allCourses.json', 'w')
    json.dump(filteredCourses, newJson, indent=2)
    

if __name__ == "__main__":
    courseFilter()