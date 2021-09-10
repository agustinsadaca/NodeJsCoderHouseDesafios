const fs = require('fs')

 class Carrito {
    constructor() {}
    async save(carritoItem) {
        let maxId = 0
        maxId = await fs.promises
            .readFile('./backend/carrito.json', 'utf-8')
            .then((data) => {
                const carrito = JSON.parse(data)
                if (Object.keys(carrito).length === 0) {
                    carritoItem['idCarrito'] = 1
                    maxId = 1
                } else {
                    carrito.map((carritoItem) =>
                        carritoItem['idCarrito'] > maxId
                            ? (maxId = carritoItem['idCarrito'])
                            : maxId,
                    )
                    maxId = ++maxId
                    carritoItem['idCarrito'] = maxId
                }
                carrito.push({'idCarrito':carritoItem['idCarrito'],'timestampCarrito':carritoItem['timestampCarrito'],
                producto:{'id':carritoItem.producto['id'],
                'timestamp': carritoItem.producto['timestamp'],
                'nombre': carritoItem.producto['nombre'],
                'descripcion': carritoItem.producto['descripcion'],
                'codigo': carritoItem.producto['codigo'],
                'foto': carritoItem.producto['foto'],
                'precio': carritoItem.producto['precio'],
                'stock': carritoItem.producto['stock']}})
                
                fs.writeFile(
                    './backend/carrito.json',
                    JSON.stringify(carrito, null, 2),
                    (error) => {
                        if (error) {
                            console.log(error)
                            throw new Error('Error: ' + error.message)
                        } else {
                            console.log('Creado con exito')
                           
                        }
                    },
                )
                return maxId
            })
            .catch((error) => console.log(error))
      
        
        return maxId
    }

    async getById(id) {
        let myObject = {}
        myObject = await fs.promises
            .readFile('./backend/carrito.json', 'utf-8')
            .then((data) => {
                const carrito = JSON.parse(data)
                carrito.map((producto) => {
                    producto['idCarrito'] == id ? (myObject = producto) : myObject
                })
                return myObject
            })
            .catch((error) => {return {error : 'producto no encontrado'}})
            
        return Object.keys(myObject).length === 0 ? {error : 'producto no encontrado'} : myObject
    }

    async getAll() {
        let myObject = {}
        myObject = await fs.promises
            .readFile('./backend/carrito.json', 'utf-8')
            .then((data) => {
                myObject = JSON.parse(data)
                return myObject
            })
        return myObject
    }

    async deleteById(id) {
        let listaSinElemento = await fs.promises
            .readFile('./backend/carrito.json', 'utf-8')
            .then((data) => {
                let myObject = []
                let idExist = false
                let carrito = JSON.parse(data)
                carrito.map((producto) =>
                    producto['idCarrito'] != id ? myObject.push(producto) : idExist = true,
                )
                if(idExist == false){throw new Error('No se ha encontrado producto con dicho ID')}
                fs.writeFile(
                    './backend/carrito.json',
                    JSON.stringify(myObject, null, 2),
                    (error) => {
                        if (error) {
                            console.log(error)
                            throw new Error('Error: ' + error.message)
                        }
                    },
                )
                return myObject
            })
            .catch((error) => console.log(error))
        
    }

    async deleteAll() {
        await fs.writeFile(
            './backend/carrito.json',
            '',
            (error) => {
                if (error) {
                    console.log(error)
                    throw new Error('Error: ' + error.message)
                }
            },
        )
    }
    async updateById(id,newObj){
        let objUpdated
        myObject = await fs.promises
            .readFile('./backend/carrito.json', 'utf-8')
            .then((data) => {
                const carrito = JSON.parse(data)
                carrito.map((producto) => {
                    producto['idCarrito'] == id ? (objUpdated = producto) : objUpdated
                })
                const {idCarrito,timestampCarrito, producto} = newObj
                const {id,timestamp, nombre, descripcion, codigo, foto, precio, stock} = producto
                const index = carrito.indexOf(objUpdated)
                objUpdated['idCarrito']=timestamp
                objUpdated['timestampCarrito']=timestamp
                objUpdated.producto['id']=timestamp
                objUpdated.producto['timestamp']=timestamp
                objUpdated.producto['nombre']=nombre
                objUpdated.producto['descripcion']=descripcion
                objUpdated.producto['codigo']=codigo
                objUpdated.producto['foto']=foto
                objUpdated.producto['precio']=precio
                objUpdated.producto['stock']=stock

                carrito[index]=(objUpdated)
                this.deleteAll()
                return carrito
            })
            .then((carrito)=>{
                fs.writeFile(
                    './backend/carrito.json',
                    JSON.stringify(carrito, null, 2),
                    (error) => {
                        if (error) {
                            console.log(error)
                            throw new Error('Error: ' + error.message)
                        }
                    },
                )
            })
            .catch((error) => {return {error : 'producto no encontrado'}})
            
        return Object.keys(myObject).length === 0 ? {error : 'producto no encontrado'} : myObject
    }
}

module.exports = {Carrito}