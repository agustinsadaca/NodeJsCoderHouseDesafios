#HerokuConfig
git subtree push --prefix "Proyecto Final 4°"  heroku master
heroku logs --tail 
# NodeJsCoderHouseDesafios

Dominio:http://coderhousecommerce1.herokuapp.com/
usuarios ejemplo: 
-No admin: agustin2@gmail.com pass 1234
-Admin: admin@gmail.com pass 1234

## imagenes (para usuarios y productos)
- POST /api/images: 
ejemplo: body-form(seleccione archivo) -> devuelve link imagen

## usuarios
- POST /api/users: registra un nuevo usuario:

ej body - json:
{
    "email": "agustin2@gmail.com",
    "password": "1234",
    "name": "agus",
    "lastname": "fritscsh",
    "phone": "+541144441234",
    "image":"http://coderhousecommerce1.herokuapp.com/api/images/1665174757239-space-galaxy-vertical-portrait-display-wallpaper-preview.jpg"
}
## autenticacion
- POST /login: autentica a un usuario devuelve jwt
ej body - json:
{
    "email": "agustin2@gmail.com",
    "password": "1234"
}
Authentication: Auth - bearer 

## productos
Authentication: Auth - bearer 
- GET /api/products: devuelve todos los productos (requiere JWT)
- GET /api/products/{id}: devuelve un producto segun id (requiere JWT)
- POST /api/products: crea un producto (REQUIERE JWT de usuario admin)
 {
    "name": "Pencil",
    "description": "Pencil",
    "image": "https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Pencil-512.png",
    "price": 1500
 }
- PUT /api/products/{id}: actualiza un producto segun su id (REQUIERE JWT de usuario admin)
ej body - json:
{
    "name": "test1",
    "description": "Producto test",
    "price": 130,
    "image": "{{IMAGE_URL_3}}"
}
- DELETE /api/products/{id}: borra un producto segun su id (REQUIERE JWT de usuario admin)

[ el nombre de usuario del admin se puede HARDCODEAR en el archivo config ]

## carritos

- GET /api/shoppingcartproducts: devuelve los productos de un carrito (solo usuarios registrados) (requiere JWT)
- POST /api/shoppingcartproducts: agrega producto al carrito segun su id (solo usuarios registrados) (requiere JWT)
ejemplo
{
    "productId": "76e0157c93ed4b7fb9754c876c323a1c"
}
- DELETE /api/shoppingcartproducts/{id}: quita un producto de un carrito (solo usuarios registrados)

## ordenes
- POST /api/orders: crea una nueva orden (compra todo el contenido de un carrito y lo vacía envia mail, solo usuarios registrados) (requiere JWT)
- GET /api/orders: devuelve todas las ordenes de un usuario (solo usuarios registrados) (requiere JWT)

