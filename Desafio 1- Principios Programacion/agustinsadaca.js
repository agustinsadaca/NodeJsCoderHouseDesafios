let listadoProductos = [
  {
    title: "regla",
    price: 30,
    thumbnail:
      "https://cdns.iconmonstr.com/wp-content/assets/preview/2015/240/iconmonstr-ruler-2.png",
    id: 1,
  },
  {
    title: "pencil",
    price: 20,
    thumbnail:
      "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-pencil-9.png",
    id: 2,
  },
];

class Contenedor {
  constructor() {}
  save(producto) {
    let id = 0;
    if (listadoProductos.length === 0) {
      id = 1;
    } else {
      listadoProductos.map((row) => {
        if (row.id >= id) {
          id = row.id + 1;
        }
      });
    }
    producto["id"] = id;
    listadoProductos.push(producto);
  }

  getById(id) {
    let obj = listadoProductos.find((data) => (data.id = id));
    return Object.keys(listadoProductos).length === 0 ? null : obj;
  }

  getAll() {
    return listadoProductos;
  }

  deleteById(id) {
    let obj = listadoProductos.find((data) => (data.id = id));
    listadoProductos.splice(listadoProductos.indexOf(obj), 1);
  }

    async deleteAll() {
        listadoProductos = []
    }
}

const file = new Contenedor();
/* -------------------------------------------------------------------------- */
/*                                      1                                     */
/* -------------------------------------------------------------------------- */
file.save({
  title: "bag",
  price: 50,
  thumbnail:
    "https://cdns.iconmonstr.com/wp-content/assets/preview/2013/240/iconmonstr-shopping-bag-4.png",
});
console.log(listadoProductos);
/* -------------------------------------------------------------------------- */
/*                                      2                                     */
/* -------------------------------------------------------------------------- */
console.log(file.getById(3));
/* -------------------------------------------------------------------------- */
/*                                      3                                     */
/* -------------------------------------------------------------------------- */
console.log(file.getAll());
/* -------------------------------------------------------------------------- */
/*                                      4                                     */
/* -------------------------------------------------------------------------- */
file.deleteById(2);
/* -------------------------------------------------------------------------- */
/*                                      5                                     */
/* -------------------------------------------------------------------------- */

file.deleteAll();
