import csv
import json

# Wanted keys
filter = set(["code", "title", "campus"])

# Open csv (filename) and output wanted code/title/campus into (outputname)
def scrape(filename, outputname):
  with open(filename, 'r', encoding='utf-8', errors="ignore") as f:
    reader = csv.reader(f, delimiter=',')
    data_list = list()
    for row in reader:
        data_list.append(row)

  data = [dict(zip(data_list[0],row)) for row in data_list]
  data.pop(0)
  filteredData = []
  for dic in data:
    # Skip lines where needed keys are missing
    if isEmpty(dic):
      continue
    newDic = {}
    for key in dic:
      if key in filter:
        # Some hacks to get past the crappy non-uniform data
        if key == "campus":
          newDic[key] = dic[key].lower()
          if newDic[key] == "cg":
            newDic[key] = "cgu"
          elif newDic[key] == "hm":
            newDic[key] = "hmc"
          elif newDic[key] == "cm":
            newDic[key] = "cmc"
        elif key == "code":
          segments = dic[key].split()
          finalCode = ''
          if len(segments) == 3:
            finalCode = segments[0] + segments[1]
          else:
            finalCode = segments[0]
          newDic[key] = finalCode
        else:
          newDic[key] = dic[key]
    newDic['credits'] = 3.0
    filteredData.append(newDic)

  with open(outputname, 'w', encoding='utf-8') as f:
    json.dump(filteredData, f, ensure_ascii=False, indent=4)

# Check all necessary keys are non-empty
def isEmpty(dic):
  for key in dic:
    if dic[key] == "" and key in filter:
      return True
  return False
  
