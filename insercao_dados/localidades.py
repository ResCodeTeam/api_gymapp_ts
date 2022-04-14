import uuid
import requests as req
import json
import psycopg2
from configparser import ConfigParser


f_codigos_postais=open("./codigos_postais.csv","r")

localidades = []
localidades_ext = []

cps=[]

def inserir_localidades(limite=1000):
   all_info_cp = f_codigos_postais.read().split("\n")[:-limite]
   for info in all_info_cp:
      cp,local = (info.split(",")[-3],info.split(",")[3])
      
      all_info = info.split(",")[3:-1]
      #print(all_info[2:-3])
      string=''
      for i in all_info[2:-3]:
         if len(i) > 0 and not 'Impares' in i and not 'Pares' in i:
            string = string + i + ' '

      
      localidades.append({
         "uuid":f"{uuid.uuid1()}",
         "local":local,
         "rua":string.strip(),
         "cp":cp,
         "cpExt":all_info[-1]
      })
      
   for localidade in localidades:
      response = req.request(
         "POST", 
         "http://localhost:8000/api/v1/backend/cp",
         json={
            "cp":int(localidade['cp']),
            "cpExt":int(localidade['cpExt']),
            "rua":localidade['rua'],
            "localidade":localidade['local']
         }
      )
      

