import requests as req
from localidades import inserir_localidades
from alunos import populate_man,populate_woman
import json

#registar localidades
#inserir_localidades()
'''req.request(
    "POST", 
    "http://localhost:8000/api/v1/backend/funcoes",
    json={
        "nome":"Aluno",
    }
)
req.request(
    "POST", 
    "http://localhost:8000/api/v1/backend/funcoes",
    json={
        "nome":"Administrador",
    }
)
req.request(
    "POST", 
    "http://localhost:8000/api/v1/backend/funcoes",
    json={
        "nome":"Treinador",
    }
)


#registar admin
admin_resp = req.request(
    "POST", 
    "http://localhost:8000/api/v1/admin/registo",
    json={
        "email":"admin@admin.com",
        "nome":"admin",
        "password":"admin",
        "dataNasc":"2002-04-09",
        "dataEntrada":"2022-03-23",
        "genero":0
    }
)
print(admin_resp)
admin_resp=json.loads(admin_resp)
admin_uid = admin_resp['admin']['uid']'''
admin_uid="332b256d-d646-4877-8a4f-f5538472e0d4"
#registar marcas
# marca com mobilidade
'''body={"nome": "VO1","mobilidade": True,"cor": "Vermelho","logotipo": "teste"}

marca1_resp = req.request(
    "POST", 
    f"http://localhost:8000/api/v1/admin/{admin_uid}/marca/",
    json=body
)

marca1_resp=marca1_resp.json()
print(marca1_resp)
marca1_uid = marca1_resp['marca']['marca_id']


# marca com mobilidade
body={"nome": "VO2","mobilidade": False,"cor": "Vermelho","logotipo": "teste"}
marca2_resp = req.request(
    "POST", 
    f"http://localhost:8000/api/v1/admin/{admin_uid}/marca/",
    json=body
)
marca2_resp=marca2_resp.json()

marca2_uid = marca2_resp['marca']['marca_id']




#registar ginasios
gym_uid=[]
link = ''
for i in range(1,5):
    if (i % 2) != 0:
        link = f'http://localhost:8000/api/v1/admin/marca/{marca1_uid}/ginasio'
    else:
        link = f'http://localhost:8000/api/v1/admin/marca/{marca2_uid}/ginasio'
        
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
    gym_resp=gym_resp.json()
    
    gym_uid.append(gym_resp['ginasio']['ginasio_id'])
'''
#registar treinador
marca1_uid = 'd9017634-c824-423d-96a3-6da7f162917a'
marca2_uid = 'f34fdd41-8670-4b50-9311-ebdb0ad993c4'
'''treinador_resp = req.request(
    "POST", 
    f"http://localhost:8000/api/v1/admin/marca/{marca2_uid}/treinadores",
    json={
        "email":"treinador@treinador.com",
        "nome":"treinador",
        "password":"treinador",
        "dataNasc":"2002-04-09",
        "dataEntrada":"2022-03-23",
        "genero":0
    }
)

treinador_resp = req.request(
    "POST", 
    f"http://localhost:8000/api/v1/admin/marca/{marca1_uid}/treinadores",
    json={
        "email":"treinador2@treinador.com",
        "nome":"treinador2",
        "password":"treinador",
        "dataNasc":"2002-04-09",
        "dataEntrada":"2022-03-23",
        "genero":0
    }
)
'''

#registar alunos
'''populate_man(ginasios=gym_uid)
populate_woman(ginasios=gym_uid)'''


