import requests as req
from localidades import inserir_localidades
from alunos import populate_man,populate_woman
import json

#registar localidades
inserir_localidades()

#registar admin
admin_resp = req.request(
    "POST", 
    "localhost:8000/api/v1/admin/registo",
    json={
        "email":"admin@admin.com",
        "nome":"admin",
        "password":"admin",
        "data_nasc":"2002-04-09",
        "data_entrada":"2022-03-23",
        "genero":0
    }
)

admin_resp=json.loads(admin_resp)
admin_uid = admin_resp['admin']['uid']

#registar marcas
# marca com mobilidade
body='{"nome": "VO1","mobilidade": true,"cor": "Vermelho","logotipo": "2"}'
marca1_resp = req.request(
    "POST", 
    f"localhost:8000/api/v1/admin/{admin_uid}/marca/",
    json=body
)
marca1_resp=json.loads(marca1_resp)
marca1_uid = marca1_resp['marca']['marca_id']


# marca com mobilidade
body='{"nome": "VO2","mobilidade": false,"cor": "Vermelho","logotipo": "2"}'
marca2_resp = req.request(
    "POST", 
    f"localhost:8000/api/v1/admin/{admin_uid}/marca/",
    json=body
)
marca2_resp=json.loads(marca2_resp)
marca2_uid = marca2_resp['marca']['marca_id']


#registar ginasios
gym_uid=[]
link = ''
for i in range(1,5):
    if (i % 2) != 0:
        link = f'localhost:8000/api/v1/admin/marca/{marca1_uid}/ginasio'
    else:
        link = f'localhost:8000/api/v1/admin/marca/{marca2_uid}/ginasio'
        
    gym_resp = req.request(
        "POST", 
        link,
        json={
            "nome": f"Ginásio {i}",
            "rua": "Rua das Castanhas",
            "cp": 3750,
            "imagem_url": "3",
            "lat":"0",
            "long":"0",
            "cpExt":791
        }
    )
    gym_resp=json.loads(gym_resp)
    gym_uid.append(gym_resp['marca']['marca_id'])

#registar alunos
populate_man(ginasios=gym_uid)
populate_woman(ginasios=gym_uid)