import socket
from os.path import expanduser


s = socket.socket()

path = "{0}/{1}".format(expanduser("~"), "Asher")
helper = 'helper.info'

print("> Host: " + str('localhost') + " Port: " + str(4416))

try:
    s.bind(('localhost', 4416))
except socket.error as msg:
    print("> Bind failed. Error Code : " + str(msg[0]) + " Message " + msg[1])
    exit()

print("> Socket bind complete.")

_ls = [] ## For debugging only.

s.listen(5)
print("> Socket now listening")
while True:
    c, addr = s.accept()

    data = c.recv(1024)
    ## These strip everything from the message.
    _in = data.strip("\x00")
    _in = _in.strip("\x06")
    _in = _in.strip("\t")
    _in = _in.strip("\x08")
    _in = _in.strip("\x0e")
    _in = _in.strip("\n")
    _in = _in.strip("\x0c")

    ### STATUS
    print("GOT - " + _in)

    with open('{0}/{1}'.format(path, helper), 'a') as out:
        out.write('{0}$${1}$${2}'.format(_in,'false','Brayden'))
