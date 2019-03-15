import socket
import sys
from chat import respondeServer

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('127.0.0.1', 5000)
print('starting up on %s port %s' % server_address)
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)

while 42:
    print('waiting for a connection')
    connection, client_address = sock.accept()

    try:
        print('connection from', client_address)

        while True:
            data = connection.recv(16)
            print('received "%s"' % data)
            if data:
                print('sending data back to the client')
                msg = respondeServer()
                print(msg)
                connection.sendall(bytes(msg,"utf-8"))
            else:
                print('no more data from', client_address)
                break

    finally:
        # Clean up the connection
        connection.close()
        print('bye')
