import Producto from "../services/producto.js";

export async function getAllProducts(req, res) {
  const producto = new Producto();
  producto.readAll().then((obj) => {
    res.send(obj);
  });
}
export async function getProductById(req, res) {
  const { id } = req.params;
  const producto = new Producto();
  producto.readOne(id).then((obj) => {
    res.send(obj);
  });
}
export async function createProduct(req, res) {
  const { name, description, code, image, price, stock, admin } = req.body;
  if (req.user.admin) {
    const file = new Producto();
    file
      .createProducto({
        name: name,
        description: description,
        code: code,
        image: image,
        price: price,
        stock: stock,
      })
      .then((product) => res.send({ createdProduct: product }));
  } else {
    res.send({
      error: -1,
      descripcion: "ruta api/productos método post/save no autorizada",
    });
  }
}
export async function updateProduct(req, res) {
  const { name, description, code, image, price, stock, admin } = req.body;
  const { id } = req.params;
  if (req.user.admin) {
    const producto = new Producto();
    const responseProduct = await producto
      .update(id, {
        name,
        description,
        code,
        image,
        price,
        stock,
      })
      .catch((error) => res.json({error: error})
      );
      return res.json({
        responseProduct
      })
      
  } else {
    return res.send({
      error: -2,
      descripcion: "ruta api/productos método put/update no autorizada",
    });
  }
}
export async function deleteProduct(req, res) {
    const { id } = req.params;
    if (req.user.admin) {
      const producto = new Producto();
      const responseDelete = await producto.deleteProducto(id);
      return  res.json({
        responseDelete
      });
    } else {
      return  res.send({
        error: -3,
        descripcion: "ruta api/productos método delete no autorizada",
      });
    }
}
