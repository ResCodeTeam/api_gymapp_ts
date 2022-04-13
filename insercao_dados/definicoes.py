import requests as req
import unidecode
from random import randint, choice
import json

ids=[]

response = req.request(
    "GET", 
    "http://localhost:8000/api/v1/allId",
)

print(response.json())
for uid in response.json()['users']:
  uid = uid['uid']
  response = req.request(
    "POST", 
    f"http://localhost:8000/api/v1/{uid}/def",
)