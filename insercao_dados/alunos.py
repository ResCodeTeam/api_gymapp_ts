import requests as req
import unidecode
from random import randint, choice
import json

f_homens = open("./random_names_homens.csv","r")
f_mulheres = open("./random_names_mulheres.csv","r")
homens = f_homens.read().split("\n")
mulheres = f_mulheres.read().split("\n")


def populate_man(ginasios):
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
      )
   
   
def populate_woman(ginasios):
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
