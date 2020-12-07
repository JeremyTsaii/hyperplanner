import requests as r
import json

def get_courses():
  response = r.get('https://hyperschedule.herokuapp.com/api/v3/courses?school=hmc')
  data = list(response.json()['data']['courses'].items())
  return data

def process_data(data):
  output = []
  seen = set()
  for entry in data:
    info = entry[1]
    codeSegments = info['courseCode'].split(' ')
    schoolName = get_name(info)

    outputEntry = {}
    outputEntry['campus'] = schoolName
    outputEntry['code'] = codeSegments[0] + codeSegments[1]
    outputEntry['credits'] = float(info['courseCredits'])
    outputEntry['title'] = info['courseName']
    if outputEntry['code'] not in seen:
      output.append(outputEntry)
      seen.add(outputEntry['code'])

  output.sort(key=lambda x: x['code'] + x['title'])
  return output

def get_name(info):
  name = info['courseSchedule'][0]['scheduleLocation'].split(' ')[0].lower()

  possible = convert_name(name)
  if possible:
    return possible
  
  possible2 = convert_name(info['courseMutualExclusionKey'][-1].lower())
  if possible2:
    return possible2

  if 'k' in name:
    return 'kgi'
  else:
    return 'cgu'

def convert_name(name):
  if name == 'hm':
    return 'hmc'
  elif name == 'cm':
    return 'cmc'
  elif name == 'pz':
    return 'pz'
  elif name == 'sc':
    return 'sc'
  elif name == 'po':
    return 'po'
  else:
    return None

def write_to_file(data, filename):
  with open(filename, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

def clear_duplicates(filename):
  with open(filename, 'r+', encoding='utf-8') as f:
    seen = {}
    output = []
    data = json.load(f)
    for i in range(len(data)):
      code = data[i]['code']
      if code not in seen:
        output.append(data[i])
        seen[code] = len(output) - 1
      else:
        if output[seen[code]]['campus'] == "cgu":
          output[seen[code]]['campus'] = data[i]['campus']
    write_to_file(output, "test.json")

def scrape():
  data = get_courses()
  processedData = process_data(data)
  write_to_file(processedData)
  return processedData