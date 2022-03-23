import requests as req
import unidecode
from random import randint, choice
import json

f_homens = open("./random_names_homens.csv","r")
f_mulheres = open("./random_names_mulheres.csv","r")
homens = f_homens.read().split("\n")
mulheres = f_mulheres.read().split("\n")
ginasios = [
   '20aa9589-c11a-455e-9b9f-5fa7b6796aaa',
   '367b9339-69ec-46f9-a111-a1b90c72654b',
   '83117d9b-7565-4977-98a6-1d44429e9893',
   '9a848598-ac47-47ef-9dc2-524b7901477e'
]

for nome in homens:

   response = req.request(
      "POST", 
      "http://localhost:8000/api/v1/admin/marca/alunos/registar",
      json={
         "email": unidecode.unidecode(nome).replace(" ", "").lower() + "@gmail.com",
         "nome": nome,
         "password": "passwd",
         "data_nasc": str(randint(1942, 2010)) + '-' + str(randint(1, 12)) + '-' + str(randint(1, 31)),
         "data_entrada": "2022-03-23",
         "genero":1,
         "ginasio_id":choice(ginasios)
      }
   )

for nome in mulheres:

   response = req.request(
      "POST", 
      "http://localhost:8000/api/v1/admin/marca/alunos/registar",
      json={
         "email": unidecode.unidecode(nome).replace(" ", "").lower() + "@gmail.com",
         "nome": nome,
         "password": "passwd",
         "data_nasc": str(randint(1942, 2010)) + '-' + str(randint(1, 12)) + '-' + str(randint(1, 31)),
         "data_entrada": "2022-03-23",
         "genero":0,
         "ginasio_id":choice(ginasios)
      }
   )