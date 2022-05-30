const fs = require('fs')

 class Producto {
    constructor() {}
    async save(producto) {
        let maxId = 0
        maxId = await fs.promises
            .readFile('./backend/productos.json', 'utf-8')
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
                listadoProductos.push({'id':producto['id'],
                'timestamp': producto['timestamp'],
                'nombre': producto['nombre'],
                'descripcion': producto['descripcion'],
                'codigo': producto['codigo'],
                'foto': producto['foto'],
                'precio': producto['precio'],
                'stock': producto['stock']})
                
                fs.writeFile(
                    './backend/productos.json',
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
            .readFile('./backend/productos.json', 'utf-8')
            .then((data) => {
                const listadoProductos = JSON.parse(data)
                listadoProductos.map((producto) => {
                    producto['id'] == id ? (myObject = producto) : myObject
                })
                return myObject
            })
            .catch((error) => {return {error : 'producto no encontrado'}})
            
        return Object.keys(myObject).length === 0 ? {error : 'producto no encontrado'} : myObject
    }

    async getAll() {
        let myObject = {}
        myObject = await fs.promises
            .readFile('./backend/productos.json', 'utf-8')
            .then((data) => {
                myObject = JSON.parse(data)
                return myObject
            })
        return myObject
    }

    async deleteById(id) {
        let listaSinElemento = await fs.promises
            .readFile('./backend/productos.json', 'utf-8')
            .then((data) => {
                let myObject = []
                let idExist = false
                let listadoProductos = JSON.parse(data)
                listadoProductos.map((producto) =>
                    producto['id'] != id ? myObject.push(producto) : idExist = true,
                )
                if(idExist == false){throw new Error('No se ha encontrado producto con dicho ID')}
                fs.writeFile(
                    './backend/productos.json',
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
            './backend/productos.json',
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
            .readFile('./backend/productos.json', 'utf-8')
            .then((data) => {
                const listadoProductos = JSON.parse(data)
                listadoProductos.map((producto) => {
                    producto['id'] == id ? (objUpdated = producto) : objUpdated
                })
                const {timestamp, nombre, descripcion, codigo, foto, precio, stock} = newObj
                const index = listadoProductos.indexOf(objUpdated)
                objUpdated['timestamp']=timestamp
                objUpdated['nombre']=nombre
                objUpdated['descripcion']=descripcion
                objUpdated['codigo']=codigo
                objUpdated['foto']=foto
                objUpdated['precio']=precio
                objUpdated['stock']=stock

                listadoProductos[index]=(objUpdated)
                this.deleteAll()
                return listadoProductos
            })
            .then((listadoProductos)=>{
                fs.writeFile(
                    './backend/productos.json',
                    JSON.stringify(listadoProductos, null, 2),
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

module.exports = {Producto}