Test api productos

POST 
url: localhost:8080/api/productos/
body: {
    "timestamp": 1631072864163,
    "nombre": "globo terraqueo",
    "descripcion": "elemento geografico",
    "codigo": 1515,
    "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "precio": 14,
    "stock": 14,
    "admin":true
  }
  
PUT 
url eg: localhost:8080/api/productos/2
body: {
  "timestamp": 1631072864163,
  "nombre": "globo terraqueo",
  "descripcion": "elemento geografico",
  "codigo": 1515,
  "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  "precio": 14,
  "stock": 14,
  "admin":true
  
  DELETE
  url eg: localhost:8080/api/productos/2
  
  Carrito
  GET
  url: localhost:8080/api/carritos/
