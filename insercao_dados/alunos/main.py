import requests as req
import unidecode
from random import randint, choice
import json

f_homens = open("./random_names_homens.csv","r")
f_mulheres = open("./random_names_mulheres.csv","r")
homens = f_homens.read().split("\n")
mulheres = f_mulheres.read().split("\n")
ginasios = [
   '18a0db23-e5b3-44b9-b140-68982e6be4d7',
   '566ffbaa-73ae-4cbd-b666-fe3af0d5c4a3',
   '84c0582b-940c-4059-9138-25e2d6a00101',
   '88c86854-e440-4e73-b856-1ae3ee042577'
]

for nome in homens:

   response = req.request(
      "POST", 
      "http://localhost:8000/api/v1/admin/marca/alunos/registar",
      json={
         "email": unidecode.unidecode(nome).replace(" ", "").lower() + "@gmail.com",
         "nome": nome,
         "password": "passwd",
         "dataNasc": str(randint(1942, 2010)) + '-' + str(randint(1, 12)) + '-' + str(randint(1, 31)),
         "dataEntrada": "2022-03-23",
         "genero":1,
         "ginasioId":choice(ginasios)
      }
   )
   print({
         "email": unidecode.unidecode(nome).replace(" ", "").lower() + "@gmail.com",
         "nome": nome,
         "password": "passwd",
         "data_nasc": str(randint(1942, 2010)) + '-' + str(randint(1, 12)) + '-' + str(randint(1, 31)),
         "data_entrada": "2022-03-23",
         "genero":1,
         "ginasio_id":choice(ginasios)
      })
   
   

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