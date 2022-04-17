const fs = require('fs')

class Contenedor {
    constructor() {}
    async save(producto) {
        let maxId = 0
        maxId = await fs.promises
            .readFile('./productos.txt', 'utf-8')
            .then((data) => {
                const listadoProductos = JSON.parse(data)
                if (Object.keys(listadoProductos).length === 0) {
                    producto['id'] = 1
                    maxId = 1
                } else {
                    listadoProductos.map((producto) =>
                        producto['id'] > maxId
                            ? (maxId = producto['id'])
                            : maxId,
                    )
                    maxId = ++maxId
                    producto['id'] = maxId
                }
                listadoProductos.push(producto)
                fs.writeFile(
                    './productos.txt',
                    JSON.stringify(listadoProductos, null, 2),
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
            .readFile('./productos.txt', 'utf-8')
            .then((data) => {
                const listadoProductos = JSON.parse(data)
                listadoProductos.map((producto) => {
                    producto['id'] == id ? (myObject = producto) : myObject
                })
                return myObject
            })
            .catch((error) => console.log(error))
            
        return Object.keys(myObject).length === 0 ? null : myObject
    }

    async getAll() {
        let myObject = {}
        myObject = await fs.promises
            .readFile('./productos.txt', 'utf-8')
            .then((data) => {
                myObject = JSON.parse(data)
                return myObject
            })
        return myObject
    }

    async deleteById(id) {
        let listaSinElemento = await fs.promises
            .readFile('./productos.txt', 'utf-8')
            .then((data) => {
                let myObject = []
                let idExist = false
                let listadoProductos = JSON.parse(data)
                listadoProductos.map((producto) =>
                    producto['id'] != id ? myObject.push(producto) : idExist = true,
                )
                if(idExist == false){throw new Error('No se ha encontrado producto con dicho ID')}
                fs.writeFile(
                    './productos.txt',
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
            './productos.txt',
            '[]',
            (error) => {
                if (error) {
                    console.log(error)
                    throw new Error('Error: ' + error.message)
                }
            },
        )
    }
}

const file = new Contenedor()

file.save({
    title: "bag",
  price: 50,
  thumbnail:"https://cdns.iconmonstr.com/wp-content/assets/preview/2013/240/iconmonstr-shopping-bag-4.png",
}).then(maxId => console.log('Ultimo Id', maxId))

// file.getById(1).then(obj => console.log('Objeto buscado es', obj))

// file.getAll().then(obj => console.log('La lista de productos es', obj))

// file.deleteById(1)

// file.deleteAll()
