import socket
import sys
from chatbot import Chat

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
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
            data = connection.recv(147)
            if str(data) != "tchau":
                pgt = str(data)
                msg = chat.respondeServer(pgt)
                print('received "%s"' % data)
                if data:
                    print('sending data back to the client')
                    connection.sendall(bytes(msg, "utf-8"))
            else:
                print('no more data from', client_address)
                print('Mr. Morales: Até logo')
                break

    finally:
        # Clean up the connection
        connection.close()
        print('bye')
