# NodeJsCoderHouseDesafios

https://coderhousecommerce1.herokuapp.com/api/productos

POST 

body:
{
    "timestamp": 1631072864163,
    "nombre": "regla",
    "descripcion": "elemento de medicion",
    "codigo": 1515,
    "foto": "https://cdn1.iconfinder.com/data/icons/education-filled-outline-8/64/Education-Filled_2-512.png",
    "precio": 17,
    "stock": 18
}

GET  
https://coderhousecommerce1.herokuapp.com/api/productos/:id individuales
o
https://coderhousecommerce1.herokuapp.com/api/productos todos

PUT:
https://coderhousecommerce1.herokuapp.com/api/productos/:idproducto

DELETE:
https://coderhousecommerce1.herokuapp.com/api/productos/:idproducto

-------------------

https://coderhousecommerce1.herokuapp.com/api/carrito

POST 

body:
{
		"timestampCarrito":1631072864163,
		"producto":{
			"timestamp": 1631072864163,
			"nombre": "reg",
			"descripcion": "descripcion",
			"codigo": "codigo",
			"foto": "foto",
			"precio": 20,
			"stock": 30
	}}

GET  
https://coderhousecommerce1.herokuapp.com/api/carrito/:id individuales
o
https://coderhousecommerce1.herokuapp.com/api/carrito todos

PUT:
https://coderhousecommerce1.herokuapp.com/api/carrito/:idcarrito

DELETE:
https://coderhousecommerce1.herokuapp.com/api/carrito/:idcarrito


