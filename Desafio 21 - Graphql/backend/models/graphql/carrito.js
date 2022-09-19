export default class Carrito {
  #id;
  #timestampCarrito;
  #productos;

  constructor(
    id,
    { timestampCarrito, productos }
  ) {
    this.id = id;
    this.timestampCarrito = timestampCarrito;
    this.productos = productos;
  
  }

  set id(value) {
    if (!value) throw new Error("el campo id es obligatorio");
    this.#id = value;
  }

  set timestampCarrito(value) {
    if (!value) throw new Error("el campo timestampCarrito es obligatorio");
    this.#timestampCarrito = value;
  }

  set productos(value) {
    if (!value) throw new Error("el campo productos es obligatorio");
    this.#productos = value;
  }


  datos() {
    return Object.freeze({
      id: this.#id,
      timestampCarrito: this.#timestampCarrito,
      productos: this.#productos
 
  })}
}
