const faker = require('faker')
faker.locale = 'es'

module.exports = function generateProducto() {
  return {
    id:faker.datatype.uuid(),
    title: faker.internet.avatar(),
    price:faker.datatype.float(),
    thumbnail:faker.image.imageUrl()
  }
}