import crypto from 'crypto'

import carrito from '../../models/graphql/carrito'

const carritosMap = {}

export function getcarritos(campo, valor) {
    const carritos = Object.values(carritosMap)
    if (campo && valor) {
        return carritos.filter(p => p[campo] == valor)
    } else {
        return carritos
    }
}

export function getcarrito(id) {
    if (!carritosMap[id]) {
        throw new Error('carrito not found.')
    }
    return carritosMap[id]
}

export function createcarrito(datos) {
    const id = crypto.randomBytes(10).toString('hex')
    const nuevacarrito = new Carrito(id, datos)
    carritosMap[id] = nuevacarrito.datos()
    return nuevacarrito.datos()
}

export function updatecarrito(id, datosNuevos) {
    if (!carritosMap[id]) {
        throw new Error('carrito not found')
    }
    const datosAnteriores = carritosMap[id]
    const datos = { ...datosAnteriores, ...datosNuevos }
    const carritoActualizada = new Carrito(id, datos)
    carritosMap[id] = carritoActualizada.datos()
    return carritoActualizada.datos()
}

export function deletecarrito(id) {
    if (!carritosMap[id]) {
        throw new Error('carrito not found')
    }
    const carritoBorrada = carritosMap[id]
    delete carritosMap[id]
    return carritoBorrada
}