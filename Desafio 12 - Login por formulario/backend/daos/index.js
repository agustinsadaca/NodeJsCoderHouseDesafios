import dotenv from "dotenv";

dotenv.config()

let producto

switch (process.env.MODO_PERSISTENCIA) {
    case 'json':
        const { default: ProductoDaoArchivo } = await import('./daosArchivo/productoDaoArchivo.js')
        producto = new ProductoDaoArchivo()
        break
    case 'firebase':
        const { default: PersonasDaoFirebase } = await import('./PersonasDaoFirebase.js')
        producto = new PersonasDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductoDaoMongoDb } = await import('./daosMongodb/productoDaoMongoDb.js')
        producto = new ProductoDaoMongoDb()
        break

}


let carrito

switch (process.env.MODO_PERSISTENCIA) {
    case 'json':
        const { default: CarritoDaoArchivo } = await import('./daosArchivo/carritoDaoArchivo.js')
        carrito = new CarritoDaoArchivo()
        break
    case 'firebase':
        const { default: PersonasDaoFirebase } = await import('./PersonasDaoFirebase.js')
        carrito = new PersonasDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./daosMongodb/carritoDaoMongoDb.js')
        carrito = new CarritoDaoMongoDb()
        break

}

export  {producto, carrito}