import requests as req
import unidecode
from random import randint, choice
import json

f_homens = open("./random_names_homens.csv","r")
f_mulheres = open("./random_names_mulheres.csv","r")
homens = f_homens.read().split("\n")
mulheres = f_mulheres.read().split("\n")
ginasios = [
   '0cc5561e-cdb0-4ac0-982a-a9132997527a',
   'd81fdccd-e71c-46b1-bb8e-92b287777038',
   'ee99cc54-cb35-4a6a-bb57-76fd0fbb5a9a',
   'f255db3f-f47a-4657-9a51-9751ce6a1923'
]
'''
for nome in homens:

   response = req.request(
      "POST", 
      "http://localhost:8000/api/v1/admin/marca/alunos",
      json={
         "email": unidecode.unidecode(nome).replace(" ", "").lower() + "@gmail.com",
         "nome": nome,
         "password": "passwd",
         "dataNasc": str(randint(1942, 2010)) + '-' + str(randint(1, 12)) + '-' + str(randint(1, 31)),
         "dataEntrada": "2022-03-23",
         "genero":1,
         "ginasioId":choice(ginasios)
      }
   )'''
   
   

for nome in mulheres:

   response = req.request(
      "POST", 
      "http://localhost:8000/api/v1/admin/marca/alunos",
      json={
         "email": unidecode.unidecode(nome).replace(" ", "").lower() + "@gmail.com",
         "nome": nome,
         "password": "passwd",
         "dataNasc": str(randint(1942, 2010)) + '-' + str(randint(1, 12)) + '-' + str(randint(1, 31)),
         "dataEntrada": "2022-03-23",
         "genero":0,
         "ginasioId":choice(ginasios)
      }
   )