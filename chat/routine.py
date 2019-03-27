from pymongo import MongoClient
import csv

try:
    cliente = MongoClient('localhost', 27017)
    banco = cliente.dbMorales
    print('Connected with Mongo')
except:
    print(Exception('Error connection BD'))

tb_data = banco.data
with open('userData.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            line_count += 1
        else:
            _id = tb_data.insert_one({"texto": row[0],
                                      "classificacao": row[1]}).inserted_id
            print(_id)

            line_count += 1
    print(f'Saved {line_count} lines.')

# tb_data = banco.data
# for l in _data:
#     _id = tb_data.insert_one({l}).inserted_id
#     print(_id + "Save with success")
