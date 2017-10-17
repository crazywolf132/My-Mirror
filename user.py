from os.path import expanduser
import sys

_shortName = str(sys.argv[1])
_email = str(sys.argv[2])
_mobile = str(sys.argv[3])
_name = str(sys.argv[4])

_start = 'module.exports = {'
_end = '}'
holder = []
amountOfUsers = 0

def main():
    _temp = []
    global holder
    global amountOfUsers
    with open("{0}/{1}/{2}".format(expanduser("~"), "Asher", "/users.js"), 'r') as _in:
        tempCounter = 0
        for line in _in:
            tempCounter += 1
            _temp.append(line)
        if tempCounter == 2:
            # This means there is no users...
            amountOfUsers = 0
        else:
            amountOfUsers = (tempCounter - 2) / 5

    if amountOfUsers == 1 or amountOfUsers == 0:
        noUsers(_shortName, _email, _mobile, _name)
    else:
        _counter = 1
        del _temp[0]
        _len = int(amountOfUsers)
        while _counter <= (_len):
            _counter += 1
            holder.append('{0}{1}{2}{3}{4}'.format(str(_temp[0]), str(_temp[1]), str(_temp[2]), str(_temp[3]), str(_temp[4]).strip('\n')))
            del _temp[0]
            del _temp[0]
            del _temp[0]
            del _temp[0]
            del _temp[0]
        _isUsers(_shortName, _email, _mobile, _name)

    with open('{0}/{1}/{2}'.format(expanduser("~"), "Asher", "/users.js"), 'w') as out:
        out.write('{0}'.format(_start))
        for item in holder:
            out.write(item)
        out.write('{0}'.format(_end))

def _isUsers(_shortName, _email, _mobile, _name):
    x = """\
  _shortName: {
    email: '_email',
    mobile: '_mobile',
    name: '_name',
  },""".replace('_shortName', _shortName)
    x = x.replace('_email', _email)
    x = x.replace('_mobile', _mobile)
    x = x.replace('_name', _name)
    holder.insert(0, x)

def noUsers(_shortName, _email, _mobile, _name):
    x = """\
  _shortName: {
    email: '_email',
    mobile: '_mobile',
    name: '_name',
  }""".replace('_shortName', _shortName)
    x = x.replace('_email', _email)
    x = x.replace('_mobile', _mobile)
    x = x.replace('_name', _name)
    holder.insert(0, x)

main()
