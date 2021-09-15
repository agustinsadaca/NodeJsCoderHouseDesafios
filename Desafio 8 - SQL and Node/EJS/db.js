// import { config } from './config.js'
const { config } =require( './configsqlite.js')
const knex =require( 'knex')

 const db = knex(config)
module.exports = {db}