const { config } =require( './configsqlite')
const knex = require('knex')


 const sqlite3 = knex(config)

module.exports = {sqlite3}