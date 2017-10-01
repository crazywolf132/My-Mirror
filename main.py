import sys
fileName = './config/default.js'
data = []
holder = {}
def main():
    toChange = str(sys.argv[1])
    global data
    global holder
    holdLines = []
    with open(fileName, 'r') as _in:
        for line in _in:
            holdLines.append(line.strip())
    del holdLines[0]
    del holdLines[0]
    _counter = 0
    for item in holdLines:
        _counter += 1
        if _counter <= 6:
            tokens = item.split(': ')
            tokens[1] = tokens[1].strip(',\n')
            holder[str(tokens[0])] = str(tokens[1])
            data.append(tokens[0])

    change(toChange)
    rewrite()
    tell(toChange)

def change(toChange):
    holdMe = holder[str(toChange)]
    if holdMe == 'false':
        holder[str(toChange)] = 'true'
        print('true')
    elif holdMe == 'true':
        holder[str(toChange)] = 'false'
        print('false')

def tell(toChange):
    print(holder[str(toChange)])

def rewrite():
    result = """\
module.exports = {
  display: {
    time: {0},
    compliment: {1},
    temp: {2},
    news: {3},
    date: {4},
    rain: {5}
  }
}
""".replace('{0}', str(holder[data[0]]))
    result = result.replace('{1}', str(holder[data[1]]))
    result = result.replace('{2}', str(holder[data[2]]))
    result = result.replace('{3}', str(holder[data[3]]))
    result = result.replace('{4}', str(holder[data[4]]))
    result = result.replace('{5}', str(holder[data[5]]))
    #.format(str(holder[data[0]]), str(holder[data[1]]), str(holder[data[2]]), str(holder[data[3]]), str(holder[data[4]]), str(holder[data[5]]))
    with open(fileName, 'w') as out:
        out.write(result)
main()
