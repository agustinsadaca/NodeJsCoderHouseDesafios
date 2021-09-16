const fs = require('fs')

 class Contenedor {
    constructor(config) {
        this.config = config
    }
    async save(producto) {
        const db = require('knex')(this.config)
        try {
            const response = await db.insert(producto).from('productos')
            console.log('Productos insertados!')
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            db.destroy()
        }
        return 
    }

    async getById(id) {
        const db = require('knex')(this.config)

        try {
            const product = await db.select().from('productos').where('id',id)
            return product
        } catch (error) {
            console.log(error)
        } finally {
            db.destroy()
        }
    }

    async getAll() {
        const db = require('knex')(this.config)

        try {
            const product = await db.select().from('productos')
            return product
        } catch (error) {
            console.log(error)
        } finally {
            db.destroy()
        }
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
            .readFile('./productos.txt', 'utf-8')
            .then((data) => {
                const listadoProductos = JSON.parse(data)
                listadoProductos.map((producto) => {
                    producto['id'] == id ? (objUpdated = producto) : objUpdated
                })
                const {title,price,thumbnail} = newObj
                const index = listadoProductos.indexOf(objUpdated)
                title!=undefined ? objUpdated.producto.title = title : objUpdated
                price!=undefined ? objUpdated.producto.price = price : objUpdated
                thumbnail!=undefined ? objUpdated.producto.thumbnail = thumbnail : objUpdated
                listadoProductos[index]=(objUpdated)
                this.deleteAll()
                return listadoProductos
            })
            .then((listadoProductos)=>{
                fs.writeFile(
                    './productos.txt',
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

// const file = new Contenedor()

// file.save({
//     title: '(nombre del producto)',
//     price: 30,
//     thumbnail: '(url de la foto del producto)',
// }).then(maxId => console.log('Ultimo Id', maxId))

// file.getById(3).then(obj => console.log('Objeto buscado es', obj))

// file.getAll().then(obj => console.log('La lista de productos es', obj))

// file.deleteById(3)

// file.deleteAll()

module.exports = {Contenedor}