import requests as req
import json


f_codigos_postais=open("./codigos_postais.csv","r")
all_info_cp = f_codigos_postais.read().split("\n")
localidades = []

cps=[]
for info in all_info_cp:
   cp,local = (info.split(",")[-3],info.split(",")[-1])
   if(cp not in cps):
      cps.append(cp)
      localidades.append({
         "cp":cp,
         "local":local
      })
      print(cp,local)