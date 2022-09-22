export default class Producto {
  #id;
  #timestamp;
  #nombre;
  #description;
  #codigo;
  #foto;
  #precio;

  constructor(id, { timestamp, nombre, description, codigo, foto, precio }) {
    this.id = id;
    this.timestamp = timestamp;
    this.nombre = nombre;
    this.description = description;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
 
  }

  set id(value) {
    if (!value) throw new Error("el campo id es obligatorio");
    this.#id = value;
  }

  set nombre(value) {
    if (!value) throw new Error("el campo nombre es obligatorio");
    this.#nombre = value;
  }

  set description(value) {
    if (!value) throw new Error("el campo description es obligatorio");
    this.#description = value;
  }

  set codigo(value) {
    if (!value) throw new Error("el campo codigo es obligatorio");
  }

  datos() {
    return Object.freeze({
      id: this.#id,
      nombre: this.#nombre,
      timestamp: this.#timestamp,
      description: this.#description,
      codigo: this.#codigo,
      foto: this.#foto,
      precio: this.#precio,
    });
  }
}
