import socket
HOST = '127.0.0.1'              # Endereco IP do Servidor
PORT = 5000            # Porta que o Servidor esta
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
orig = (HOST, PORT)
tcp.bind(orig)
tcp.listen(1)
print('Connection open')
while 42:
    con, cliente = tcp.accept()
    print('CONECTADO: {0}'.format(cliente))
    while 42:
        msg = con.recv(1024)
        if not msg:
            break
        print(cliente, msg)
        con.send(msg)
    print('finalizado {0}'.format(cliente))
    con.close()
