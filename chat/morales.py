import socket
import sys
from ast import literal_eval as make_tuple
from miles import Chat

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

server_address = ('127.0.0.1', 5000)
print('starting up on %s port %s' % server_address)
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)
try:
    chat = Chat()
except:
    Exception('error on init Chat')

while 42:
    print('waiting for a connection')
    print("Mr. Morales: Olá, quais são as suas dúvidas? Pode contar comigo, o seu amigo da vizinhança")
    connection, client_address = sock.accept()

    try:
        print('connection from', client_address)

        while 42:
            data = connection.recv(280)  # limite de caracter
            msg = chat.respondeServer(data)
            print('received "%s"' % data)
            if data:
                print('sending data back to the client')
                connection.sendall(bytes(msg, "utf-8"))
            else:
                print('no more data from', client_address)
                break

    finally:
        # Clean up the connection
        connection.close()
        print('bye')
