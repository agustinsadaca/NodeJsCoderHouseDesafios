import crypto from 'crypto'

import producto from '../../models/graphql/producto'

const productosMap = {}

export function getproductos(campo, valor) {
    const productos = Object.values(productosMap)
    if (campo && valor) {
        return productos.filter(p => p[campo] == valor)
    } else {
        return productos
    }
}

export function getproducto(id) {
    if (!productosMap[id]) {
        throw new Error('producto not found.')
    }
    return productosMap[id]
}

export function createproducto(datos) {
    const id = crypto.randomBytes(10).toString('hex')
    const nuevaproducto = new Producto(id, datos)
    productosMap[id] = nuevaproducto.datos()
    return nuevaproducto.datos()
}

export function updateproducto(id, datosNuevos) {
    if (!productosMap[id]) {
        throw new Error('producto not found')
    }
    const datosAnteriores = productosMap[id]
    const datos = { ...datosAnteriores, ...datosNuevos }
    const productoActualizada = new Producto(id, datos)
    productosMap[id] = productoActualizada.datos()
    return productoActualizada.datos()
}

export function deleteproducto(id) {
    if (!productosMap[id]) {
        throw new Error('producto not found')
    }
    const productoBorrada = productosMap[id]
    delete productosMap[id]
    return productoBorrada
}